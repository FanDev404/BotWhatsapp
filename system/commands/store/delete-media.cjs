module.exports = {
    commands: ["delmedia"],
    tags: "store menu", 
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            const listStore = db.groups[m.chat].store.image !== ""? ["list", ...Object.keys(db.groups[m.chat].store.key).filter((x) => (db.groups[m.chat].store.key[x].image !== "" || db.groups[m.chat].store.key[x].document.url !== ""))] : Object.keys(db.groups[m.chat].store.key).filter((x) => (db.groups[m.chat].store.key[x].image !== "" || db.groups[m.chat].store.key[x].document.url !== ""))
            const data = listStore.filter((x) => (x.toLowerCase() == m.text.toLowerCase() || !isNaN(m.text) && listStore[Number(m.text) - 1] == x))
            if (data.length == 1 && data[0] == "list") {
                db.groups[m.chat].store.image = ""
                m.reply("Success delete media " + data[0]) 
                cmdSuccess(command, "store menu")
            } else if (data.length == 1 && data[0] !== "list" && db.groups[m.chat].store.key[data[0]].image !== "") {
                db.groups[m.chat].store.key[data[0]].image = ""
                m.reply("Success delete media " + data[0]) 
                cmdSuccess(command, "store menu")
            } else if (data.length == 1 && data[0] !== "list" && db.groups[m.chat].store.key[data[0]].document.url !== "") {
                db.groups[m.chat].store.key[data[0]].document = { url: "", fileName: "" }
                m.reply("Success delete media " + data[0]) 
                cmdSuccess(command, "store menu")
            } else {
                if (listStore.length == 0) return m.reply("Tidak ada media di group ini")
                let teks = "\`\`\`「 DELETE MEDIA 」\`\`\`\n\n"
                let dataId = 1
                for (const x of listStore) {
                    teks += `${dataId++}. ${x}\n`
                }
                m.reply(teks)
             }
        } catch (error) {
            cmdFailed(command, "store menu", error)
        }
    }
}