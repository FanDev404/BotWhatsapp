const fs = require("fs") 
const chalk = require("chalk")
const { sleep } = require("@libs/function")
const { instagramDL } = require("@libs/scrapper")
module.exports = {
    commands: ["ig"],
    cooldown: 13,
    minArgs: 1,
    expectedArgs: "<link>",
    example: "{prefix}{command} https://www.instagram.com/reel/CuOxTilAfci/?igshid=NjIwNzIyMDk2Mg%3D%3D",
    isSewa: true,
    isWait: true,
    callback: async ({ sock, m }) => {
        if (!m.text.startsWith("https://www.instagram.com/")) return m.reply("Itu bukan link Instagram ka")
        const { status, data, message } = await instagramDL(m.text)
        if (!status) return m.reply(message) 
        for(let x of data) {
        if (x.type == "video/mp4") {
        sock.sendMessage(m.chat, { video: { url: x.url }, mimetype: "video/mp4" }, { quoted: m })
        await sleep(3000) 
        } else {
        sock.sendMessage(m.chat, { image: { url: x.url }}, { quoted: m }) 
        await sleep(3000) 
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