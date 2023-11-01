const fs = require("fs") 
const chalk = require("chalk")
const util = require("util") 
const i18n = require("i18n")
module.exports = {
    commands: ["clearmute"],
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    callback: async ({ m }) => {
        if (db.chats[m.chat].local_mute.length == 0) return m.reply("Tidak ada yang di mute kak")
        for (let x of db.chats[m.chat].local_mute) {
        db.chats[m.chat].local_mute.splice(db.chats[m.chat].local_mute.indexOf(x, 1))
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