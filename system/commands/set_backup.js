const fs = require("fs") 
const chalk = require("chalk")
const toMs = require("ms") 
const config = require("@config")
module.exports = {
    commands: ["setbackup"],
    cooldown: 13,
    minArgs: 1,
    expectedArgs: "<teks>",
    example: "{prefix}{command} 10 menit",
    isSewa: true,
    isVip: true,
    callback: async ({ m }) => {
        if (!isNaN(parseFloat(m.text)) && !m.text.includes("menit")) {return m.reply("Hanya bisa menggunakan menit kak")}
        if (toMs(`${parseFloat(m.text)}m`) < 600000) return m.reply("Minimal 10 menit kak") 
        config.localBackup = toMs(`${parseFloat(m.text)}m`)
        m.reply(`Success set backup ${m.text}, Restaring bot...`)
        setTimeout(() => {
        process.send("reset")
        }, 3000)
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})