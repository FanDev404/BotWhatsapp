module.exports = {
    commands: ["unblockcmd"],
    minArgs: 1,
    expectedArgs: "<command>",
    example: "{prefix}{command} menu",
    tags: "owner menu", 
    isSewa: true,
    isOwner: true,
    callback: async ({ m }) => {
        try {
            if (!Object.keys(db.allcommand).includes(m.text)) return m.reply("Commands not found!")
            if (!db.blockcmd.includes(m.text)) return m.reply("Command no block detect.")
            db.blockcmd.splice(db.blockcmd.indexOf(m.text, 1))
            await m.reply("Success unblock command " + m.text)
            cmdSuccess(command, "owner menu")
        } catch (error) {
            cmdFailed(command, "owner menu", error)
        }
    }
}