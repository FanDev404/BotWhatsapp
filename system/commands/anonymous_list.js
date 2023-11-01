const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["listanon"],
    cooldown: 13,
    isSewa: true,
    isPremium: true,
    callback: async ({ m }) => {
        let data = db.anonymous
        let teks = "\`\`\`「 LIST ANONYMOUS CHAT 」\`\`\`\n\n"
        for (let x of data) {
        teks += ` *•* RoomA : ${x.roomA !== ""? ("@" + x.roomA.split("@")[0]) : ""}\n *•* RoomB : ${x.roomB !== ""? ("@" + x.roomB.split("@")[0]) : ""}\n *•* Status : ${x.isChat? "CHATTING" : "WAITING"}\n\n────────────────\n\n`
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