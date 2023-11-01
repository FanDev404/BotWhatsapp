module.exports = {
    commands: ["blockcmd"],
    minArgs: 1,
    expectedArgs: "<command>",
    example: "{prefix}{command} menu",
    tags: "owner menu", 
    isSewa: true,
    isOwner: true,
    callback: async ({ m }) => {
        try {
            if (!Object.keys(db.allcommand).includes(m.text)) return m.reply("Commands not found!")
            if (db.blockcmd.includes(m.text)) return m.reply("Command sudah di block")
            db.blockcmd.push(m.text)
            await m.reply("Success block command " + m.text)
            cmdSuccess(command, "owner menu")
        } catch (error) {
            cmdFailed(command, "owner menu", error)
        }
    }
}