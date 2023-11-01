const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["wame"],
    cooldown: 13,
    isSewa: true,
    callback: async ({ m }) => {
        if (m.input) {
        m.reply("https://wa.me/" + m.input.split("@")[0]) 
        } else m.reply("https://wa.me/" + m.senderNumber) 
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})