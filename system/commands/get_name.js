const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["getname"],
    cooldown: 13,
    isSewa: true,
    callback: async ({ m }) => {
       if (m.input && Object.keys(db.users).includes(m.input)) {
       var name = db.users[m.input].name
       } else if (m.input && !Object.keys(db.users).includes(m.input)) {
       var name = m.input.split("@")[0]
       } else if (m.pushName.includes("@")) {
       var name = m.senderNumber
       } 
       m.reply(name) 
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})