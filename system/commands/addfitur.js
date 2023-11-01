const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["addfitur"],
    cooldown: 13,
    isSewa: true,
    isVip: true,
    isMedia: {
        isDocument: true, 
        isQuotedMedia: {
		       	  isQuotedDocument: true
                  }
    }, 
    callback: async ({ sock, m, isQuotedDocument }) => {
        const data = fs.readdirSync("./system/commands").filter((x) => x.includes(".js") && !x.includes(".js.bak"))
        const fileName = isQuotedDocument? m.quoted.message["documentMessage"].fileName : m.message["documentMessage"].fileName
        if (data.includes(fileName)) return m.reply("Coba pakai nama file lain")
        const media = await sock.downloadMediaMessage(isQuotedDocument? m.quoted : m)
        setTimeout(() => {
        process.send("reset")
        }, 3000)
        setTimeout(() => {
        fs.writeFileSync("./system/commands/" + fileName, media)
        }, 2000)
        m.reply("Success add file to command")
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})