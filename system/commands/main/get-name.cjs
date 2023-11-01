module.exports = {
    commands: ["getname"],
    tags: "main menu", 
    isSewa: true,
    callback: async ({ mywa, m, command, cmdSuccess, cmdFailed }) => {
        try {
            if (!m.input) return m.reply("Reply/Tag/nomer")
            m.reply((await mywa.getName(m.input))) 
            cmdSuccess(command, "main menu")
        } catch (error) {
            cmdFailed(command, "main menu", error)
        }
    }
}