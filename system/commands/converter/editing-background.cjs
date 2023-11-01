const fs = require("fs") 
const util = require("util") 
const { exec } = require("child_process")
const { editBackground } = require("../../libs/converter.cjs") 
module.exports = {
    commands: ["editbg"],
    example: "{prefix}{command} blue",

    tags: "converter menu", 
    isSewa: true,
    isPremium: true,
    isWait: true, 
    isMedia: {
        isImage: true, 
        isQuotedMedia: {
            isQuotedImage: true, 
            isQuotedSticker: true
        }
    },
    callback: async ({ mywa, m, cmdSuccess, cmdFailed, command, isImage, isQuotedImage, isQuotedSticker }) => {
        try {
            if (isImage || isQuotedImage) {
                const media = await mywa.downloadMediaMessageV2(isQuotedImage? m.quoted : m)
                const { status, base64, buffer, message } = await editBackground(media, m.text) 
                if (!status) return m.reply(util.format(message))
                m.reply(buffer, m.chat, db.settings.replyType, [], m.sender, { type: "document", fileName: "MywaJS BOT.png", quoted: m })
                cmdSuccess(command, "converter menu")
            } else if (isQuotedSticker) {
                const fileId = fs.readdirSync("./temp").filter((x) => !x.includes("Zzzzzzzzzz@4.0.4")).length + 1
                const media = await mywa.downloadAndSaveMediaMessage(m.quoted, fileId + ".webp")
                exec(`ffmpeg -i ${media} ./temp/${fileId}.jpg`, async (err) => {
                    const { status, base64, buffer, message } = await editBackground(fs.readFileSync(`./temp/${fileId}.jpg`).toString("base64"), m.text) 
                    if (!status) return m.reply(util.format(message))
                    await mywa.sendMessageV2(m.chat, { sticker: buffer }, { quoted: m })
                    cmdSuccess(command, "converter menu")
                }) 
            }
        } catch (error) {
            cmdFailed(command, "converter menu", error)
        }
    }
}