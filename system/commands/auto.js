const fs = require("fs") 
const chalk = require("chalk")
const config = require("@config")
module.exports = {
    commands: ["auto"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ m }) => {
        if (m.args[0] == "recording" || m.args[0] == "1") {
        if (config[m.botNumber].auto == "recording") return m.reply("Sudah active")
        config[m.botNumber].auto = "recording"
        m.reply("Mode auto recording telah active")
        } else if (m.args[0] == "typing" || m.args[0] == "2") {
        if (config[m.botNumber].auto == "typing") return m.reply("Sudah active")
        config[m.botNumber].auto = "typing"
        m.reply("Mode auto typing telah active")
        } else if (m.args[0] == "available" || m.args[0] == "3") {
        if (config[m.botNumber].auto == "available") return m.reply("Sudah active")
        config[m.botNumber].auto = "available"
        m.reply("Mode auto available telah active")
        } else if (m.args[0] == "unavailable" || m.args[0] == "4") {
        if (config[m.botNumber].auto == "unavailable") return m.reply("Sudah active")
        config[m.botNumber].auto = "available"
        m.reply("Mode auto unavailable telah active")
        } else {
        m.reply("\`\`\`「 MODE AUTO 」\`\`\`\n\n1. recording\n2. typing\n3. available\n4. unavailable")
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