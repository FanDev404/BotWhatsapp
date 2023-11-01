const i18n = require("i18n") 
const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["react"],
    cooldown: 13,
    minArgs: 1,
    expectedArgs: "<emoji>",
    example: "{prefix}{command} 😆",
    isSewa: true,
    callback: async ({ sock, m }) => {
        if (!i18n.__("allemoji").includes(m.text)) return m.reply("Itu bukan emoji kak") 
        sock.sendMessage(m.chat, { react: { text: m.text, key: m.key } })
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})