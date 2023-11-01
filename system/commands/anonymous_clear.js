const fs = require("fs") 
const chalk = require("chalk")
const i18n = require("i18n") 
const util = require("util") 
module.exports = {
    commands: ["clearanon"],
    cooldown: 13,
    isSewa: true,
    isVip: true,
    callback: async ({ m }) => {
        if (db.anonymous.length == 0) return m.reply("Tidak ada yang di room kak")
        for (let x of db.anonymous) {
        db.anonymous.splice(db.anonymous.indexOf(x, 1))
        }
        m.reply(util.format(i18n.__("success")))
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})