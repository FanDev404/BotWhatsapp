const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["delpay","delpayment"],
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    callback: async ({ m }) => {
        if (db.chats[m.chat].store.pay.text !== "" && db.chats[m.chat].store.pay.isImage !== "") {
        db.chats[m.chat].store.pay.text = ""
        db.chats[m.chat].store.pay.isImage  = ""
        m.reply("Success delete payment.") 
        } else if (db.chats[m.chat].store.pay.isImage !== "") {
        db.chats[m.chat].store.pay.isImage  = ""
        m.reply("Success delete payment.") 
        } else if (db.chats[m.chat].store.pay.text !== "") {
        db.chats[m.chat].store.pay.text = ""
        m.reply("Success delete payment.") 
        } else m.reply("Belum ada payment di group ini")
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})