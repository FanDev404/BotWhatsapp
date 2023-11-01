module.exports = {
    commands: ["linkgc"],
    tags: "group menu", 
    isSewa: true,
    isGroup: true,
    isBotAdmin: true,
    callback: async ({ mywa, m, command, cmdSuccess, cmdFailed }) => {
        try {
            const chat = await mywa.getChatById(m.chat)
            await m.reply("https://chat.whatsapp.com/" + (await chat.getInviteCode())) 
            cmdSuccess(command, "group menu")
        } catch (error) {
            cmdFailed(command, "group menu", error)
        }
    }
}