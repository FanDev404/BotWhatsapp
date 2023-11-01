const fs = require("fs") 
const chalk = require("chalk")
const config = require("@config")
const { getBuffer } = require("@libs/function")
module.exports = {
    commands: ["setreply"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ sock, m }) => {
        if (m.args[0] == "mess1" || m.args[0] == "1") {
        if (config[m.botNumber].replytype == "mess1") return m.reply("Sudah active")
        config[m.botNumber].replytype = "mess1"
        m.reply("Success mengganti reply ke mess1", m.chat, m.sender, { quoted: m }, "mess1") 
        } else if (m.args[0] == "mess2" || m.args[0] == "2") {
        if (config[m.botNumber].replytype == "mess2") return m.reply("Sudah active")
        config[m.botNumber].replytype = "mess2"
        m.reply("Success mengganti reply ke mess2", m.chat, m.sender, { quoted: m }, "mess2") 
        } else if (m.args[0] == "mess3" || m.args[0] == "3") {
        if (config[m.botNumber].replytype == "mess3") return m.reply("Sudah active")
        config[m.botNumber].replytype = "mess3"
        m.reply("Success mengganti reply ke mess3", m.chat, m.sender, { quoted: m }, "mess3") 
        } else if (m.args[0] == "mess4" || m.args[0] == "4") {
        if (config[m.botNumber].replytype == "mess4") return m.reply("Sudah active")
        config[m.botNumber].replytype = "mess4"
        m.reply("Success mengganti reply ke mess4", m.chat, m.sender, { quoted: m }, "mess4") 
        } else if (m.args[0] == "mess5" || m.args[0] == "5") {
        if (config[m.botNumber].replytype == "mess5") return m.reply("Sudah active")
        config[m.botNumber].replytype = "mess5"
        m.reply("Success mengganti reply ke mess5", m.chat, m.sender, { quoted: m }, "mess5") 
        } else if (m.args[0] == "mess6" || m.args[0] == "6") {
        if (config[m.botNumber].replytype == "mess6") return m.reply("Sudah active")
        config[m.botNumber].replytype = "mess6"
        m.reply("Success mengganti reply ke mess6", m.chat, m.sender, { quoted: m }, "mess6") 
        } else if (m.args[0] == "mess7" || m.args[0] == "7") {
        if (config[m.botNumber].replytype == "mess7") return m.reply("Sudah active")
        config[m.botNumber].replytype = "mess7"
        m.reply("Success mengganti reply ke mess7", m.chat, m.sender, { quoted: m }, "mess7") 
        } else {
        m.reply("\`\`\`「 SETTINGS REPLY BOT 」\`\`\`\n\n1. mess1\n2. mess2\n3. mess3\n4. mess4\n5. mess5\n6. mess6\n7. mess7")
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