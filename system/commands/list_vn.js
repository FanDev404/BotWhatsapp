const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["listvn","listvm"],
    cooldown: 13,
    isSewa: true,
    callback: async ({ m }) => {
        let teks = "┌──⭓「 *LIST VOICE MESSAGE* 」\n│\n"
        let data = fs.readdirSync("./temp").filter((x) => (x.includes(".mp3") || x.includes(".opus"))).map((x) => x.includes(".mp3")? x.split(".mp3")[0] : x.split(".opus")[0])
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