const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["listblockcmd"],
    cooldown: 13,
    isSewa: true,
    callback: async ({ m }) => {
        let data = db.blockcmd
        let teks = "┌──⭓「 *LIST BLOCK COMMAND* 」\n│\n"
        for (let x of data) {
        teks += `│⭔ ${x}\n`
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