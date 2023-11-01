const fs = require("fs") 
const chalk = require("chalk")
const util = require("util") 
const i18n = require("i18n")
const config = require("@config")
module.exports = {
    commands: ["clearread"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ m }) => {
        if (m.text == "read") {
        if (config[m.botNumber].local_read.length == 0) return m.reply("Tidak ada yang bisa di clear kak")
        for(let x of config[m.botNumber].local_read) {
        config[m.botNumber].local_read.splice(config[m.botNumber].local_read.indexOf(x, 1))
        }
        m.reply(util.format(i18n.__("success")))
        } else if (m.text == "unread") {
        if (config[m.botNumber].local_unread.length == 0) return m.reply("Tidak ada yang bisa di clear kak")
        for(let x of config[m.botNumber].local_unread) {
        config[m.botNumber].local_unread.splice(config[m.botNumber].local_unread.indexOf(x, 1))
        }
        m.reply(util.format(i18n.__("success")))
        } else {
        if (config[m.botNumber].local_read.length == 0 && config[m.botNumber].local_unread.length == 0) return m.reply("Tidak ada yang bisa di clear kak")
        for(let x of config[m.botNumber].local_read) {
        config[m.botNumber].local_read.splice(config[m.botNumber].local_read.indexOf(x, 1))
        }
        for(let x of config[m.botNumber].local_unread) {
        config[m.botNumber].local_unread.splice(config[m.botNumber].local_unread.indexOf(x, 1))
        }
        m.reply(util.format(i18n.__("success")))
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