const fs = require("fs") 
const chalk = require("chalk")
const util = require("util") 
const i18n = require("i18n")
const { getBuffer } = require("@libs/function")
const { anime1Request } = require("@libs/uploader")
module.exports = {
    commands: ["awoo","bite","blush","bonk","bully","cringe","cry","cuddle","dance","glomp","handhold","happy","highfive","hug","kick","kill","kiss","lick","megumin","neko","nom","pat","poke","shinobu","slap","smile","smug","waifu","wave","wink","yeet"],
    cooldown: 13,
    isSewa: true,
    isLimit: true,
    callback: async({ sock, m, command }) => {
        const { status, data, message } = await anime1Request(command) 
        if (!status && Object.keys(db.expired).includes(m.botNumber) && Object.keys(db.expired[m.botNumber].sewa).includes(m.chat) && !m.key.fromMe && !m.isPremium) {
        db.chats[m.chat].limit += 1
        return m.reply(util.format(message) + ", limit group akan kembali 1")
        } else if (!status && !m.key.fromMe && !m.isPremium) {
        db.users[m.sender].limit += 1
        return m.reply(util.format(message) + ", limit kamu akan kembali 1")
        } else if (!status) return m.reply(util.format(message))
        if (data.url.includes(".jpg") || data.url.includes(".jpeg") || data.url.includes(".png")) {
        const buffer = await getBuffer(data.url)
        sock.sendMessage(m.chat, { image: buffer, caption: util.format(i18n.__("success")), }, { quoted: m })
        } else if (data.url.includes(".gif") || data.url.includes(".mp4")) {
        const buffer = await getBuffer(data.url)
        sock.sendMessage(m.chat, { video: buffer, caption: util.format(i18n.__("success")), }, { quoted: m })
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