const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["join"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ sock, m }) => {
        if (m.text.includes("https://chat.whatsapp.com/")) {
        if (!m.text.split(".com/")[0] == "https://chat.whatsapp") return m.reply("Error link")
        let jid = await sock.groupAcceptInvite(m.text.split("https://chat.whatsapp.com/")[1])
        let groupMetadata = await sock.groupMetadata(jid)
        await m.reply(`Success join group ${groupMetadata.subject}`)
        } else if (m.quoted && m.quoted.text.includes("https://chat.whatsapp.com/")) {
        if (!m.quoted.text.split(".com/")[0] == "https://chat.whatsapp") return m.reply("Error link")
        let jid = await sock.groupAcceptInvite(m.quoted.text.split("https://chat.whatsapp.com/")[1])
        let groupMetadata = await sock.groupMetadata(jid)
        await m.reply(`Success join group ${groupMetadata.subject}`)
        } else if (m.quoted && m.quoted.body.includes("https://chat.whatsapp.com/")) {
        if (!m.quoted.body.split(".com/")[0] == "https://chat.whatsapp") return m.reply("Error link")
        let jid = await sock.groupAcceptInvite(m.quoted.body.split("https://chat.whatsapp.com/")[1])
        let groupMetadata = await sock.groupMetadata(jid)
        await m.reply(`Success join group ${groupMetadata.subject}`)
        } else m.reply("Link group?") 
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})