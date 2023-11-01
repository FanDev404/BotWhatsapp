module.exports = {
    commands: ["antidel"],
    tags: "group menu", 
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            if (m.text == "on" || m.text == "1") {
                if (db.groups[m.chat].anti_delete == true) return m.reply("Sudah active")
                db.groups[m.chat].anti_delete = true
                m.reply("Mode anti delete telah active")
                cmdSuccess(command, "group menu")
            } else if (m.text == "off" || m.text == "0") {
                if (db.groups[m.chat].anti_delete == false) return m.reply("Sudah non active")
                db.groups[m.chat].anti_delete = false
                m.reply("Mode anti delete telah non active")
                cmdSuccess(command, "group menu")
            } else {
                m.reply("\`\`\`「 MODE ANTI DELETED 」\`\`\`\n\n0. off\n1. on")
            }
        } catch (error) {
            cmdFailed(command, "group menu", error)
        }
    }
}