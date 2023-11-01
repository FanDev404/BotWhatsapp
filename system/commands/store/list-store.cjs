module.exports = {
    commands: ["list"],
    tags: "store menu", 
    isSewa: true,
    isGroup: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            const listStore = Object.keys(db.groups[m.chat].store.key)
            if (listStore.length == 0) return m.reply("Tidak ada list di group ini")
            let teks = "\`\`\`「 LIST STORE 」\`\`\`\n\n"
            let dataId = 1
            for (const x of listStore) {
                teks += `${dataId++}. ${x}\n`
            }
            if (db.groups[m.chat].store.image !== "") {
                m.reply(db.groups[m.chat].store.image, m.chat, db.settings.replyType, [], m.sender, { type: "image", caption: teks, quoted: m })
                cmdSuccess(command, "store menu")
            } else {
                m.reply(teks)
                cmdSuccess(command, "store menu")
            }
        } catch (error) {
            cmdFailed(command, "store menu", error)
        }
    }
}