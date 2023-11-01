const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["addvn","addvm"],
    cooldown: 13,
    minArgs: 1,
    expectedArgs: "<text>",
    example: "{prefix}{command} oii",
    isSewa: true,
    isOwner: true,
    isMedia: {
        isQuotedMedia: {
		       	  isQuotedAudio: true
                  }
    }, 
    callback: async ({ sock, m }) => {
        if (fs.readdirSync("./temp").filter((x) => (x.includes(".mp3") || x.includes(".opus"))).map((x) => x.includes(".mp3")? x.split(".mp3")[0] : x.split(".opus")[0]).includes(m.text)) return m.reply("Coba pakai nama lain")
        if (!isNaN(m.text)) return m.reply("Tidak bisa menggunakan angka") 
        if (Object.keys(db.allcommand).includes(m.text)) return m.reply("Jangan gunakan nama command")        
        await sock.downloadAndSaveMediaMessage(m.quoted, "./temp/" + m.text)
        await m.reply("Success add vn " + m.text)
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})