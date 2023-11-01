const fs = require("fs") 
const chalk = require("chalk")
const util = require("util") 
const i18n = require("i18n")
module.exports = {
    commands: ["clearmedia"],
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    callback: async ({ m }) => {
        const data = Object.keys(db.chats[m.chat].store.key)
        if (data.length == 0 && db.chats[m.chat].store.isImage == "") return m.reply("Tidak ada yang bisa di clear kak")
        if (db.chats[m.chat].store.isImage !== "") db.chats[m.chat].store.isImage = ""
        for(let x of data) {
        if (db.chats[m.chat].store.key[x].isImage !== "") {
        db.chats[m.chat].store.key[x].isImage = ""
        } else if (db.chats[m.chat].store.key[x].isDocument.url !== "") {
        db.chats[m.chat].store.key[x].isDocument = { url: "", fileName: "" }
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