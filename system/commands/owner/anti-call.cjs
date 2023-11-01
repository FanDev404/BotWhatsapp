module.exports = {
    commands: ["anticall"],
    tags: "owner menu", 
    isSewa: true,
    isOwner: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            if (m.text == "on" || m.text == "1") {
                if (db.settings.antiCall == true) return m.reply("Sudah active")
                db.settings.antiCall = true
                m.reply("Mode anti call telah active")
                cmdSuccess(command, "owner menu")
            } else if (m.text == "off" || m.text == "0") {
                if (db.settings.antiCall == false) return m.reply("Sudah non active")
                db.settings.antiCall = false
                m.reply("Mode anti call telah non active")
                cmdSuccess(command, "owner menu")
            } else {
                m.reply("\`\`\`「 MODE ANTI CALL 」\`\`\`\n\n0. off\n1. on")
            }
        } catch (error) {
            cmdFailed(command, "owner menu", error)
        }
    }
}