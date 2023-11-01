const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["setdone"],
    cooldown: 13,
    minArgs: 1,
    expectedArgs: "<teks>",
    example: "{prefix}{command} \`\`\`「 TRANSAKSI SUCCES 」\`\`\`\n\n📆 TANGGAL : {calender}\n⌚ JAM : {time}\n👤 USERS : @{users}\n✨ STATUS  : Done\n📝 Catatan : {note}",
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    callback: async ({ m }) => {
        db.chats[m.chat].store.done = m.text
        m.reply("Success set done") 
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})