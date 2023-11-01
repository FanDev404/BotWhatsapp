const fs = require("fs") 
const chalk = require("chalk")
const util = require("util") 
const { exec } = require("child_process")
const { editBackground } = require("@libs/uploader")
module.exports = {
    commands: ["editbg"],
    cooldown: 13,
    minArgs: 1,
    expectedArgs: "<color>",
    example: "{prefix}{command} blue",
    isSewa: true,
    isPremium: true,
    isMedia: {
        isImage: true, 
        isQuotedMedia: {
		       	  isQuotedImage: true, 
		       	  isQuotedSticker: true
                  }
    }, 
    callback: async ({ sock, m, isImage, isQuotedImage, isQuotedSticker }) => {
        const id = fs.readdirSync("./temp").filter((x) => !x.includes("Zzzzzzzzzz@4.0.4")).length + 1
        if (isImage || isQuotedImage) {
        const media = await sock.downloadAndSaveMediaMessage((isQuotedImage? m.quoted : m), "./temp/" + id)
        const { status, data, message } = await editBackground(media, m.text) 
        if (!status) return m.reply(util.format(message))
        sock.sendMessage(m.chat, { image: data }, { quoted: m })
        } else if (isQuotedSticker) {
        const media = await sock.downloadAndSaveMediaMessage(m.quoted, "./temp/" + id)
        exec(`ffmpeg -i ${media} ./temp/${id}.jpg`, async (err) => {
        const { status, data, message } = await editBackground(`./temp/${id}.jpg`, m.text) 
        if (!status) return m.reply(util.format(message))
        await sock.sendStickerImage(m.chat, { buffer: data, packname: m.pushName, author: m.senderNumber }, { quoted: m })
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