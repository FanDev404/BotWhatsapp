const fs = require("fs") 
const chalk = require("chalk")
const { runtime } = require("@libs/function")
module.exports = {
    commands: ["runtime"],
    cooldown: 13,
    isSewa: true,
    callback: async ({ m }) => {
        m.reply(`${runtime(process.uptime())}`)
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})