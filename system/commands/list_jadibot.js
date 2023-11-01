const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["listjadibot"],
    cooldown: 13,
    isSewa: true,
    isVip: true,
    callback: async ({ m }) => {
        let teks = "┌──⭓「 *LIST JADI BOT* 」\n│\n"
        let data = fs.readdirSync("./connections").filter((x) => !x.includes("session"))
        for (let x of data) {
        teks += `│⭔ @${x}\n`
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