module.exports = {
    commands: ["antispam"],
    tags: "owner menu", 
    isSewa: true,
    isOwner: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            if (m.text == "on" || m.text == "1") {
                if (db.settings.antiSpam == true) return m.reply("Sudah active")
                db.settings.antiSpam = true
                m.reply("Mode anti spam telah active")
                cmdSuccess(command, "owner menu")
            } else if (m.text == "off" || m.text == "0") {
                if (db.settings.antiSpam == false) return m.reply("Sudah non active")
                db.settings.antiSpam = false
                m.reply("Mode anti spam telah non active")
                cmdSuccess(command, "owner menu")
            } else {
                m.reply("\`\`\`「 MODE ANTI SPAM 」\`\`\`\n\n0. off\n1. on")
            }
        } catch (error) {
            cmdFailed(command, "owner menu", error)
        }
    }
}