module.exports = {
    commands: ["autolevel"],
    tags: "owner menu", 
    isSewa: true,
    isOwner: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            if (m.text == "on" || m.text == "1") {
                if (db.settings.autoLevel == true) return m.reply("Sudah active")
                db.settings.autoLevel = true
                m.reply("Mode auto level telah active")
                cmdSuccess(command, "owner menu")
            } else if (m.text == "off" || m.text == "0") {
                if (db.settings.autoLevel == false) return m.reply("Sudah non active")
                db.settings.autoLevel = false
                m.reply("Mode auto level telah non active")
                cmdSuccess(command, "owner menu")
            } else {
                m.reply("\`\`\`「 MODE AUTO LEVEL 」\`\`\`\n\n0. off\n1. on")
            }
        } catch (error) {
            cmdFailed(command, "owner menu", error)
        }
    }
}