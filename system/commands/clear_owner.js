const fs = require("fs") 
const chalk = require("chalk")
const util = require("util") 
const i18n = require("i18n")
module.exports = {
    commands: ["clearowner"],
    cooldown: 13,
    isSewa: true,
    isVip: true,
    callback: async ({ m }) => {
        if (Object.keys(db.expired[m.botNumber].vip).length == 0 && Object.keys(db.expired[m.botNumber].owner).length == 0) return m.reply("Tidak ada yang bisa di clear kak")
        if (Object.keys(db.expired[m.botNumber].vip).length > 0) {
        db.expired[m.botNumber].vip = {}
        }
        if (Object.keys(db.expired[m.botNumber].owner).length > 0) {
        db.expired[m.botNumber].owner = {}
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