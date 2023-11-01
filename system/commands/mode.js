const fs = require("fs") 
const chalk = require("chalk")
const config = require("@config")
module.exports = {
    commands: ["mode"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ m }) => {
        if (m.args[0] == "public" || m.args[0] == "1") {
        if (m.mode == "public") return m.reply("Sudah active")
        config[m.botNumber].mode = "public"
        m.reply("Public mode is active")
        } else if (m.args[0] == "self" || m.args[0] == "2") {
        if (m.mode == "self") return m.reply("Sudah active")
        config[m.botNumber].mode = "self"
        m.reply("Self mode is active")
        } else if (m.args[0] == "group" || m.args[0] == "3") {
        if (m.mode == "group") return m.reply("Sudah active")
        config[m.botNumber].mode = "group"
        m.reply("Group mode is active")
        } else if (m.args[0] == "private" || m.args[0] == "4") {
        if (m.mode == "private") return m.reply("Sudah active")
        config[m.botNumber].mode = "private"
        m.reply("Private mode is active")
        } else {
        m.reply("\`\`\`「 MODE BOT 」\`\`\`\n\n1. public\n2. self\n3. group\n4. private")
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