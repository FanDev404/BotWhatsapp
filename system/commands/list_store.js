const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["list"],
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    callback: async ({ sock, m }) => {
        const listStore = Object.keys(db.chats[m.chat].store.key)
        if (listStore.length == 0) return m.reply("Tidak ada list di group ini")
        let teks = "\`\`\`「 LIST STORE 」\`\`\`\n\n"
        let dataId = 1
        for (let x of listStore) {
        teks += `${dataId++}. ${x}\n`
        }
        if (db.chats[m.chat].store.isImage !== "") {
        sock.sendMessage(m.chat, { image: { url: db.chats[m.chat].store.isImage }, caption: teks, mentions: [...teks.matchAll(/@(\d{0,16})/g)].map((x) => x[1] + "@s.whatsapp.net") }, { quoted: m }) 
        } else {
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