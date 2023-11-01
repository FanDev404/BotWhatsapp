const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["listerror"],
    cooldown: 13,
    isSewa: true,
    callback: async ({ m }) => {
        let data = Object.keys(db.listerror) 
        let teks = "\`\`\`「 LIST ERROR 」\`\`\`\n\n"
        for (let x of data) {
        teks += ` *•* Command : ${x}\n *•* Error : ${db.listerror[x].error}\n\n────────────────\n\n`
        }
        teks += `\n\n*Total ada : ${data.length}*`
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