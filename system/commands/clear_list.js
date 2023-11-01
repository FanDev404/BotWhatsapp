const fs = require("fs") 
const chalk = require("chalk")
const util = require("util") 
const i18n = require("i18n")
module.exports = {
    commands: ["clearlist"],
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    callback: async ({ m }) => {
        if (Object.keys(db.chats[m.chat].store.key).length == 0) return m.reply("Tidak ada yang bisa di clear kak")
        db.chats[m.chat].store.key = {}
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