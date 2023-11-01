module.exports = {
    commands: ["unban"],
    tags: "owner menu", 
    isSewa: true,
    isOwner: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            if (m.input.length == 0) return m.reply("Reply/Tag/nomer")
            if (m.input[0].startsWith("08")) return m.reply("Gunakan code negara kak")
            if (m.input.filter((x) => !Object.keys(db.banned).includes(x)).length > 0) return m.reply("No banned detect to list " + m.input.filter((x) => !Object.keys(db.banned).includes(x)).map((x) => "@" + x.split("@")[0]).join(" ")) 
            for(let x of m.input) {
                delete db.banned[x]
            }
            await m.reply("Success unbanned " + m.input.map((x) => "@" + x.split("@")[0]).join(" "))
            cmdSuccess(command, "owner menu")
        } catch (error) {
            cmdFailed(command, "owner menu", error)
        }
    }
}