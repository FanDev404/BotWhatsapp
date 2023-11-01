const fs = require("fs") 
const chalk = require("chalk")
const util = require("util") 
const { exec } = require("child_process")
const { TelegraPh, imageToWm } = require("@libs/uploader")
module.exports = {
    commands: ["smeme"],
    cooldown: 13,
    minArgs: 1,
    expectedArgs: "<teks>",
    example: "{prefix}{command} Punya nunum 🥰",
    isSewa: true,
    isPremium: true, 
    isWait: true,
    isMedia: {
        isImage: true, 
        isQuotedMedia: {
		       	  isQuotedImage: true,
		       	  isQuotedSticker: true
                  }
    }, 
    callback: async ({ sock, m, isQuotedImage, isImage, isQuotedSticker }) => {
        if (isImage && m.text.split("|")[0] || isQuotedImage && m.text.split("|")[0]) {
        const id = fs.readdirSync("./temp").filter((x) => !x.includes("Zzzzzzzzzz@4.0.4")).length + 1
        const media = await sock.downloadAndSaveMediaMessage((isQuotedImage? m.quoted : m), "./temp/" + id)
        const { status, data, message } = await TelegraPh(media) 
        if (!status) return m.reply(util.format(message))
        const results = await imageToWm(m.text.split("|")[0], m.text.split("|")[1], data) 
        if (!results.status) return m.reply(util.format(results.message))
        await sock.sendStickerImage(m.chat, { buffer: results.base64, packname: m.text.split("|")[0], author: m.text.split("|")[1] }, { quoted: m })
        } else if (isQuotedSticker && m.text.split("|")[0]) {
        const id = fs.readdirSync("./temp").filter((x) => !x.includes("Zzzzzzzzzz@4.0.4")).length + 1
        const media = await sock.downloadAndSaveMediaMessage(m.quoted, "./temp/" + id)
        exec(`ffmpeg -i ${media} ./temp/${id}.jpg`, async (err) => {
        if (err) return m.reply("Sticker apa tuh 😐") 
        const { status, data, message } = await TelegraPh(`./temp/${id}.jpg`) 
        if (!status) return m.reply(util.format(message))
        const results = await imageToWm(m.text.split("|")[0], m.text.split("|")[1], data) 
        if (!results.status) return m.reply(util.format(results.message))
        await sock.sendStickerImage(m.chat, { buffer: results.base64, packname: m.text.split("|")[0], author: m.text.split("|")[1] }, { quoted: m })
        })             
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