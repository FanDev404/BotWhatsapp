const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["owner"],
    cooldown: 13,        
    callback: async ({ sock, m }) => {
        if (m.isOwner) {
        sock.sendKontak(m.chat, [m.ownerNumber + "@s.whatsapp.net", ...Object.keys(db.expired[m.botNumber].owner), ...Object.keys(db.expired[m.botNumber].vip)], m) 
        } else sock.sendKontak(m.chat, [m.ownerNumber + "@s.whatsapp.net", ...Object.keys(db.expired[m.botNumber].vip)], m) 
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})