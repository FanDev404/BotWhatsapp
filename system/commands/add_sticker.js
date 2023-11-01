const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["addstick"],
    cooldown: 13,
    minArgs: 1,
    expectedArgs: "<text>",
    example: "{prefix}{command} oii",
    isSewa: true,
    isOwner: true,
    isMedia: {
        isQuotedMedia: {
		       	  isQuotedSticker: true
                  }
    }, 
    callback: async ({ sock, m }) => {
        if (fs.readdirSync("./temp").filter((x) => (x.includes(".webp") && isNaN(parseInt(x)))).map((x) => x.split(".webp")[0]).includes(m.text)) return m.reply("Coba pakai nama lain")
        if (!isNaN(m.text)) return m.reply("Tidak bisa menggunakan angka") 
        if (Object.keys(db.allcommand).includes(m.text)) return m.reply("Jangan gunakan nama command")        
        await sock.downloadAndSaveMediaMessage(m.quoted, "./temp/" + m.text)
        await m.reply("Success add sticker " + m.text)
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})