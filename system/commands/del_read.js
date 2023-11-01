const fs = require("fs") 
const chalk = require("chalk")
const config = require("@config")
module.exports = {
    commands: ["delread","unread"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ sock, m }) => {
        if (!m.input) return m.reply("Input nomer")
        if (m.input.startsWith("08")) return m.reply("Gunakan code negara kak")
        if ((await sock.onWhatsApp(m.input)).length == 0) return m.reply("Nomer itu sudah tidak aktif kak")
        if (m.input == m.botNumber) return m.reply("Coba gunakan nomer lain kak")
        if (config[m.botNumber].local_unread.includes(m.input)) return m.reply("Sudah ke unread kak")
        if (!config[m.botNumber].autoread && !config[m.botNumber].local_read.includes(m.input)) return m.reply("Fiture auto read belum active kak")
        if (config[m.botNumber].local_read.includes(m.input)) config[m.botNumber].local_read.splice(config[m.botNumber].local_read.indexOf(m.input, 1))
        config[m.botNumber].local_unread.push(m.input)
        await m.reply("Success delete read @" + m.input.split("@")[0])
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})