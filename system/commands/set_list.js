const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["setlist"],
    cooldown: 13,
    minArgs: 1,
    expectedArgs: "<teks>",
    example: "{prefix}{command} Diamond ML",
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    callback: async ({ m, isQuotedText }) => {
        const data = Object.keys(db.chats[m.chat].store.key).filter((x) => (x.toLowerCase() == m.text.toLowerCase()))
        if (data.length == 0) return m.reply("Nama tersebut tidak ada dalam list kak")
        if (!isQuotedText) return m.reply("Reply pesan kak") 
        db.chats[m.chat].store.key[data[0]].text = m.quoted.budy
        m.reply("Success set list dengan key " + data[0]) 
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})