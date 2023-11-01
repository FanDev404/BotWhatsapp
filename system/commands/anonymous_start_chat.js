const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["startchat"],
    cooldown: 13,
    isSewa: true,
    callback: async ({ sock, m }) => {
        const data = db.anonymous.filter((x) => (x.roomA == m.sender || x.roomB == m.sender))
        if (data.length > 0 && (data[0].roomA == m.sender || data[0].roomB == m.sender)) { return m.reply("Kamu masih di dalam room anonymous.") }
        if (!m.input) return m.reply("Input nomer") 
        if (db.anonymous.filter((x) => (x.roomA == m.input || x.roomB == m.input)).length > 0) return m.reply("Nomer tersebut sudah di dalam room kak") 
        m.reply(`Kamu telah membuat room anonymous, dan menjadikan @${m.input.split("@")[0]} sebagai partner.\nSekarang kamu dapat mengirim pesan.`) 
        db.anonymous.push({ roomA: m.sender, roomB: m.input, isChat: true, expired: "INFINITY" })
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})