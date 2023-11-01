module.exports = {
    commands: ["antilinkig"],
    tags: "group menu", 
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    isBotAdmin: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            if (m.text == "on" || m.text == "1") {
                if (db.groups[m.chat].anti_link_instagram.status == true) return m.reply("Sudah active")
                db.groups[m.chat].anti_link_instagram.status = true
                m.reply("Mode anti link instagram telah active")
                cmdSuccess(command, "group menu")
            } else if (m.text == "off" || m.text == "0") {
                if (db.groups[m.chat].anti_link_instagram.status == false) return m.reply("Sudah non active")
                db.groups[m.chat].anti_link_instagram.status = false
                m.reply("Mode anti link instagram telah non active")
                cmdSuccess(command, "group menu")
            } else {
                m.reply("\`\`\`「 MODE ANTI LINK INSTAGRAM 」\`\`\`\n\n0. off\n1. on")
            }
        } catch (error) {
            cmdFailed(command, "group menu", error)
        }
    }
}