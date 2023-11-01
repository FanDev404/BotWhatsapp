const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["listban"],
    cooldown: 13,
    isSewa: true,
    callback: async ({ m }) => {
        let data = Object.keys(db.banned)
        let teks = "\`\`\`「 LIST BANNED 」\`\`\`\n\n"
        for (let x of data) {
        let name = Object.keys(db.users).includes(x)? db.users[x].name : x.split("@")[0]
        teks += ` *•* Nama : ${name}\n *•* User : @${x.split("@")[0]}\n *•* Date : ${db.banned[x].date}\n *•* Reason : ${db.banned[x].reason}\n\n────────────────\n\n`
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