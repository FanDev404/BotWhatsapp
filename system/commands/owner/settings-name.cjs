module.exports = {
    commands: ["setname"],
    minArgs: 1,
    expectedArgs: "<teks>",
    example: "{prefix}{command} MywaJS BOT",
    tags: "owner menu", 
    isSewa: true,
    isOwner: true,
    callback: async ({ mywa, m, command, cmdSuccess, cmdFailed }) => {
        try {
            await mywa.changeName(m.text)
            await m.reply("Success changed name " + m.text)
            cmdSuccess(command, "owner menu")
        } catch (error) {
            cmdFailed(command, "owner menu", error)
        }
    }
}