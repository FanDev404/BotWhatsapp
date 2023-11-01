module.exports = {
    commands: ["setsubject"],
    minArgs: 1,
    expectedArgs: "<teks>",
    example: "{prefix}{command} MywaJS BOT",
    tags: "group menu", 
    isGroup: true,
    isAdmin: true,
    isBotAdmin: true,
    callback: async ({ mywa, m, command, cmdSuccess, cmdFailed }) => {
        try {
            const chat = await mywa.getChatById(m.chat)
            await chat.setSubject(m.text)
            await m.reply("Success changed subject " + m.text)
            cmdSuccess(command, "group menu")
        } catch (error) {
            cmdFailed(command, "group menu", error)
        }
    }
}