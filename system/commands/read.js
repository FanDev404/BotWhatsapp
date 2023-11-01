const fs = require("fs") 
const chalk = require("chalk")
const { getContentType } = require("baileys")
module.exports = {
    commands: ["read"],
    cooldown: 13,
    isSewa: true,
    isMedia: {
        isQuotedMedia: {
		       	  isQuotedViewOnce: true
                  }
    }, 
    callback: async ({ sock, m }) => {
        const media = await sock.downloadMediaMessage(m.quoted)
        if (getContentType(m.quoted.message) == "videoMessage") {
        if (Object.keys(m.quoted.message["videoMessage"]).includes("seconds") && m.quoted.message["videoMessage"].seconds > 600) return m.reply("Sizenya gede banget kak 🙂") 
        sock.sendMessage(m.chat, { video: media, caption: m.quoted.body }, { quoted: m })
        } else if (getContentType(m.quoted.message) == "imageMessage") {
        sock.sendMessage(m.chat, { image: media, caption: m.quoted.body }, { quoted: m })
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