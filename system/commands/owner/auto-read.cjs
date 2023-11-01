module.exports = {
    commands: ["autoread"],
    tags: "owner menu", 
    isSewa: true,
    isOwner: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            if (m.text == "on" || m.text == "1") {
                if (db.settings.autoRead == true) return m.reply("Sudah active")
                db.settings.autoRead = true
                m.reply("Mode auto read telah active")
                cmdSuccess(command, "owner menu")
            } else if (m.text == "off" || m.text == "0") {
                if (db.settings.autoRead == false) return m.reply("Sudah non active")
                db.settings.autoRead = false
                m.reply("Mode auto read telah non active")
                cmdSuccess(command, "owner menu")
            } else {
                m.reply("\`\`\`「 MODE AUTO READ 」\`\`\`\n\n0. off\n1. on")
            }
        } catch (error) {
            cmdFailed(command, "owner menu", error)
        }
    }
}