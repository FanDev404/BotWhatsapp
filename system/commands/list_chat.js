const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["listpc"],
    cooldown: 13,
    isSewa: true,
    isPremium: true,
    callback: async ({ m, store }) => {
        let data = await store.chats.all().filter(({ id }) => id.includes("@s.whatsapp.net")).map(x => x.id)
        let teks = "\`\`\`「 LIST PERSONAL CHAT 」\`\`\`\n\n"
        for (let x of data) {
        let name = Object.keys(db.users).includes(x)? db.users[x].name : x.split("@")[0]
        teks += ` *•* Nama : ${name}\n *•* User : @${x.split("@")[0]}\n *•* Chat : https://wa.me/${x.split("@")[0]}\n\n────────────────\n\n`
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