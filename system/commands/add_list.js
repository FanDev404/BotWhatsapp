const fs = require("fs") 
const util = require("util") 
const chalk = require("chalk")
const i18n = require("i18n") 
const { uploadFileApi, TelegraPh } = require("@libs/uploader")
module.exports = {
    commands: ["addlist"],
    cooldown: 13,
    minArgs: 1,
    expectedArgs: "<teks>",
    example: "{prefix}{command} @Diamond ML",
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    callback: async ({ sock, m, isQuotedDocument, isQuotedImage, isDocument, isImage }) => {
        //const data = Object.keys(db.chats[m.chat].store.key).filter((x) => m.text.toLowerCase().includes("@" + x.toLowerCase()))
        //if (!m.text.includes("@")) return m.reply("Example 404") 
        
        if (Object.keys(db.chats[m.chat].store.key).map((x) => x.toLowerCase()).includes(m.text.toLowerCase())) return m.reply("Nama tersebut sudah ada dalam list kak")
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
        if (Object.keys(db.allcommand).includes(key)) return m.reply("Jangan gunakan nama command")
        if (isQuotedImage || isImage) {
        const id = fs.readdirSync("./temp").filter((x) => !x.includes("Zzzzzzzzzz@4.0.4")).length + 1
        const media = await sock.downloadAndSaveMediaMessage((isQuotedImage? m.quoted : m), "./temp/" + id)
        const { status, data, message } = await TelegraPh(media) 
        if (!status) return m.reply(util.format(message))
        db.chats[m.chat].store.key[key] = { isImage: data, isDocument: { url: "", fileName: "" }, text: teks, time: 0 }
        m.reply("Success add list dengan key " + key) 
        } else if (isQuotedDocument || isDocument) {
        if (!m.isPremium && !m.key.fromMe) return m.reply(i18n.__("message.premium_only"))
        const id = fs.readdirSync("./temp").filter((x) => !x.includes("Zzzzzzzzzz@4.0.4")).length + 1
        const media = await sock.downloadAndSaveMediaMessage((isQuotedDocument? m.quoted : m), "./temp/" + id)
        const fileName = isQuotedDocument? m.quoted.message["documentMessage"].fileName : m.message["documentMessage"].fileName
        const { status, data, message } = await uploadFileApi(media) 
        if (!status) return m.reply(util.format(message))
        db.chats[m.chat].store.key[key] = { isImage: "", isDocument: { url: data, fileName }, text: teks, time: 0 }
        m.reply("Success add list dengan key " + key) 
        } else {
        db.chats[m.chat].store.key[key] = { isImage: "", isDocument: { url: "", fileName: "" }, text: teks, time: 0 }
        m.reply("Success add list dengan key " + key) 
        }
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})