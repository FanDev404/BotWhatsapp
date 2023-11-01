const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["listblock"],
    cooldown: 13,
    isSewa: true,
    callback: async ({ sock, m }) => {
        let data = await sock.fetchBlocklist()
        let teks = "┌──⭓「 *LIST BLOCK* 」\n│\n"
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