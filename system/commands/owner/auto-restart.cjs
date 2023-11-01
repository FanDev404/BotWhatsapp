module.exports = {
    commands: ["autorestart"],
    tags: "owner menu", 
    isSewa: true,
    isCreator: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            if (m.text == "on" || m.text == "1") {
                if (db.settings.local_restart.status == true) return m.reply("Sudah active")
                db.settings.local_restart.status = true
                m.reply("Mode auto restart telah active")
                cmdSuccess(command, "owner menu")
            } else if (m.text == "off" || m.text == "0") {
                if (db.settings.local_restart.status == false) return m.reply("Sudah non active")
                db.settings.local_restart.status = false
                m.reply("Mode auto restart telah non active")
                cmdSuccess(command, "owner menu")
            } else {
                m.reply("\`\`\`「 MODE AUTO RESTART 」\`\`\`\n\n0. off\n1. on")
            }
        } catch (error) {
            cmdFailed(command, "owner menu", error)
        }
    }
}