const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["liststick"],
    cooldown: 13,
    isSewa: true,
    callback: async ({ m }) => {
        let teks = "┌──⭓「 *LIST STICKER* 」\n│\n"
        let data = fs.readdirSync("./temp").filter((x) => (x.includes(".webp") && isNaN(parseInt(x)))).map((x) => x.split(".webp")[0])
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