const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["antilinkwa"],
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    isBotAdmin: true,
    callback: async ({ m }) => {
        if (m.args[0] == "on" || m.args[0] == "1") {
        if (db.chats[m.chat].antilinkwa == true) return m.reply("Sudah active")
        db.chats[m.chat].antilinkwa = true
        m.reply("Mode anti link whatsapp telah active")
        } else if (m.args[0] == "off" || m.args[0] == "0") {
        if (db.chats[m.chat].antilinkwa == false) return m.reply("Sudah non active")
        db.chats[m.chat].antilinkwa = false
        m.reply("Mode anti link whatsapp telah non active")
        } else {
        m.reply("\`\`\`「 MODE ANTI LINK WHATSAPP 」\`\`\`\n\n0. off\n1. on")
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