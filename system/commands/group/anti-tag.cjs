module.exports = {
    commands: ["antitag"],
    tags: "group menu", 
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    isBotAdmin: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            if (m.text == "on" || m.text == "1") {
                if (db.groups[m.chat].anti_tag.status == true) return m.reply("Sudah active")
                db.groups[m.chat].anti_tag.status = true
                m.reply("Mode anti tags telah active")
                cmdSuccess(command, "group menu")
            } else if (m.text == "off" || m.text == "0") {
                if (db.groups[m.chat].anti_tag.status == false) return m.reply("Sudah non active")
                db.groups[m.chat].anti_tag.status = false
                m.reply("Mode anti tags telah non active")
                cmdSuccess(command, "group menu")
            } else {
                m.reply("\`\`\`「 MODE ANTI TAGS 」\`\`\`\n\n0. off\n1. on")
            }
        } catch (error) {
            cmdFailed(command, "group menu", error)
        }
    }
}