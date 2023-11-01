const fs = require("fs") 
const chalk = require("chalk")
const config = require("@config")
module.exports = {
    commands: ["listread"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ m }) => {
        let data = config[m.botNumber].local_read
        let teks = "┌──⭓「 *LIST READ* 」\n│\n"
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