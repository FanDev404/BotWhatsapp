const fs = require("fs") 
const chalk = require("chalk")
const util = require("util") 
const { getBuffer } = require("@libs/function")
const { anime2Request } = require("@libs/uploader")
const i18n = require("i18n")
module.exports = {
    commands: ["cuddle2","hug2","kill2","kiss2","pat2","punch","slap2","waifu3","wink2"],
    cooldown: 13,
    isSewa: true,
    isPremium: true,
    isWait: true,
    callback: async({ sock, m, command }) => {
        const { status, data, message } = await anime2Request(command == "cuddle2"? "cuddle" : command == "hug2"? "hug" : command == "kill2"? "kill" : command == "kiss2"? "kiss" : command == "pat2"? "pat" : command == "slap2"? "slap" : command == "waifu3"? "waifu" : command == "wink2"? "wink" : command) 
        if (!status) return m.reply(util.format(message))
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