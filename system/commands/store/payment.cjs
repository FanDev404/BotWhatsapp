module.exports = {
    commands: ["pay"],
    tags: "store menu", 
    isSewa: true,
    isGroup: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            if (db.groups[m.chat].store.payment.text !== "" && db.groups[m.chat].store.payment.image !== "") {
                m.reply(db.groups[m.chat].store.payment.image, m.chat, db.settings.replyType, [], m.sender, { type: "image", caption: db.groups[m.chat].store.payment.text, quoted: m })
                cmdSuccess(command, "store menu")
            } else if (db.groups[m.chat].store.payment.image !== "") {
                m.reply(db.groups[m.chat].store.payment.image, m.chat, db.settings.replyType, [], m.sender, { type: "image", quoted: m })
                cmdSuccess(command, "store menu")
            } else if (db.groups[m.chat].store.payment.text !== "") {
                m.reply(db.groups[m.chat].store.payment.text)
                cmdSuccess(command, "store menu")
            } else m.reply("Belum ada payment di group ini")
        } catch (error) {
            cmdFailed(command, "store menu", error)
        }
    }
}