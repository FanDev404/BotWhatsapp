const util = require("util") 
const { instagramDL } = require("../../libs/scrapper.cjs") 
module.exports = {
    commands: ["ig"],
    minArgs: 1,
    expectedArgs: "<link>",
    example: "{prefix}{command} https://www.instagram.com/reel/CuOxTilAfci/?igshid=NjIwNzIyMDk2Mg%3D%3D@video",
    tags: "downloader", 
    isSewa: true,
    isWait: true,
    callback: async ({ m, cmdSuccess, cmdFailed, command }) => {
        try {
            if (!m.text.startsWith("https://www.instagram.com/")) return m.reply("Itu bukan link Instagram ka")
            if (m.text.includes("https://www.instagram.com/") && m.text.split(".com/")[0] == "https://www.instagram" && m.text.split(".com/")[1] !== "") {
                var link = m.text.split("@")[0]
            } else return m.reply("Error link")
            const { status, data, message } = await instagramDL(m.text)
            if (!status) return m.reply(util.format(message))
            for(let x of data) {
                if (x.type == "video/mp4" && !m.text.includes("@image") || x.type == "video/mp4" && m.text.includes("@video")) {
                    m.reply(x.url, m.chat, db.settings.replyType, [], m.sender, { type: "video", mimetype: "video/mp4", quoted: m })
                } else if (x.type == "image/jpeg" && !m.text.includes("@video") || x.type == "image/jpeg" && m.text.includes("@image")) {
                    m.reply(x.url, m.chat, db.settings.replyType, [], m.sender, { type: "image", quoted: m })
                }
            }
            cmdSuccess(command, "downloader")
        } catch (error) {
            cmdFailed(command, "downloader", error)
        }
    }
}