module.exports = {
    commands: ["clearmedia"],
    tags: "store menu", 
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            const data = Object.keys(db.groups[m.chat].store.key)
            if (data.length == 0 && db.groups[m.chat].store.image == "") return m.reply("Tidak ada yang bisa di clear kak")
            if (db.groups[m.chat].store.image !== "") db.groups[m.chat].store.image = ""
            for(const x of data) {
                if (db.groups[m.chat].store.key[x].image !== "") db.groups[m.chat].store.key[x].image = ""
                if (db.groups[m.chat].store.key[x].document.url !== "") db.groups[m.chat].store.key[x].document = { url: "", fileName: "" }
            }
            m.reply("Success clear media")
            cmdSuccess(command, "store menu")
        } catch (error) {
            cmdFailed(command, "store menu", error)
        }
    }
}