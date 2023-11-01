const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["disappearing"],
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    isBotAdmin: true,
    callback: async ({ sock, m, groupMetadata }) => {
        if (m.text == "off" || m.text == "1") {
        if (groupMetadata.ephemeralDuration == undefined) return m.reply("Sudah active")
        sock.sendMessage(m.chat, { disappearingMessagesInChat: 0 })
        } else if (m.text == "24 hours" || m.text == "2") {
        if (groupMetadata.ephemeralDuration == 86400) return m.reply("Sudah active")
        sock.sendMessage(m.chat, { disappearingMessagesInChat: 86400 })
        } else if (m.text == "7 days" || m.text == "3") {
        if (groupMetadata.ephemeralDuration == 604800) return m.reply("Sudah active")
        sock.sendMessage(m.chat, { disappearingMessagesInChat: 604800 })
        } else if (m.text == "90 days" || m.text == "4") {
        if (groupMetadata.ephemeralDuration == 7776000) return m.reply("Sudah active")
        sock.sendMessage(m.chat, { disappearingMessagesInChat: 7776000 })
        } else {
        m.reply("\`\`\`「 DISAPPEARING CHAT 」\`\`\`\n\n1. off\n2. 24 hours\n3. 7 days\n4. 90 days")
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