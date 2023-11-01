module.exports = {
    commands: ["mode"],
    tags: "owner menu", 
    isSewa: true,
    isOwner: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            if (m.text == "public" || m.text == "1") {
                if (db.settings.mode == "public") return m.reply("Sudah active")
                db.settings.mode = "public"
                m.reply("Public mode is active")
                cmdSuccess(command, "owner menu")
            } else if (m.text == "self" || m.text == "2") {
                if (db.settings.mode == "self") return m.reply("Sudah active")
                db.settings.mode = "self"
                m.reply("Self mode is active")
                cmdSuccess(command, "owner menu")
            } else if (m.text == "group" || m.text == "3") {
                if (db.settings.mode == "group") return m.reply("Sudah active")
                db.settings.mode = "group"
                m.reply("Group mode is active")
                cmdSuccess(command, "owner menu")
            } else if (m.text == "private" || m.text == "4") {
                if (db.settings.mode == "private") return m.reply("Sudah active")
                db.settings.mode = "private"
                m.reply("Private mode is active")
                cmdSuccess(command, "owner menu")
            } else {
                m.reply("\`\`\`「 SETTINGS MODE BOT 」\`\`\`\n\n1. public\n2. self\n3. group\n4. private")
            }
        } catch (error) {
            cmdFailed(command, "owner menu", error)
        }
    }
}