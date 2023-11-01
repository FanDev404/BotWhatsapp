const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["backup"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ sock, m }) => {
        sock.sendMessage(m.chat, { document: fs.readFileSync("./database/database.json"), mimetype: "application/bin", fileName: "database.json" }, { quoted: m })
        sock.sendMessage(m.chat, { document: fs.readFileSync("./settings.json"), mimetype: "application/bin", fileName: "settings.json" }, { quoted: m })
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})