const fs = require("fs") 
const chalk = require("chalk")
const { getBuffer } = require("@libs/function")
module.exports = {
    commands: ["getppgc"],
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    isWait: true,
    callback: async ({ sock, m }) => {
        try{
        var ppimg = await sock.profilePictureUrl(m.chat, "image")
        } catch {
        var ppimg = "https://raw.githubusercontent.com/Aztecs444/media/Zeck/image/profilePicture.jpg"
        }
        const buffer = await getBuffer(ppimg)
        await sock.sendMessage(m.chat, { image: buffer }, { quoted: m })
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})