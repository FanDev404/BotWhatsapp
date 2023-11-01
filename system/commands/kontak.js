const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["kontak"],
    cooldown: 13,
    isSewa: true,
    callback: async ({ sock, m }) => {
        if (!m.quoted && !m.isMention) return m.reply("Reply/Tags users")
        let nomer = m.quoted? m.quoted.sender : m.isMention? m.mentionedJid[0] : ""
        let name = Object.keys(db.users).includes(nomer)? db.users[nomer].name : "No name"
        sock.sendContact(m.chat, nomer.split("@")[0], name, m)
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})