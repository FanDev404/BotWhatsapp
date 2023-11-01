const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["del","delete"],
    cooldown: 13,
    isSewa: true,
    callback: async ({ sock, m, isBotGroupAdmins, isGroupAdmins }) => {
        if (m.quoted && m.quoted.sender == m.botNumber) {
        sock.sendMessage(m.chat, { delete: m.quoted.key })
        } else if (m.quoted && m.quoted.sender !== m.botNumber && isBotGroupAdmins && isGroupAdmins) {
        sock.sendMessage(m.chat, { delete: m.quoted.key })
        } else if (m.quoted && m.quoted.sender !== m.botNumber && isBotGroupAdmins && m.isOwner) {
        sock.sendMessage(m.chat, { delete: m.quoted.key })
        } else m.reply("Reply pesan bot!")
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})