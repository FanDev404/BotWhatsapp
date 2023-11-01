const fs = require("fs") 
const chalk = require("chalk")
const util = require("util")
module.exports = {
    commands: ["linkgc"],
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    isBotAdmin: true,
    callback: async ({ sock, m }) => {
        try{
        m.reply(util.format("https://chat.whatsapp.com/" + (await sock.groupInviteCode(m.chat))))
        } catch {
        m.reply(util.format("Link group invalid!"))
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