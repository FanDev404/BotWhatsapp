module.exports = {
    commands: ["autoblockcmd"],
    tags: "owner menu", 
    isSewa: true,
    isOwner: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            if (m.text == "on" || m.text == "1") {
                if (db.settings.autoBlockCmd == true) return m.reply("Sudah active")
                db.settings.autoBlockCmd = true
                m.reply("Mode auto block command telah active")
                cmdSuccess(command, "owner menu")
            } else if (m.text == "off" || m.text == "0") {
                if (db.settings.autoBlockCmd == false) return m.reply("Sudah non active")
                db.settings.autoBlockCmd = false
                m.reply("Mode auto block command telah non active")
                cmdSuccess(command, "owner menu")
            } else {
                m.reply("\`\`\`「 MODE AUTO BLOCK COMMAND 」\`\`\`\n\n0. off\n1. on")
            }
        } catch (error) {
            cmdFailed(command, "owner menu", error)
        }
    }
}