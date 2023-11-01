const fs = require("fs") 
const util = require("util") 
const i18n = require("i18n") 
const { imageToUrl, uploadFileApi } = require("../../libs/converter.cjs")
module.exports = {
    commands: ["setmedia"],
    tags: "store menu", 
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    isMedia: {
        isImage: true, 
        isDocument: true, 
        isQuotedMedia: {
            isQuotedImage: true, 
            isQuotedDocument: true
        }
    },
    callback: async ({ mywa, m, command, cmdSuccess, cmdFailed, isImage, isQuotedImage, isDocument, isQuotedDocument }) => {
        try {
            const dataStore = Object.keys(db.groups[m.chat].store.key).filter((x) => (x.toLowerCase() == m.text.toLowerCase()))
            if (dataStore.length == 1 && isImage || dataStore.length == 1 && isQuotedImage) {
                const id = fs.readdirSync("./temp").filter((x) => !x.includes("Zzzzzzzzzz@4.0.4")).length + 1
                const media = await mywa.downloadAndSaveMediaMessage((isQuotedImage? m.quoted : m), "./temp/" + id)
                const { status, data, message } = await imageToUrl(media) 
                if (!status) return m.reply(util.format(message))
                db.groups[m.chat].store.key[dataStore[0]].image = data
                m.reply("Success set media dengan key " + dataStore[0]) 
                cmdSuccess(command, "store menu")
            } else if (dataStore.length == 1 && isDocument || dataStore.length == 1 && isQuotedDocument) {
                if (!m.isPremium(m.sender) && !m.key.fromMe) return m.reply(i18n.__("message.premium_only"))
                const id = fs.readdirSync("./temp").filter((x) => !x.includes("Zzzzzzzzzz@4.0.4")).length + 1
                const media = await mywa.downloadAndSaveMediaMessage((isQuotedDocument? m.quoted : m), "./temp/" + id)
                const fileName = isQuotedDocument? m.quoted.fileName : m.fileName
                const { status, data, message } = await uploadFileApi(media) 
                if (!status) return m.reply(util.format(message))
                db.groups[m.chat].store.key[dataStore[0]].document = { url: data, fileName }
                m.reply("Success set media dengan key " + dataStore[0]) 
                cmdSuccess(command, "store menu")
            } else if (isImage || isQuotedImage) {
                const id = fs.readdirSync("./temp").filter((x) => !x.includes("Zzzzzzzzzz@4.0.4")).length + 1
                const media = await mywa.downloadAndSaveMediaMessage((isQuotedImage? m.quoted : m), "./temp/" + id)
                const { status, data, message } = await imageToUrl(media) 
                if (!status) return m.reply(util.format(message))
                db.groups[m.chat].store.image = data
                m.reply("Success set media") 
                cmdSuccess(command, "store menu")
            } else m.reply("Example not found") 
        } catch (error) {
            cmdFailed(command, "store menu", error)
        }
    }
}