const fs = require("fs") 
const chalk = require("chalk")
const util = require("util") 
const i18n = require("i18n") 
const { uploadFileApi, TelegraPh } = require("@libs/uploader")
module.exports = {
    commands: ["setmedia"],
    cooldown: 13,
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
    callback: async ({ sock, m, isQuotedImage, isQuotedDocument, isImage, isDocument }) => {
        const dataStore = Object.keys(db.chats[m.chat].store.key).filter((x) => (x.toLowerCase() == m.text.toLowerCase()))
        if (dataStore.length == 1 && isImage || dataStore.length == 1 && isQuotedImage) {
        const id = fs.readdirSync("./temp").filter((x) => !x.includes("Zzzzzzzzzz@4.0.4")).length + 1
        const media = await sock.downloadAndSaveMediaMessage((isQuotedImage? m.quoted : m), "./temp/" + id)
        const { status, data, message } = await TelegraPh(media) 
        if (!status) return m.reply(util.format(message))
        db.chats[m.chat].store.key[dataStore[0]].isImage = data
        m.reply("Success set media dengan key " + dataStore[0]) 
        } else if (dataStore.length == 1 && isDocument || dataStore.length == 1 && isQuotedDocument) {
        if (!m.isPremium && !m.key.fromMe) return m.reply(i18n.__("message.premium_only"))
        const id = fs.readdirSync("./temp").filter((x) => !x.includes("Zzzzzzzzzz@4.0.4")).length + 1
        const media = await sock.downloadAndSaveMediaMessage((isQuotedDocument? m.quoted : m), "./temp/" + id)
        const fileName = isQuotedDocument? m.quoted.message["documentMessage"].fileName : m.message["documentMessage"].fileName
        const { status, data, message } = await uploadFileApi(media) 
        if (!status) return m.reply(util.format(message))
        db.chats[m.chat].store.key[dataStore[0]].isDocument = { url: data, fileName }
        m.reply("Success set media dengan key " + dataStore[0]) 
        } else {
        const id = fs.readdirSync("./temp").filter((x) => !x.includes("Zzzzzzzzzz@4.0.4")).length + 1
        const media = await sock.downloadAndSaveMediaMessage((isQuotedImage? m.quoted : m), "./temp/" + id)
        const { status, data, message } = await TelegraPh(media) 
        if (!status) return m.reply(util.format(message))
        db.chats[m.chat].store.isImage = data
        m.reply("Success set media") 
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