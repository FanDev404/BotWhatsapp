const fs = require("fs") 
const chalk = require("chalk")
const { quickChatToBuffer } = require("@libs/uploader")
module.exports = {
    commands: ["qc"],
    cooldown: 13,
    isSewa: true,
    isPremium: true, 
    callback: async ({ sock, m }) => {
        if (!m.quoted && !m.text) return m.reply("Pesannya?")
        if (m.quoted) {
        if (m.quoted.body == "") return m.reply("Pesannya?")
        if (m.quoted.body.split(" ").length > 25) return m.reply("Maksimal 25 kak")
        try{
        var ppimg = await sock.profilePictureUrl(m.input, "image")
        } catch {
        var ppimg = "https://raw.githubusercontent.com/Aztecs444/media/Zeck/image/profilePicture.jpg"
        }
        const { status, data, message } = await quickChatToBuffer(m.quoted.pushName, m.quoted.body, ppimg)
        if (!status) return m.reply(message)
        const buffer = Buffer.alloc(data.length, data, "base64")
        await sock.sendStickerImage(m.chat, { buffer, packname: m.botName, author: m.pushName }, { quoted: m })                
        } else {
        if (m.args.length > 25) return m.reply("Maksimal 25 kak")
        try{
        var ppimg = await sock.profilePictureUrl(m.sender, "image")
        } catch {
        var ppimg = "https://raw.githubusercontent.com/Aztecs444/media/Zeck/image/profilePicture.jpg"
        }
        const { status, data, message } = await quickChatToBuffer(m.pushName, m.text, ppimg)
        if (!status) return m.reply(message)
        const buffer = Buffer.alloc(data.length, data, "base64")
        await sock.sendStickerImage(m.chat, { buffer, packname: m.botName, author: m.pushName }, { quoted: m })
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