const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["stop","keluar"],
    cooldown: 13,
    isSewa: true,
    isPrivate: true,
    callback: async ({ sock, m }) => {
        const data = db.anonymous.filter((x) => (x.roomA == m.chat || x.roomB == m.chat))
        if (data.length == 0) return m.reply("Kamu tidak dalam room anonymous.")
        if (data[0].roomA == m.chat && data[0].roomB !== "") {
        if (!m.isBlock(data[0].roomB)) m.reply("Partnermu telah meninggalkan room anonymous.", data[0].roomB, data[0].roomB, {}) 
        m.reply("Kamu telah keluar dari room anonymous.") 
        db.anonymous.splice(db.anonymous.indexOf(data[0], 1))
        } else if (data[0].roomB == m.chat && data[0].roomA !== "") {
        if (!m.isBlock(data[0].roomA)) m.reply("Partnermu telah meninggalkan room anonymous.", data[0].roomA, data[0].roomA, {}) 
        m.reply("Kamu telah keluar dari room anonymous.") 
        db.anonymous.splice(db.anonymous.indexOf(data[0], 1))
        } else if (data[0].roomA == m.chat && data[0].roomB == "") {
        m.reply("Kamu telah keluar dari room anonymous.") 
        db.anonymous.splice(db.anonymous.indexOf(data[0], 1))
        } else if (data[0].roomB == m.chat && data[0].roomA == "") {
        m.reply("Kamu telah keluar dari room anonymous.") 
        db.anonymous.splice(db.anonymous.indexOf(data[0], 1))
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