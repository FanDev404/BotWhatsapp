module.exports = {
    commands: ["deltime"],
    tags: "store menu", 
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            const listStore = Object.keys(db.groups[m.chat].store.key).filter((x) => db.groups[m.chat].store.key[x].time !== 0)
            const data = Object.keys(db.groups[m.chat].store.key).filter((x) => db.groups[m.chat].store.key[x].time !== 0).filter((x) => (x.toLowerCase() == m.text.toLowerCase() || !isNaN(m.text) && listStore[Number(m.text) - 1] == x))
            if (data.length > 0) {
                db.groups[m.chat].store.key[data[0]].time = 0
                m.reply("Success delete time " + data[0]) 
                cmdSuccess(command, "store menu")
            } else {
                if (listStore.length == 0) return m.reply("Tidak ada time di key store")
                let teks = "\`\`\`「 DELETE TIME 」\`\`\`\n\n"
                let dataId = 1
                for (let x of listStore) {
                    teks += `${dataId++}. ${x}\n`
                }
                m.reply(teks)
            }
        } catch (error) {
            cmdFailed(command, "store menu", error)
        }
    }
}