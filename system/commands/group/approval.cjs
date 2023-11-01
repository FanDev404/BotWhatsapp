module.exports = {
    commands: ["approval"],
    tags: "group menu", 
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    isBotAdmin: true,
    callback: async ({ mywa, m, command, cmdSuccess, cmdFailed }) => {
        try {
            if (m.text == "off" || m.text == "0") {
                if (m.groupMembershipApprovalMode == false) return m.reply("Sudah non active")
                const chat = await mywa.getChatById(m.chat)
                await chat.setMemberApprovalMode(true)
                m.reply("Mode approval telah non active")
                cmdSuccess(command, "group menu")
            } else if (m.text == "on" || m.text == "1") {
                if (m.groupMembershipApprovalMode == true) return m.reply("Sudah active")
                const chat = await mywa.getChatById(m.chat)
                await chat.setMemberApprovalMode(false)
                m.reply("Mode approval telah active")
                cmdSuccess(command, "group menu")
            } else {
                m.reply("\`\`\`「 MODE APPROVAL 」\`\`\`\n\n0. off\n1. on")
            }
        } catch (error) {
            cmdFailed(command, "group menu", error)
        }
    }
}