const fs = require("fs") 
const chalk = require("chalk")
const { getBuffer } = require("@libs/function")
module.exports = {
    commands: ["pay","payment"],
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    callback: async ({ sock, m }) => {
        if (db.chats[m.chat].store.pay.text !== "" && db.chats[m.chat].store.pay.isImage !== "") {
        const teks = db.chats[m.chat].store.pay.text
        const buffer = await getBuffer(db.chats[m.chat].store.pay.isImage)
        const options = {
        externalAdReply: {
        showAdAttribution: true,
        title: `hallo kak👋 ${m.pushName}`,
        body: "DONT CLICK HERE",
        mediaType: 1,
        renderLargerThumbnail: false,
        thumbnail: buffer,
        sourceUrl: db.chats[m.chat].store.pay.isImage,
        }}
        sock.sendMessage(m.chat, { image: buffer, caption: teks }, { quoted: m }).catch(async () => {
        return sock.sendMessage(m.chat, { text: teks, contextInfo: options }, { quoted: m })
        }) 
        } else if (db.chats[m.chat].store.pay.isImage !== "") {
        const buffer = await getBuffer(db.chats[m.chat].store.pay.isImage)
        const options = {
        externalAdReply: {
        showAdAttribution: true,
        title: `hallo kak👋 ${m.pushName}`,
        body: "DONT CLICK HERE",
        mediaType: 1,
        renderLargerThumbnail: false,
        thumbnail: buffer,
        sourceUrl: db.chats[m.chat].store.pay.isImage,
        }}
        sock.sendMessage(m.chat, { image: buffer }, { quoted: m }).catch(async () => {
        return sock.sendMessage(m.chat, { text: teks, contextInfo: options }, { quoted: m })
        }) 
        } else if (db.chats[m.chat].store.pay.text !== "") {
        m.reply(db.chats[m.chat].store.pay.text)
        } else m.reply("Belum ada payment di group ini")
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})