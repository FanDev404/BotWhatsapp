const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["delmedia"],
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    callback: async ({ m }) => {
        const listStore = db.chats[m.chat].store.isImage !== ""? ["list", ...Object.keys(db.chats[m.chat].store.key).filter((x) => (db.chats[m.chat].store.key[x].isImage !== "" || db.chats[m.chat].store.key[x].isDocument.url !== ""))] : Object.keys(db.chats[m.chat].store.key).filter((x) => (db.chats[m.chat].store.key[x].isImage !== "" || db.chats[m.chat].store.key[x].isDocument.url !== ""))
        const data = listStore.filter((x) => (x.toLowerCase() == m.text.toLowerCase() || !isNaN(m.text) && listStore[Number(m.text) - 1] == x))
        if (data.length == 1 && data[0] == "list") {
        db.chats[m.chat].store.isImage = ""
        m.reply("Success delete media " + data[0]) 
        } else if (data.length == 1 && data[0] !== "list" && db.chats[m.chat].store.key[data[0]].isImage !== "") {
        db.chats[m.chat].store.key[data[0]].isImage = ""
        m.reply("Success delete media " + data[0]) 
        } else if (data.length == 1 && data[0] !== "list" && db.chats[m.chat].store.key[data[0]].isDocument.url !== "") {
        db.chats[m.chat].store.key[data[0]].isDocument = { url: "", fileName: "" }
        m.reply("Success delete media " + data[0]) 
        } else {
        if (listStore.length == 0) return m.reply("Tidak ada media di group ini")
        let teks = "\`\`\`「 DELETE MEDIA 」\`\`\`\n\n"
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