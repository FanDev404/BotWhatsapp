const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["gc","group"],
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    isBotAdmin: true,
    callback: async ({ sock, m, groupMetadata }) => {
        if (m.args[0] == "close" || m.args[0] == "2") {
        if (groupMetadata.announce == true) return m.reply("Group sudah di tutup")
        sock.groupSettingUpdate(m.chat, "announcement")
        m.reply("Success menutup group, Sekarang hanya admin yang bisa mengirim pesan")
        } else if (m.args[0] == "open" || m.args[0] == "1") {
        if (groupMetadata.announce == false) return m.reply("Group sudah di buka")
        sock.groupSettingUpdate(m.chat, "not_announcement")
        m.reply("Success membuka group, Sekarang semua bisa mengirim pesan")
        } else {
        m.reply("\`\`\`「 GROUP OPEN/CLOSE 」\`\`\`\n\n1. open\n2. close")
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