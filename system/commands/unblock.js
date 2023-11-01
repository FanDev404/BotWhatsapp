const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["unblock"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ sock, m }) => {
        const listBlock = await sock.fetchBlocklist()
        if (!m.input) return m.reply("Input nomer")
        if (m.input.startsWith("08")) return m.reply("Gunakan code negara kak")
        if ((await sock.onWhatsApp(m.input)).length == 0) return m.reply("Nomer itu sudah tidak aktif kak")
        if (m.input == m.botNumber) return m.reply("Itu nomer bot kak") 
        if (!listBlock.includes(m.input)) return m.reply("Sudah di unblock")
        sock.updateBlockStatus(m.input, "unblock")
        await m.reply(`Success unblock @${m.input.split("@")[0]}`)
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})