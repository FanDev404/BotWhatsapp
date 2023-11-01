module.exports = {
    commands: ["setprefix"],
    tags: "owner menu", 
    isSewa: true,
    isOwner: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            if (m.text == "multi" || m.text == "1") {
                if (db.settings.setPrefix == "multi") return m.reply("Sudah active")
                db.settings.setPrefix = "multi"
                m.reply("Success mengganti prefix ke multi prefix")
                cmdSuccess(command, "owner menu")
            } else if (m.text == "no" || m.text == "2") {
                if (db.settings.setPrefix == "no") return m.reply("Sudah active")
                db.settings.setPrefix = "no"
                m.reply("Success mengganti prefix ke no prefix")
                cmdSuccess(command, "owner menu")
            } else if (m.text == "all" || m.text == "3") {
                if (db.settings.setPrefix == "all") return m.reply("Sudah active")
                db.settings.setPrefix = "all"
                m.reply("Success mengganti prefix ke all prefix")
                cmdSuccess(command, "owner menu")
            } else {
                m.reply("\`\`\`「 SETTINGS PREFIX BOT 」\`\`\`\n\n1. multi\n2. no\n3. all")
            }
        } catch (error) {
            cmdFailed(command, "owner menu", error)
        }
    }
}