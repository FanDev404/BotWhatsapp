module.exports = {
    commands: ["group"],
    tags: "group menu", 
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    isBotAdmin: true,
    callback: async ({ mywa, m, command, cmdSuccess, cmdFailed }) => {
        try {
            if (m.text == "close" || m.text == "2") {
                if (m.groupAnnounce == true) return m.reply("Group sudah di tutup")
                const chat = await mywa.getChatById(m.chat)
                await chat.setMessagesAdminsOnly(true)
                m.reply("Success menutup group")
                cmdSuccess(command, "group menu")
            } else if (m.text == "open" || m.text == "1") {
                if (m.groupAnnounce == false) return m.reply("Group sudah di buka")
                const chat = await mywa.getChatById(m.chat)
                await chat.setMessagesAdminsOnly(false)
                m.reply("Success membuka group")
                cmdSuccess(command, "group menu")
            } else {
                m.reply("\`\`\`「 GROUP OPEN/CLOSE 」\`\`\`\n\n1. open\n2. close")
            }
        } catch (error) {
            cmdFailed(command, "group menu", error)
        }
    }
}