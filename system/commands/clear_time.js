const fs = require("fs") 
const chalk = require("chalk")
const util = require("util") 
const i18n = require("i18n")
module.exports = {
    commands: ["cleartime"],
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    callback: async ({ m }) => {
        const data = Object.keys(db.chats[m.chat].store.key).filter((x) => db.chats[m.chat].store.key[x].time !== 0)
        if (data.length == 0) return m.reply("Tidak ada yang bisa di clear kak")
        for(let x of data) {
        db.chats[m.chat].store.key[x].time = 0
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