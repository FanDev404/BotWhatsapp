module.exports = {
    commands: ["setreply"],
    tags: "owner menu", 
    isSewa: true,
    isOwner: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            if (m.text == "mess1" || m.text == "1") {
                if (db.settings.replyType == "mess1") return m.reply("Sudah active")
                db.settings.replyType = "mess1"
                m.reply("Success mengganti reply ke mess1", m.chat, "mess1")
                cmdSuccess(command, "owner menu")
            } else if (m.text == "mess2" || m.text == "2") {
                if (db.settings.replyType == "mess2") return m.reply("Sudah active")
                db.settings.replyType = "mess2"
                m.reply("Success mengganti reply ke mess2", m.chat, "mess2")
                cmdSuccess(command, "owner menu")
            } else if (m.text == "mess3" || m.text == "3") {
                if (db.settings.replyType == "mess3") return m.reply("Sudah active")
                db.settings.replyType = "mess3"
                m.reply("Success mengganti reply ke mess3", m.chat, "mess3") 
                cmdSuccess(command, "owner menu")
            } else if (m.text == "mess4" || m.text == "4") {
                if (db.settings.replyType == "mess4") return m.reply("Sudah active")
                db.settings.replyType = "mess4"
                m.reply("Success mengganti reply ke mess4", m.chat, "mess4")
                cmdSuccess(command, "owner menu")
            } else if (m.text == "mess5" || m.text == "5") {
                if (db.settings.replyType == "mess5") return m.reply("Sudah active")
                db.settings.replyType = "mess5"
                m.reply("Success mengganti reply ke mess5", m.chat, "mess5")
                cmdSuccess(command, "owner menu")
            } else if (m.text == "mess6" || m.text == "6") {
                if (db.settings.replyType == "mess6") return m.reply("Sudah active")
                db.settings.replyType = "mess6"
                m.reply("Success mengganti reply ke mess6", m.chat, "mess6")
                cmdSuccess(command, "owner menu")
            } else {
                m.reply("\`\`\`「 SETTINGS REPLY BOT 」\`\`\`\n\n1. mess1\n2. mess2\n3. mess3\n4. mess4\n5. mess5\n6. mess6")
            }
        } catch (error) {
            cmdFailed(command, "owner menu", error)
        }
    }
}