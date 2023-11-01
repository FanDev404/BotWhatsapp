const fs = require("fs") 
const chalk = require("chalk")
const { timeToEpired } = require("@libs/function")
module.exports = {
    commands: ["listpremium","listprem"],
    cooldown: 13,
    isSewa: true,
    isVip: true, 
    callback: async ({ m }) => {
        let teks = "\`\`\`「 LIST PREMIUM 」\`\`\`\n\n"
        let data = Object.keys(db.expired[m.botNumber].premium).filter(async (x) => {
        if ((await sock.onWhatsApp(x)).length == 0) delete db.expired[m.botNumber].premium[x]
        return await sock.onWhatsApp(x).length !== 0
        }) 
        for (let x of data) {
        teks += ` *•* Nomer : @${x.split("@")[0]}\n *•* Date : ${db.expired[m.botNumber].premium[x].date}\n *•* Expired : ${db.expired[m.botNumber].premium[x].expired == "INFINITY"? "PERMANENT" : timeToEpired(db.expired[m.botNumber].premium[x].expired)}\n\n────────────────\n\n`
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