module.exports = {
    commands: ["delpay"],
    tags: "store menu", 
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            if (db.groups[m.chat].store.payment.text !== "" && db.groups[m.chat].store.payment.image !== "") {
                db.groups[m.chat].store.payment.text = ""
                db.groups[m.chat].store.payment.image  = ""
                m.reply("Success delete payment.") 
                cmdSuccess(command, "store menu")
            } else if (db.groups[m.chat].store.payment.image !== "") {
                db.groups[m.chat].store.payment.image  = ""
                m.reply("Success delete payment.") 
                cmdSuccess(command, "store menu")
            } else if (db.groups[m.chat].store.payment.text !== "") {
                db.groups[m.chat].store.payment.text = ""
                m.reply("Success delete payment.") 
                cmdSuccess(command, "store menu")
            } else m.reply("Belum ada payment di group ini")
        } catch (error) {
            cmdFailed(command, "store menu", error)
        }
    }
}