const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["deltime"],
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    callback: async ({ m }) => {
        const listStore = Object.keys(db.chats[m.chat].store.key).filter((x) => db.chats[m.chat].store.key[x].time !== 0)
        const data = Object.keys(db.chats[m.chat].store.key).filter((x) => db.chats[m.chat].store.key[x].time !== 0).filter((x) => (x.toLowerCase() == m.text.toLowerCase() || !isNaN(m.text) && listStore[Number(m.text) - 1] == x))
        if (data.length == 1) {
        db.chats[m.chat].store.key[data[0]].time = 0
        m.reply("Success delete time " + data[0]) 
        } else {
        if (listStore.length == 0) return m.reply("Tidak ada time di key store")
        let teks = "\`\`\`「 DELETE TIME 」\`\`\`\n\n"
        let dataId = 1
        for (let x of listStore) {
        teks += `${dataId++}. ${x}\n`
        }
        m.reply(teks)
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