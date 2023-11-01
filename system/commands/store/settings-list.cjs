module.exports = {
    commands: ["setlist"],
    minArgs: 1,
    expectedArgs: "<teks>",
    example: "{prefix}{command} Diamond ML",
    tags: "store menu", 
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed, isQuotedText }) => {
        try {
            const data = Object.keys(db.groups[m.chat].store.key).filter((x) => (x.toLowerCase() == m.text.toLowerCase()))
            if (data.length == 0) return m.reply("Nama tersebut tidak ada dalam list kak")
            if (!isQuotedText) return m.reply("Reply pesan kak") 
            db.groups[m.chat].store.key[data[0]].text = m.quoted.budy
            m.reply("Success set list dengan key " + data[0])
            cmdSuccess(command, "store menu")
        } catch (error) {
            cmdFailed(command, "store menu", error)
        }
    }
}