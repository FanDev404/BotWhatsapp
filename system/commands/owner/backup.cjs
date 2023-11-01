const path = require("path") 
const fs = require("fs") 
const archiver = require("archiver") 
module.exports = {
    commands: ["backup"],
    tags: "owner menu", 
    isSewa: true,
    isCreator: true, 
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            const files = fs.readdirSync(".").filter((x) => ["local-json","system","temp","index.js","main.cjs","package.json","settings.json"].includes(x))
            const output = fs.createWriteStream(path.join(process.cwd(), "temp", "BotWhatsapp.zip"))
            const archive = archiver("zip")
            archive.pipe(output)
            for (let x of files) {
                const lockFile = path.join(process.cwd(), x)
                if ((fs.lstatSync(lockFile)).isDirectory()) {
                    archive.directory(lockFile, x)
                } else {
                    archive.file(lockFile, { name: x })
                }
            }
            await archive.finalize()
            await m.reply(fs.readFileSync("temp/BotWhatsapp.zip"), m.chat, db.settings.replyType, [], m.sender, { type: "document", fileName: "BotWhatsapp.zip", quoted: m })
            await fs.unlinkSync("temp/BotWhatsapp.zip")
            cmdSuccess(command, "owner menu")
        } catch (error) {
            cmdFailed(command, "owner menu", error)
        }
    }
}