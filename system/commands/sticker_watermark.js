const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["take","wm","swm"],
    cooldown: 13,
    minArgs: 1,
    expectedArgs: "<teks>",
    example: "{prefix}{command} Punya nunum lesbi 🥰",
    isSewa: true,
    isPremium: true, 
    isWait: true,
    isMedia: {
        isImage: true, 
        isVideo: true, 
        isQuotedMedia: {
		       	  isQuotedImage: true, 
		       	  isQuotedVideo: true, 
		       	  isQuotedSticker: true
                  }
    }, 
    callback: async ({ sock, m, isQuotedImage, isQuotedVideo, isImage, isVideo, isQuotedSticker }) => {
        if (isImage && m.text.split("|")[0] || isQuotedImage && m.text.split("|")[0]) {
        const id = fs.readdirSync("./temp").filter((x) => !x.includes("Zzzzzzzzzz@4.0.4")).length + 1
        const media = await sock.downloadAndSaveMediaMessage((isQuotedImage? m.quoted : m), "./temp/" + id)
        await sock.sendStickerImage(m.chat, { buffer: media, packname: m.text.split("|")[0], author: m.text.split("|")[1] }, { quoted: m })
        } else if (isVideo && m.text.split("|")[0] || isQuotedVideo && m.text.split("|")[0]) {
        if (isQuotedVideo && Object.keys(m.quoted.message[m.quoted.type]).includes("seconds") && m.quoted.message[m.quoted.type].seconds > 10 || isVideo && Object.keys(m.message[m.type]).includes("seconds") && m.message[m.type].seconds > 10) { return m.reply("Hanya dapat mendownload video sampai 10 detik kak") }
        const id = fs.readdirSync("./temp").filter((x) => !x.includes("Zzzzzzzzzz@4.0.4")).length + 1
        const media = await sock.downloadAndSaveMediaMessage((isQuotedVideo? m.quoted : m), "./temp/" + id)
        await sock.sendStickerVideo(m.chat, { buffer: media, packname: m.text.split("|")[0], author: m.text.split("|")[1] }, { quoted: m })
        } else if (isQuotedSticker && m.text.split("|")[0]) {
        const id = fs.readdirSync("./temp").filter((x) => !x.includes("Zzzzzzzzzz@4.0.4")).length + 1
        const media = await sock.downloadAndSaveMediaMessage(m.quoted, "./temp/" + id)
        try{
        await sock.sendStickerImage(m.chat, { buffer: media, packname: m.text.split("|")[0], author: m.text.split("|")[1] }, { quoted: m })
        } catch {
        m.reply("Sticker apa tuh 😐") 
        }
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