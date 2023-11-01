module.exports = {
    commands: ["restrict"],
    tags: "group menu", 
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    isBotAdmin: true,
    callback: async ({ mywa, m, command, cmdSuccess, cmdFailed }) => {
        try {
            if (m.text == "off" || m.text == "0") {
                if (m.groupRestrict == true) return m.reply("Sudah non active")
                const chat = await mywa.getChatById(m.chat)
                await chat.setInfoAdminsOnly(true)
                m.reply("Mode restrict telah non active")
                cmdSuccess(command, "group menu")
            } else if (m.text == "on" || m.text == "1") {
                if (m.groupRestrict == false) return m.reply("Sudah active")
                const chat = await mywa.getChatById(m.chat)
                await chat.setInfoAdminsOnly(false)
                m.reply("Mode restrict telah active")
                cmdSuccess(command, "group menu")
            } else {
                m.reply("\`\`\`「 MODE RESTRICT 」\`\`\`\n\n0. off\n1. on")
            }
        } catch (error) {
            cmdFailed(command, "group menu", error)
        }
    }
}