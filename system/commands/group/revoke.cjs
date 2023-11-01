module.exports = {
    commands: ["revoke"],
    tags: "group menu", 
    isGroup: true,
    isAdmin: true,
    isBotAdmin: true,
    callback: async ({ mywa, m, command, cmdSuccess, cmdFailed }) => {
        try {
            const chat = await mywa.getChatById(m.chat)
            await m.reply("Success changed link group to https://chat.whatsapp.com/" + (await chat.revokeInvite()))
            cmdSuccess(command, "group menu")
        } catch (error) {
            cmdFailed(command, "group menu", error)
        }
    }
}