module.exports = {
    commands: ["welcome"],
    tags: "group menu", 
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            if (m.text == "on" || m.text == "1") {
                if (db.groups[m.chat].welcome == true) return m.reply("Sudah active")
                db.groups[m.chat].welcome = true
                m.reply("Welcome group telah active")
                cmdSuccess(command, "group menu")
            } else if (m.text == "off" || m.text == "0") {
                if (db.groups[m.chat].welcome == false) return m.reply("Sudah non active")
                db.groups[m.chat].welcome = false
                m.reply("Welcome group telah non active")
                cmdSuccess(command, "group menu")
            } else {
                m.reply("\`\`\`「 WELCOME GROUP 」\`\`\`\n\n0. off\n1. on")
            }
        } catch (error) {
            cmdFailed(command, "group menu", error)
        }
    }
}