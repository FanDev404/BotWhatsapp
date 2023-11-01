const util = require("util") 
const { youtubeDL } = require("../../libs/scrapper.cjs") 
module.exports = {
    commands: ["yt"],
    minArgs: 1,
    expectedArgs: "<link>",
    example: "{prefix}{command} https://youtu.be/mD8v4WUVDGg?si=W_QGsEHIA7sLaU-K@audio",
    tags: "downloader", 
    isSewa: true,
    isWait: true,
    callback: async ({ mywa, m, cmdSuccess, cmdFailed, command }) => {
        try {
            if (m.text.includes("https://youtube.com/channel/")) return m.reply("Kakak baka 😤")
            if (m.text.includes("https://www.youtube.com/watch?v=") && m.text.split(".com/")[0] == "https://www.youtube" && m.text.split("watch?v=")[1] !== "") {
                var link = m.text.split("@")[0]
            } else if (m.text.includes("https://youtu.be/") && m.text.split("youtu.be/")[0] == "https://" && m.text.split("youtu.be/")[1] !== "") {
                var link = m.text.split("@")[0]
            } else if (m.text.includes("https://youtube.com/watch?v=") && m.text.split(".com/")[0] == "https://youtube" && m.text.split("watch?v=")[1] !== "") {
                var link = m.text.split("@")[0]
            } else if (m.text.includes("https://youtube.com/shorts/") && m.text.split(".com/")[0] == "https://youtube" && m.text.split("shorts/")[1] !== "") {
                var link = m.text.split("@")[0]
            } else return m.reply("Error link")
            const { status, data, message } = await youtubeDL(link, m.text.includes("@video")? "mp4" : "mp3")
            if (!status) return m.reply(util.format(message)) 
            if (m.text.includes("@video") && parseInt(data.size) > 10000) {
                return m.reply("Sizenya gede banget kak 🙂")
            } else if (parseInt(data.size) > 20000) {
                return m.reply("Sizenya gede banget kak 🙂")
            }
            if (m.text.includes("@video")) {
                m.reply(data.link, m.chat, db.settings.replyType, [], m.sender, { type: "video", mimetype: "video/mp4", quoted: m })
            } else {
                mywa.sendMessageV2(m.chat, { audio: data.link, mimetype: "audio/mp4" })
            }
            cmdSuccess(command, "downloader")
        } catch (error) {
            cmdFailed(command, "downloader", error)
        }
    }
}