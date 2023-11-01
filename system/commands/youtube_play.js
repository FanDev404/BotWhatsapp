const fs = require("fs") 
const chalk = require("chalk")
const { Client } = require("youtubei")
const { youtubeDL } = require("@libs/scrapper")
const { pickRandom } = require("@libs/function")
const youtubei = new Client()
module.exports = {
    commands: ["play"],
    cooldown: 13,
    minArgs: 1,
    expectedArgs: "<teks>",
    example: "{prefix}{command} melukis senja",
    isSewa: true,
    callback: async ({ sock, m }) => {
        youtubei.search(m.text, { type: "video" }).then(async (res) => {
        const data = res.map((x) => { return { id: x.id, title: x["title"], duration: x["duration"], views: x["viewCount"], thumbnail: x.thumbnails[0].url.split("?")[0] } })
        const result = data.slice(0, 5).filter((x) => (Number(x.duration) <= 600))
        const results = pickRandom(result) 
        if (result.length == 0) return m.reply("Results not found") 
        const resultss = await youtubeDL(("https://www.youtube.com/watch?v=" + results.id), "mp3")
        if (!resultss.status) return m.reply(resultss.message) 
        let teks = "\`\`\`「 YOUTUBE PLAY 」\`\`\`\n\n"
        teks += `⭔ *Title* : ${results.title}\n`
        teks += `⭔ *Duration* : ${results.duration}\n`
        teks += `⭔ *Size* : ${resultss.data.fileSize}\n`
        teks += `⭔ *Quality* : ${resultss.data.quality}\n`
        teks += `⭔ *Views* : ${results.views?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}\n`
        teks += `⭔ *Link* : https://www.youtube.com/watch?v=${results.id}`
        m.reply(teks)
        sock.sendMessage(m.chat, { audio: { url: resultss.data.link }, mimetype: "audio/mp4", ptt: false }, { quoted: m })
        })
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})