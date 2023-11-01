const fs = require("fs") 
const chalk = require("chalk")
const config = require("@config") 
module.exports = {
    commands: ["setbio"],
    cooldown: 13,
    minArgs: 1,
    expectedArgs: "<teks>",
    example: "{prefix}{command} busy",
    isSewa: true,
    isOwner: true,
    callback: async ({ sock, m }) => {
        if (m.autoBio) config[m.botNumber].autobio = false
        setTimeout(async () => {
        await sock.updateProfileStatus(m.text)
        await m.reply(`Success mengganti bio ke ${m.text}`)
        }, 1000)
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})