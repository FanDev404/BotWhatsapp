const util = require("util") 
const fs = require("fs") 
const chalk = require("chalk")
const { uploadFileApi } = require("@libs/uploader")
module.exports = {
    commands: ["tourl"],
    cooldown: 13,
    isSewa: true,
    isPremium: true, 
    isWait: true,
    isMedia: {
        isImage: true,
        isVideo: true, 
        isDocument: true, 
        isQuotedMedia: {
		       	  isQuotedImage: true,
				  isQuotedVideo: true,
			      isQuotedAudio: true,
			      isQuotedSticker: true,
			      isQuotedDocument: true,
                  }
	}, 
    callback: async ({ sock, m, isImage, isQuotedImage }) => {
        const id = fs.readdirSync("./temp").filter((x) => !x.includes("Zzzzzzzzzz@4.0.4")).length + 1
        const media = await sock.downloadAndSaveMediaMessage((m.quoted? m.quoted : m), "./temp/" + id)
        const { status, data, message } = await uploadFileApi(media) 
        if (!status) return m.reply(util.format(message))
        m.reply(util.format(data)) 
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})