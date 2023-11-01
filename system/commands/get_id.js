const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["getid"],
    cooldown: 13,
    isSewa: true,
    callback: async ({ m }) => {
       if (m.input) {
       m.reply(m.input)
       } else {
       m.reply(m.chat) 
       }
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})