const fs = require("fs") 
const chalk = require("chalk")
const i18n = require("i18n") 
const util = require("util") 
module.exports = {
    commands: ["delanon"],
    cooldown: 13,
    isSewa: true,
    isVip: true,
    callback: async ({ sock, m }) => {
        if (!m.input) return m.reply("Input nomer") 
        const data = db.anonymous.filter((x) => (x.roomA == m.input || x.roomB == m.input))
        if (data.length == 0) return m.reply("Nomer tersebut tidak dalam room anonymous.")
        if (data[0].roomA !== "" && data[0].roomB !== "") {
        if (!m.isBlock(data[0].roomA)) m.reply("Kamu telah keluar dari room anonymous.", data[0].roomA, data[0].roomA, {}) 
        if (!m.isBlock(data[0].roomB)) m.reply("Kamu telah keluar dari room anonymous.", data[0].roomB, data[0].roomB, {}) 
        m.reply(util.format(i18n.__("success")))
        db.anonymous.splice(db.anonymous.indexOf(data[0], 1))
        } else if (data[0].roomA !== "") {
        if (!m.isBlock(data[0].roomA)) m.reply("Kamu telah keluar dari room anonymous.", data[0].roomA, data[0].roomA, {}) 
        m.reply(util.format(i18n.__("success")))
        db.anonymous.splice(db.anonymous.indexOf(data[0], 1))
        } else if (data[0].roomB !== "") {
        if (!m.isBlock(data[0].roomB)) m.reply("Kamu telah keluar dari room anonymous.", data[0].roomB, data[0].roomB, {}) 
        m.reply(util.format(i18n.__("success")))
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