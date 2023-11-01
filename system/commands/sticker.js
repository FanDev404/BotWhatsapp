const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["s","sticker"],
    cooldown: 13,
    isSewa: true,
    isWait: true, 
    isMedia: {
        isImage: true, 
        isVideo: true, 
        isQuotedMedia: {
		       	  isQuotedImage: true, 
		       	  isQuotedVideo: true
                  }
    }, 
    callback: async ({ sock, m, isQuotedImage, isQuotedVideo, isImage, isVideo }) => {
        if (isImage || isQuotedImage) {
        const id = fs.readdirSync("./temp").filter((x) => !x.includes("Zzzzzzzzzz@4.0.4")).length + 1
        const media = await sock.downloadAndSaveMediaMessage((isQuotedImage? m.quoted : m), "./temp/" + id)
        if (m.isPremium) {
        await sock.sendStickerImage(m.chat, { buffer: media, packname: m.pushName, author: m.senderNumber }, { quoted: m })                
        } else {
        await sock.sendStickerImage(m.chat, { buffer: media, packname: m.botName, author: m.ownerNumber }, { quoted: m })
        }
        } else if (isVideo || isQuotedVideo) {
        if (isQuotedVideo && Object.keys(m.quoted.message[m.quoted.type]).includes("seconds") && m.quoted.message[m.quoted.type].seconds > 10 || isVideo && Object.keys(m.message[m.type]).includes("seconds") && m.message[m.type].seconds > 10) { return m.reply("Hanya dapat mendownload video sampai 10 detik kak") }
        const id = fs.readdirSync("./temp").filter((x) => !x.includes("Zzzzzzzzzz@4.0.4")).length + 1
        const media = await sock.downloadAndSaveMediaMessage((isQuotedVideo? m.quoted : m), "./temp/" + id)
        if (m.isPremium) {
        await sock.sendStickerVideo(m.chat, { buffer: media, packname: m.pushName, author: m.senderNumber }, { quoted: m })                
        } else {
        await sock.sendStickerVideo(m.chat, { buffer: media, packname: m.botName, author: m.ownerNumber }, { quoted: m })
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