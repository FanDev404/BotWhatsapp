const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["togif"],
    cooldown: 13,
    isSewa: true,
    isWait: true,
    isMedia: {
        isVideo: true, 
        isQuotedMedia: {
				  isQuotedVideo: true,
                  }
	}, 
    callback: async ({ sock, m, isQuotedVideo }) => {
        if (isQuotedVideo && Object.keys(m.quoted.message[m.quoted.type]).includes("seconds") && m.quoted.message[m.quoted.type].seconds > 600 || isVideo && Object.keys(m.message[m.type]).includes("seconds") && m.message[m.type].seconds > 600) { return m.reply("Sizenya gede banget kak 🙂") }
        if ((isQuotedVideo? m.quoted.message[m.type]?.gifPlayback : m.message[m.type]?.gifPlayback)) return m.reply("Gunakan video kak jangan gif") 
        const buffer = await sock.downloadMediaMessage((isQuotedVideo? m.quoted : m))
        await sock.sendMessage(m.chat, { video: buffer, mimetype: "video/mp4", gifPlayback: true }, { quoted : m })
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})