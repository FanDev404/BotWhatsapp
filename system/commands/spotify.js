const fs = require("fs") 
const chalk = require("chalk")
const { spotifyDownload } = require("@libs/scrapper")
module.exports = {
    commands: ["spotify"],
    cooldown: 13,
    minArgs: 1,
    expectedArgs: "<link>",
    example: "{prefix}{command} https://open.spotify.com/track/4CeVXUIgqGpmPQRqbmJwP2?si=Vs0JREm1TQGaBvFyq1jd5g",
    isSewa: true,
    isWait: true,
    callback: async ({ sock, m }) => {
        if (!m.text.includes("spotify.com/")) return m.reply("Itu bukan link spotify") 
        if (!m.text.includes("https://open.spotify.com/track/")) return m.reply("Start with is link => https://open.spotify.com/track/") 
        if (m.text.includes("https://open.spotify.com/") && m.text.split(".com/")[0] == "https://open.spotify") {
        var link = m.args[0]
        } else return m.reply("Error link")
        const { status, buffer, message } = await spotifyDownload(link)
        if (!status) return m.reply(message) 
        await sock.sendMessage(m.chat, { audio: buffer, mimetype: "audio/mp4" }, { quoted: m })
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})