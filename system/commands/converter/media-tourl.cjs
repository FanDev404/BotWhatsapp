const fs = require("fs") 
const util = require("util") 
const i18n = require("i18n") 
const { imageToUrl, uploadFileApi } = require("../../libs/converter.cjs")
module.exports = {
    commands: ["tourl"],
    tags: "converter menu", 
    isSewa: true,
    isMedia: {
        isImage: true,
        isVideo: true, 
        isDocument: true,
        isQuotedMedia: {
            isQuotedImage: true,
            isQuotedVideo: true,
            isQuotedAudio: true,
            isQuotedSticker: true,
            isQuotedDocument: true
        }
    },
    callback: async ({ mywa, m, command, cmdSuccess, cmdFailed, isImage, isVideo, isDocument, isQuotedVideo, isQuotedImage, isQuotedDocument, isQuotedSticker, isQuotedAudio }) => {
        try {
            if (isImage || isQuotedImage) {
                const id = fs.readdirSync("./temp").filter((x) => !x.includes("Zzzzzzzzzz@4.0.4")).length + 1
                const media = await mywa.downloadAndSaveMediaMessage((m.quoted? m.quoted : m), id + ".jpg")
                const { status, data, message } = await imageToUrl(media) 
                if (!status) return m.reply(util.format(message))
                m.reply("result : " + data) 
                cmdSuccess(command, "converter menu")
            } else if (isVideo || isQuotedVideo) {
                if (!m.isPremium(m.sender) && !m.key.fromMe) return m.reply(i18n.__("message.premium_only"))
                const id = fs.readdirSync("./temp").filter((x) => !x.includes("Zzzzzzzzzz@4.0.4")).length + 1
                const media = await mywa.downloadAndSaveMediaMessage((m.quoted? m.quoted : m), id + ".mp4")
                const { status, data, message } = await uploadFileApi(media) 
                if (!status) return m.reply(util.format(message))
                m.reply("result : " + data) 
                cmdSuccess(command, "converter menu")
            } else if (isDocument || isQuotedDocument) {
                if (!m.isPremium(m.sender) && !m.key.fromMe) return m.reply(i18n.__("message.premium_only"))
                const id = fs.readdirSync("./temp").filter((x) => !x.includes("Zzzzzzzzzz@4.0.4")).length + 1
                const fileName = isQuotedDocument? m.quoted.fileName : m.fileName
                const media = await mywa.downloadAndSaveMediaMessage((m.quoted? m.quoted : m), `${fileName.includes(".")? (id + fileName.split(".")[1]) : id}`)
                const { status, data, message } = await uploadFileApi(media) 
                if (!status) return m.reply(util.format(message))
                m.reply("result : " + data) 
                cmdSuccess(command, "converter menu")
            } else if (isQuotedSticker) {
                if (!m.isPremium(m.sender) && !m.key.fromMe) return m.reply(i18n.__("message.premium_only"))
                const id = fs.readdirSync("./temp").filter((x) => !x.includes("Zzzzzzzzzz@4.0.4")).length + 1
                const media = await mywa.downloadAndSaveMediaMessage((m.quoted? m.quoted : m), id + ".webp")
                const { status, data, message } = await uploadFileApi(media) 
                if (!status) return m.reply(util.format(message))
                m.reply("result : " + data) 
                cmdSuccess(command, "converter menu")
            } else if (isQuotedAudio) {
                if (!m.isPremium(m.sender) && !m.key.fromMe) return m.reply(i18n.__("message.premium_only"))
                const id = fs.readdirSync("./temp").filter((x) => !x.includes("Zzzzzzzzzz@4.0.4")).length + 1
                const media = await mywa.downloadAndSaveMediaMessage((m.quoted? m.quoted : m), id + ".mp3")
                const { status, data, message } = await uploadFileApi(media) 
                if (!status) return m.reply(util.format(message))
                m.reply("result : " + data) 
                cmdSuccess(command, "converter menu")
            } else if (isQuotedAudio) {
                if (!m.isPremium(m.sender) && !m.key.fromMe) return m.reply(i18n.__("message.premium_only"))
                const id = fs.readdirSync("./temp").filter((x) => !x.includes("Zzzzzzzzzz@4.0.4")).length + 1
                const media = await mywa.downloadAndSaveMediaMessage((m.quoted? m.quoted : m), id + ".mp3")
                const { status, data, message } = await uploadFileApi(media) 
                if (!status) return m.reply(util.format(message))
                m.reply("result : " + data) 
                cmdSuccess(command, "converter menu")
            }
        } catch (error) {
            cmdFailed(command, "converter menu", error)
        }
    }
}