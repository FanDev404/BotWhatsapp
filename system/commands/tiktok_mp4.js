const fs = require("fs") 
const chalk = require("chalk")
const util = require("util") 
const { getBuffer } = require("@libs/function")
const { tiktokDl } = require("@libs/uploader")
module.exports = {
    commands: ["tiktokmp4","ttmp4"],
    cooldown: 13,
    minArgs: 1,
    expectedArgs: "<link>",
    example: "{prefix}{command} https://vt.tiktok.com/ZSwWCk5o/",
    isSewa: true,
    isLimit: true,
    callback: async ({ sock, m }) => {
        if (m.text.includes("https://vt.tiktok.com/") && m.text.split(".com/")[0] == "https://vt.tiktok" && m.text.split(".com/")[1] !== "") {
        var link = m.args[0]
        } else if (m.text.includes("https://vm.tiktok.com/") && m.text.split(".com/")[0] == "https://vm.tiktok" && m.text.split(".com/")[1] !== "") {
        var link = m.args[0]
        } else if (m.text.includes("https://www.tiktok.com/") && m.text.split(".com/")[0] == "https://www.tiktok" && m.text.split(".com/")[1] !== "") {
        var link = m.args[0]
        } else return m.reply("Error link")
        const { status, data, message } = await tiktokDl(link)
        if (!status && Object.keys(db.expired).includes(m.botNumber) && Object.keys(db.expired[m.botNumber].sewa).includes(m.chat) && !m.key.fromMe && !m.isPremium) {
        db.chats[m.chat].limit += 1
        return m.reply(util.format(message) + ", limit group akan kembali 1")
        } else if (!status && !m.key.fromMe && !m.isPremium) {
        db.users[m.sender].limit += 1
        return m.reply(util.format(message) + ", limit kamu akan kembali 1")
        } else if (!status) return m.reply(util.format(message))
        const buffer = await getBuffer(data.video.noWatermark)
        sock.sendMessage(m.chat, { video: buffer, mimetype: "video/mp4" }, { quoted: m })        
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})