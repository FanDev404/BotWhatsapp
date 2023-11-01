module.exports = {
    commands: ["dellist"],
    tags: "store menu", 
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            const listStore = Object.keys(db.groups[m.chat].store.key)
            const data = listStore.filter((x) => (x.toLowerCase() == m.text.toLowerCase() || !isNaN(m.text) && listStore[Number(m.text) - 1] == x))
            if (data.length > 0) {
                delete db.groups[m.chat].store.key[data[0]]
                m.reply("Success delete list dengan key " + data[0]) 
                cmdSuccess(command, "store menu")
            } else {
                if (listStore.length == 0) return m.reply("Tidak ada list di group ini")
                let teks = "\`\`\`「 DELETE LIST STORE 」\`\`\`\n\n"
                let teksID = 1
                for (let x of listStore) {
                    teks += `${teksID++}. ${x}\n`
                }
                m.reply(teks)
            }
        } catch (error) {
            cmdFailed(command, "store menu", error)
        }
    }
}