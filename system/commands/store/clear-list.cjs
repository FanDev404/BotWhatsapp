module.exports = {
    commands: ["clearlist"],
    tags: "store menu", 
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            if (Object.keys(db.groups[m.chat].store.key).length == 0) return m.reply("Tidak ada yang bisa di clear kak")
            db.groups[m.chat].store.key = {}
            m.reply("Success clear list")
            cmdSuccess(command, "store menu")
        } catch (error) {
            cmdFailed(command, "store menu", error)
        }
    }
}