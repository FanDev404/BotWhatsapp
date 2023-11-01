const fs = require("fs") 
const chalk = require("chalk")
const util = require("util") 
const { getBuffer } = require("@libs/function")
const { tiktokDl } = require("@libs/uploader")
module.exports = {
    commands: ["tiktokmp3","ttmp3"],
    cooldown: 13,
    minArgs: 1,
    expectedArgs: "<link>",
    example: "{prefix}{command} https://vt.tiktok.com/ZSwWCk5o/",
    isSewa: true,
    isLimit: true,
    callback: async ({ sock, m }) => {
        if (m.text.includes("https://vt.tiktok.com/") && m.text.split(".com/")[0] == "https://vt.tiktok" && m.text.split(".com/")[1] !== "" && m.text.includes("@original") && m.text.split("@original")[0] !== "") {
        var link = m.text.split("@original")[0]
        } else if (m.text.includes("https://vm.tiktok.com/") && m.text.split(".com/")[0] == "https://vm.tiktok" && m.text.split(".com/")[1] !== "" && m.text.includes("@original") && m.text.split("@original")[0] !== "") {
        var link = m.text.split("@original")[0]
        } else if (m.text.includes("https://www.tiktok.com/") && m.text.split(".com/")[0] == "https://www.tiktok" && m.text.split(".com/")[1] !== "" && m.text.includes("@original") && m.text.split("@original")[0] !== "") {
        var link = m.text.split("@original")[0]
        } else if (m.text.includes("https://vt.tiktok.com/") && m.text.split(".com/")[0] == "https://vt.tiktok" && m.text.split(".com/")[1] !== "") {
        var link = m.text
        } else if (m.text.includes("https://vm.tiktok.com/") && m.text.split(".com/")[0] == "https://vm.tiktok" && m.text.split(".com/")[1] !== "") {
        var link = m.text
        } else if (m.text.includes("https://www.tiktok.com/") && m.text.split(".com/")[0] == "https://www.tiktok" && m.text.split(".com/")[1] !== "") {
        var link = m.text
        } else return m.reply("Error link")
        const { status, data, message } = await tiktokDl(link)
        if (!status && Object.keys(db.expired).includes(m.botNumber) && Object.keys(db.expired[m.botNumber].sewa).includes(m.chat) && !m.key.fromMe && !m.isPremium) {
        db.chats[m.chat].limit += 1
        return m.reply(util.format(message) + ", limit group akan kembali 1")
        } else if (!status && !m.key.fromMe && !m.isPremium) {
        db.users[m.sender].limit += 1
        return m.reply(util.format(message) + ", limit kamu akan kembali 1")
        } else if (!status) return m.reply(util.format(message))
        const buffer = await getBuffer((m.text.includes("@original")? data.music.play_url : data.video.noWatermark))
        sock.sendMessage(m.chat, { audio: buffer, mimetype: "audio/mp4" }, { quoted: m })
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})