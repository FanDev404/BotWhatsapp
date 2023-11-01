const fs = require("fs") 
const chalk = require("chalk")
const { timeToEpired } = require("@libs/function")
module.exports = {
    commands: ["cekowner"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ m }) => {
        if (Object.keys(db.expired[m.botNumber].owner).includes(m.sender)) {
        var cekvip = timeToEpired(db.expired[m.botNumber].owner[m.sender].expired) 
        } else if (Object.keys(db.expired[m.botNumber].vip).includes(m.sender)) {
        var cekvip = "PERMANENT"
        } else if (m.key.fromMe) {
        var cekvip = "PERMANENT"
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