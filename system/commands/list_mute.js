const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["listmute"],
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    callback: async ({ m }) => {
        let data = db.chats[m.chat].local_mute
        let teks = "┌──⭓「 *LIST MUTE* 」\n│\n"
        for (let x of data) {
        teks += `│⭔ @${x.split("@")[0]}\n`
        }
        teks += `│\n└────────────⭓\n\n*Total ada : ${data.length}*`
        m.reply(teks)
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})