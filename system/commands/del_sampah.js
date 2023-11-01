const fs = require("fs")
const chalk = require("chalk")
module.exports = {
    commands: ["delsampah","clearsampah"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ m }) => {
        let files = fs.readdirSync("./temp").filter((x) => (x !== "Zzzzzzzzzz@4.0.4" || !isNaN(parseInt(x)))) 
        if (files.length == 0) return m.reply("Terdeteksi 0 file sampah")
        m.reply(`Terdeteksi ${files.length} file sampah`)
        setTimeout(() => {
        m.reply("Menghapus file sampah......")
        for (let x of files) {
        fs.unlinkSync(`./temp/${x}`)
        }
        }, 2000)
        setTimeout(() => {
        m.reply("Success menghapus file sampah")
        }, 5000)
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})