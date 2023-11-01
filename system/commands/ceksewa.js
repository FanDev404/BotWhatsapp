const fs = require("fs") 
const chalk = require("chalk")
const { vipSewa } = require("@config") 
const { timeToEpired } = require("@libs/function")
module.exports = {
    commands: ["ceksewa"],
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    callback: async ({ m }) => {
        if (vipSewa.includes(m.chat)) {
        var cekvip = "PERMANENT"
        } else if (db.chats[m.chat].sewa.status) {
        var cekvip = timeToEpired(db.chats[m.chat].sewa.expired) 
        } else if (Object.keys(db.expired[m.botNumber].sewa).includes(m.chat)) {
        var cekvip = db.expired[m.botNumber].sewa[m.chat].expired == "INFINITY"? "PERMANENT" : timeToEpired(db.expired[m.botNumber].sewa[m.chat].expired) 
        } else {
        var cekvip = "Nothing"
        }
        m.reply(cekvip)
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})