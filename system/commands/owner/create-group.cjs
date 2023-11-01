module.exports = {
    commands: ["creategc"],
    minArgs: 1,
    expectedArgs: "<teks>",
    example: "{prefix}{command} BOT WHATSAPP",
    tags: "owner menu", 
    isSewa: true,
    isOwner: true,
    callback: async ({ mywa, m, command, cmdSuccess, cmdFailed }) => {
        try {
            mywa.createGroup(m.text, [m.sender, ...m.input])
            m.reply("Success create group " + m.text)
            cmdSuccess(command, "owner menu")
        } catch (error) {
            cmdFailed(command, "owner menu", error)
        }
    }
}