module.exports = {
    commands: ["setbio"],
    minArgs: 1,
    expectedArgs: "<teks>",
    example: "{prefix}{command} Yang baca yatim",
    tags: "owner menu", 
    isSewa: true,
    isOwner: true,
    callback: async ({ mywa, m, command, cmdSuccess, cmdFailed }) => {
        try {
            await mywa.setStatus(m.text)
            await m.reply("Success changed bio " + m.text)
            cmdSuccess(command, "owner menu")
        } catch (error) {
            cmdFailed(command, "owner menu", error)
        }
    }
}