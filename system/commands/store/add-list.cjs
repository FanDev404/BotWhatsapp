const fs = require("fs") 
const util = require("util") 
const i18n = require("i18n") 
const { imageToUrl, uploadFileApi } = require("../../libs/converter.cjs")
module.exports = {
    commands: ["addlist"],
    minArgs: 1,
    expectedArgs: "<teks>",
    example: "{prefix}{command} @Diamond ML",
    tags: "store menu", 
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    callback: async ({ mywa, m, command, cmdSuccess, cmdFailed, isQuotedDocument, isQuotedImage, isDocument, isImage }) => {
        try {
            if (Object.keys(db.groups[m.chat].store.key).map((x) => x.toLowerCase()).includes(m.text.toLowerCase())) return m.reply("Nama tersebut sudah ada dalam list kak")
            if (m.quoted) {
                var key = m.text
                var teks = m.quoted.body
            } else if (m.text.includes("@") && m.text.split("@")[m.text.split("@").length -1].split(" ").length < 4) {
                var key = m.text.split("@")[m.text.split("@").length -1]
                var teks = m.text.split("@" + key)[0]
            } else {
                var key = m.text
                var teks = ""
            }
            if (Object.keys(db.allcommand).includes(key.toLowerCase())) return m.reply("Jangan gunakan nama command")
            if (Object.keys(db.groups[m.chat].store.key).map((x) => x.toLowerCase()).includes(key.toLowerCase())) return m.reply("Nama tersebut sudah ada dalam list kak")
            if (isQuotedImage || isImage) {
                const id = fs.readdirSync("./temp").filter((x) => !x.includes("Zzzzzzzzzz@4.0.4")).length + 1
                const media = await mywa.downloadAndSaveMediaMessage((isQuotedImage? m.quoted : m), "./temp/" + id)
                const { status, data, message } = await imageToUrl(media) 
                if (!status) return m.reply(util.format(message))
                db.groups[m.chat].store.key[key] = { image: data, document: { url: "", fileName: "" }, text: teks, time: 0 }
                m.reply("Success add list dengan key " + key) 
                cmdSuccess(command, "store menu")
            } else if (isQuotedDocument || isDocument) {
                if (!m.isPremium(m.sender) && !m.key.fromMe) return m.reply(i18n.__("message.premium_only"))
                const id = fs.readdirSync("./temp").filter((x) => !x.includes("Zzzzzzzzzz@4.0.4")).length + 1
                const media = await mywa.downloadAndSaveMediaMessage((isQuotedDocument? m.quoted : m), "./temp/" + id)
                const fileName = isQuotedDocument? m.quoted.fileName : m.fileName
                const { status, data, message } = await uploadFileApi(media) 
                if (!status) return m.reply(util.format(message))
                db.groups[m.chat].store.key[key] = { image: "", document: { url: data, fileName }, text: teks, time: 0 }
                m.reply("Success add list dengan key " + key) 
                cmdSuccess(command, "store menu")
            } else {
                db.groups[m.chat].store.key[key] = { image: "", document: { url: "", fileName: "" }, text: teks, time: 0 }
                m.reply("Success add list dengan key " + key) 
                cmdSuccess(command, "store menu")
            }
        } catch (error) {
            cmdFailed(command, "store menu", error)
        }
    }
}