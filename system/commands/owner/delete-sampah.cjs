const fs = require("fs")
module.exports = {
    commands: ["delsampah"],
    tags: "owner menu", 
    isSewa: true,
    isOwner: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed, isQuotedDocument }) => {
        try {
            let files = fs.readdirSync("./temp").filter((x) => x !== "Zzzzzzzzzz@4.0.4") 
            if (files.length == 0) return m.reply("Terdeteksi 0 file sampah")
            m.reply(`Terdeteksi ${files.length} file sampah`)
            setTimeout(() => {
                m.reply("Menghapus file sampah......")
                for (let x of files) {
                    fs.unlinkSync(`./temp/${x}`)
                }
            }, 2000)
            setTimeout(() => {
                m.reply("Success menghapus file sampah")
            }, 5000)
            cmdSuccess(command, "owner menu")
        } catch (error) {
            cmdFailed(command, "owner menu", error)
        }
    }
}