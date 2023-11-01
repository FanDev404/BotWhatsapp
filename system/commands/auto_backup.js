const fs = require("fs") 
const chalk = require("chalk")
const config = require("@config")
module.exports = {
    commands: ["autobackup"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ m }) => {
        if (m.args[0] == "on" || m.args[0] == "1") {
        if (config[m.botNumber].autobackup == true) return m.reply("Sudah active")
        config[m.botNumber].autobackup = true
        m.reply("Mode auto backup telah active")
        } else if (m.args[0] == "off" || m.args[0] == "0") {
        if (config[m.botNumber].autobackup == false) return m.reply("Sudah non active")
        config[m.botNumber].autobackup = false
        m.reply("Mode auto backup telah non active")
        } else {
        m.reply("\`\`\`「 MODE AUTO BACKUP 」\`\`\`\n\n0. off\n1. on")
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
