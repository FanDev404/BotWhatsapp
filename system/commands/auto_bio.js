const fs = require("fs") 
const chalk = require("chalk")
const config = require("@config")
module.exports = {
    commands: ["autobio"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ m }) => {
        if (m.args[0] == "on" || m.args[0] == "1") {
        if (config[m.botNumber].autobio == true) return m.reply("Sudah active")
        config[m.botNumber].autobio = true
        m.reply("Mode auto bio telah active")
        } else if (m.args[0] == "off" || m.args[0] == "0") {
        if (config[m.botNumber].autobio == false) return m.reply("Sudah non active")
        config[m.botNumber].autobio = false
        m.reply("Mode auto bio telah non active")
        } else {
        m.reply("\`\`\`「 MODE AUTO BIO 」\`\`\`\n\n0. off\n1. on")
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