module.exports = {
    commands: ["autoreport"],
    tags: "owner menu", 
    isSewa: true,
    isOwner: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            if (m.text == "on" || m.text == "1") {
                if (db.settings.autoReport == true) return m.reply("Sudah active")
                db.settings.autoReport = true
                m.reply("Mode auto report telah active")
                cmdSuccess(command, "owner menu")
            } else if (m.text == "off" || m.text == "0") {
                if (db.settings.autoReport == false) return m.reply("Sudah non active")
                db.settings.autoReport = false
                m.reply("Mode auto report telah non active")
                cmdSuccess(command, "owner menu")
            } else {
                m.reply("\`\`\`「 MODE AUTO REPORT 」\`\`\`\n\n0. off\n1. on")
            }
        } catch (error) {
            cmdFailed(command, "owner menu", error)
        }
    }
}