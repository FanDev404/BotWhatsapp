module.exports = {
    commands: ["setkey"],
    minArgs: 1,
    expectedArgs: "<teks>",
    example: "{prefix}{command} aioakwnnwnekappqoqq@removebg",
    tags: "owner menu", 
    isSewa: true,
    isCreator: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            if (m.text.endsWith("@removebg") && m.text.split("@")[0] !== "") {
                db.settings.local_key.remove_background = m.text.split("@")[0]
                m.reply("Success changed key removebg " + m.text)
                cmdSuccess(command, "owner menu")
            } else if (m.text.endsWith("@openai") && m.text.split("@")[0] !== "") {
                db.settings.local_key.open_ai = m.text.split("@")[0]
                m.reply("Success changed key open ai " + m.text)
                cmdSuccess(command, "owner menu")
            } else if (m.text.includes("@")) {
                m.reply("removebg or openai") 
            } else {
                m.reply("Example not found!!") 
            }
        } catch (error) {
            cmdFailed(command, "owner menu", error)
        }
    }
}