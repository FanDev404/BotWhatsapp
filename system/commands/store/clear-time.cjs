module.exports = {
    commands: ["cleartime"],
    tags: "store menu", 
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            const data = Object.keys(db.groups[m.chat].store.key).filter((x) => db.groups[m.chat].store.key[x].time !== 0)
            if (data.length == 0) return m.reply("Tidak ada yang bisa di clear kak")
            for(const x of data) {
                db.groups[m.chat].store.key[x].time = 0
            }
            m.reply("Success clear time")
            cmdSuccess(command, "store menu")
        } catch (error) {
            cmdFailed(command, "store menu", error)
        }
    }
}