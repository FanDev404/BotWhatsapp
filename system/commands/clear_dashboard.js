const util = require("util") 
const i18n = require("i18n")
const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["cleardash"],
    cooldown: 13,
    isSewa: true,
    isVip: true,
    callback: async ({ m }) => {
        let data = Object.keys(db.allcommand).filter((x) => (db.allcommand[x].succes > 0 || db.allcommand[x].failed > 0))
        if (data.length == 0) return m.reply("Tidak ada yang bisa di clear kak")
        for(let x of data) {
        if (db.allcommand[x].succes > 0) {
        db.allcommand[x].succes = 0
        } else if (db.allcommand[x].failed > 0) {
        db.allcommand[x].failed = 0
        }
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