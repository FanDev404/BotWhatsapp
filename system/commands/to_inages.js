const util = require("util") 
const fs = require("fs") 
const chalk = require("chalk")
const { exec } = require("child_process")
module.exports = {
    commands: ["toimg"],
    cooldown: 13,
    isSewa: true,
    isWait: true,
    isMedia: {
        isQuotedMedia: {
		       	  isQuotedSticker: true
                  }
    }, 
    callback: async ({ sock, m }) => {
        const id = fs.readdirSync("./temp").filter((x) => !x.includes("Zzzzzzzzzz@4.0.4")).length + 1
        const media = await sock.downloadAndSaveMediaMessage(m.quoted, "./temp/" + id)
        try{
        exec(`ffmpeg -i ${media} ./temp/${id}.jpg`, async (err) => {
        if (err) return m.reply(util.format(err)) 
        sock.sendMessage(m.chat, { image: fs.readFileSync(`./temp/${id}.jpg`) }, { quoted: m })
        })
        } catch {
        fs.rename(media, `./temp/${id}.jpg`, async (err) => {
        if (err) return m.reply(util.format(err)) 
        sock.sendMessage(m.chat, { image: fs.readFileSync(`./temp/${id}.jpg`) }, { quoted: m })
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