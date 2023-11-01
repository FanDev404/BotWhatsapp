const fs = require("fs") 
const chalk = require("chalk")
const { toAudio } = require("@libs/converter")
module.exports = {
    commands: ["toopus","tovn","tovm"],
    cooldown: 13,
    isSewa: true,
    isWait: true,
    isMedia: {
        isVideo: true, 
        isQuotedMedia: {
				  isQuotedVideo: true,
			      isQuotedAudio: true,
                  }
	}, 
    callback: async ({ sock, m, isVideo, isQuotedVideo, isQuotedAudio }) => {
        if (isVideo || isQuotedVideo) {
        if (isQuotedVideo && Object.keys(m.quoted.message[m.quoted.type]).includes("seconds") && m.quoted.message[m.quoted.type].seconds > 600 || isVideo && Object.keys(m.message[m.type]).includes("seconds") && m.message[m.type].seconds > 600) { return m.reply("Sizenya gede banget kak 🙂") }
        const id = fs.readdirSync("./temp").filter((x) => !x.includes("Zzzzzzzzzz@4.0.4")).length + 1
        const media = await sock.downloadAndSaveMediaMessage((isQuotedVideo? m.quoted : m), "./temp/" + id)
        const buffer = await toAudio(media, "mp4")
        await sock.sendMessage(m.chat, { audio: buffer, mimetype: "audio/mpeg", ptt: true }, { quoted : m })
        } else if (isQuotedAudio) {
        if (m.quoted.message[m.quoted.type].ptt) return m.reply("Kakak baka itu udah pesan suara 😒")
        const buffer = await sock.downloadMediaMessage(m.quoted)
        await sock.sendMessage(m.chat, { audio: buffer, mimetype: "audio/mp4", ptt: true }, { quoted : m })
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