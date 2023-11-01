const util = require("util") 
const { tiktokDL } = require("../../libs/scrapper.cjs") 
module.exports = {
    commands: ["tiktok"],
    minArgs: 1,
    expectedArgs: "<link>",
    example: "{prefix}{command} https://vt.tiktok.com/ZSwWCk5o/@audio",
    tags: "downloader", 
    isSewa: true,
    isLimit: true,
    callback: async ({ mywa, m, cmdSuccess, cmdFailed, command }) => {
        try {
            if (m.text.includes("https://vt.tiktok.com/") && m.text.split(".com/")[0] == "https://vt.tiktok" && m.text.split(".com/")[1] !== "") {
                var link = m.text.split("@")[0]
            } else if (m.text.includes("https://vm.tiktok.com/") && m.text.split(".com/")[0] == "https://vm.tiktok" && m.text.split(".com/")[1] !== "") {
                var link = m.text.split("@")[0]
            } else if (m.text.includes("https://www.tiktok.com/") && m.text.split(".com/")[0] == "https://www.tiktok" && m.text.split(".com/")[1] !== "") {
                var link = m.text.split("@")[0]
            } else return m.reply("Error link")
            const { status, data, message } = await tiktokDL(link)
            if (!status && Object.keys(db.sewa).includes(m.chat) && !m.key.fromMe && !m.isPremium(m.sender)) {
                db.groups[m.chat].limit += 1
                return m.reply(util.format(message) + ", limit group akan kembali 1")
            } else if (!status && !m.key.fromMe && !m.isPremium(m.sender)) {
                db.users[m.sender].limit += 1
                return m.reply(util.format(message) + ", limit kamu akan kembali 1")
            } else if (!status) return m.reply(util.format(message))
            if (m.text.includes("@audio")) {
                mywa.sendMessageV2(m.chat, { audio: data.audio, mimetype: "audio/mp4" })
            } else if (data.type == "video") {
                m.reply(data.video, m.chat, db.settings.replyType, [], m.sender, { type: "video", mimetype: "video/mp4", quoted: m })
            } else if (data.type == "image") {
                for(let x of data.image) {
                    m.reply(x, m.chat, db.settings.replyType, [], m.sender, { type: "image", quoted: m })
                }
            }
            cmdSuccess(command, "downloader")
        } catch (error) {
            cmdFailed(command, "downloader", error)
        }
    }
}