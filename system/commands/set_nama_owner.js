const fs = require("fs") 
const chalk = require("chalk")
const config = require("@config")
module.exports = {
    commands: ["setnamaown"],
    cooldown: 13,
    minArgs: 1,
    expectedArgs: "<teks>",
    example: "{prefix}{command} Jasen",
    isSewa: true,
    isVip: true,
    callback: async ({ m }) => {
        if (m.text == m.ownerName) return m.reply("Nama tersebut sudah di pakai")
        config[m.botNumber].ownerName = m.text
        m.reply(`Success mengganti nama owner ke ${m.text}`)
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})