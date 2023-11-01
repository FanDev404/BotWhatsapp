module.exports = {
    commands: ["antivo"],
    tags: "group menu", 
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            if (m.text == "on" || m.text == "1") {
                if (db.groups[m.chat].anti_view_once == true) return m.reply("Sudah active")
                db.groups[m.chat].anti_view_once = true
                m.reply("Mode anti view once telah active")
                cmdSuccess(command, "group menu")
            } else if (m.text == "off" || m.text == "0") {
                if (db.groups[m.chat].anti_view_once == false) return m.reply("Sudah non active")
                db.groups[m.chat].anti_view_once = false
                m.reply("Mode anti view once telah non active")
                cmdSuccess(command, "group menu")
            } else {
                m.reply("\`\`\`「 MODE ANTI VIEW ONCE 」\`\`\`\n\n0. off\n1. on")
            }
        } catch (error) {
            cmdFailed(command, "group menu", error)
        }
    }
}