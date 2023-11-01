const fs = require("fs") 
module.exports = {
    commands: ["addfuture"],
    tags: "owner menu", 
    example: "{prefix}{command} folder",
    isSewa: true,
    isCreator: true,
    isMedia: {
        isDocument: true, 
        isQuotedMedia: {
            isQuotedDocument: true
        }
    }, 
    callback: async ({ mywa, m, command, cmdSuccess, cmdFailed, isQuotedDocument }) => {
        try {
            const fileName = isQuotedDocument? m.quoted.fileName : m.fileName
            if (fs.readdirSync("./system/commands").filter((x) => x.toLowerCase() == m.text.toLowerCase()).length == 0) fs.mkdirSync("./system/commands/" + m.text, { recursive: true })
            if (fs.readdirSync("./system/commands/" + m.text).includes(fileName)) return m.reply("Coba pakai nama file lain")
            const media = await mywa.downloadMediaMessage(isQuotedDocument? m.quoted : m)
            m.reply("Success add file to command, Restaring bot...")
            fs.writeFileSync("./system/commands/" + m.text + "/" + fileName, media)
            setTimeout(() => {
                process.send("reset")
            }, 5000)
            cmdSuccess(command, "owner menu")
        } catch (error) {
            cmdFailed(command, "owner menu", error)
        }
    }
}