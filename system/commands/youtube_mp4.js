const fs = require("fs") 
const chalk = require("chalk")
const { youtubeDL } = require("@libs/scrapper")
module.exports = {
    commands: ["ytmp4"],
    cooldown: 13,
    minArgs: 1,
    expectedArgs: "<link>",
    example: "{prefix}{command} https://www.youtube.com/watch?v=eZskFo64rs8",
    isSewa: true,
    isWait: true,
    callback: async ({ sock, m }) => {
        if (m.text.includes("https://youtube.com/channel/")) return m.reply("Kakak baka 😤")
        if (m.text.includes("https://www.youtube.com/watch?v=") && m.text.split(".com/")[0] == "https://www.youtube" && m.text.split("watch?v=")[1] !== "") {
        var link = m.args[0]
        } else if (m.text.includes("https://youtu.be/") && m.text.split("youtu.be/")[0] == "https://" && m.text.split("youtu.be/")[1] !== "") {
        var link = "https://www.youtube.com/watch?v=" + m.text.split("https://youtu.be/")[1]
        } else if (m.text.includes("https://youtube.com/watch?v=") && m.text.split(".com/")[0] == "https://youtube" && m.text.split("watch?v=")[1] !== "") {
        var link = "https://www.youtube.com/watch?v=" + m.text.split("https://youtube.com/watch?v=")[1]
        } else if (m.text.includes("https://youtube.com/shorts/") && m.text.split(".com/")[0] == "https://youtube" && m.text.split("shorts/")[1] !== "") {
        var link = "https://www.youtube.com/watch?v=" + m.text.split("https://youtube.com/shorts/")[1]
        } else return m.reply("Error link")
        const { status, data, message } = await youtubeDL(link, "mp4")
        if (!status) return m.reply(message) 
        if (parseInt(data.size) > 10000) return m.reply("Sizenya gede banget kak 🙂")
        sock.sendMessage(m.chat, { video: { url: data.link }, mimetype: "video/mp4" }, { quoted: m })
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})