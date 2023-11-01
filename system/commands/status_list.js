const fs = require("fs") 
const chalk = require("chalk")
const { timeToEpired } = require("@libs/function")
module.exports = {
    commands: ["status"],
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    callback: async ({ m }) => {
        const listStore = Object.keys(db.chats[m.chat].store.key)
        if (listStore.length == 0) return m.reply("Tidak ada list di group ini")
        let teks = "\`\`\`「 STATUS LIST 」\`\`\`\n\n"
        for (let x of listStore) {
        teks += `- *Key* : ${x}\n- *Status* : ${db.chats[m.chat].store.key[x].text == ""? "No respon" : "Respon"}\n- *Type* : ${db.chats[m.chat].store.key[x].isImage !== ""? "Image" : db.chats[m.chat].store.key[x].isDocument.url !== ""? "Document" : "Text" }\n- *Time* : ${db.chats[m.chat].store.key[x].time == 0? "Not found" : timeToEpired(db.chats[m.chat].store.key[x].time)}\n\n────────────────\n\n`
        }
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