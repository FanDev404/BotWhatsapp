const util = require("util") 
const i18n = require("i18n")
const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["clearstick"],
    cooldown: 13,
    isSewa: true,
    isVip: true,
    callback: async ({ m }) => {
        let data = fs.readdirSync("./temp").filter((x) => (x.includes(".webp") && isNaN(parseInt(x))))
        if (data.length == 0) return m.reply("Tidak ada yang bisa di clear kak")
        for (let x of data) {
        fs.unlinkSync("./temp/" + x)
        }
        m.reply(util.format(i18n.__("success")))
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})