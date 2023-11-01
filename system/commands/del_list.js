const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["dellist"],
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    callback: async ({ m }) => {
        const listStore = Object.keys(db.chats[m.chat].store.key)
        const data = listStore.filter((x) => (x.toLowerCase() == m.text.toLowerCase() || !isNaN(m.text) && listStore[Number(m.text) - 1] == x))
        if (data.length == 1) {
        delete db.chats[m.chat].store.key[data[0]]
        m.reply("Success delete list dengan key " + data[0]) 
        } else {
        if (listStore.length == 0) return m.reply("Tidak ada list di group ini")
        let teks = "\`\`\`「 DELETE LIST STORE 」\`\`\`\n\n"
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