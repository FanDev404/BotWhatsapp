import { isUrl } from "../../libs/function.js"
export default {
    commands: ["getpp"],
    tags: "main menu", 
    isSewa: true,
    callback: async ({ mywa, m, command, cmdSuccess, cmdFailed }) => {
        try {
            if (m.input.length == 0) return m.reply("Reply/Tag/nomer")
            for(let x of m.input) {
                try{
                    var thumbnailUrl = isUrl((await mywa.getProfilePict(x)))? (await mywa.getProfilePict(x)) : "https://raw.githubusercontent.com/Aztecs444/media/Zeck/image/profilePicture.jpg"
                } catch {
                    var thumbnailUrl = "https://raw.githubusercontent.com/Aztecs444/media/Zeck/image/profilePicture.jpg"
                }
                m.reply(thumbnailUrl, m.chat, db.settings.replyType, [], m.sender, { type: "image", quoted: m })
            }
            cmdSuccess(command, "main menu")
        } catch (error) {
            cmdFailed(command, "main menu", error)
        }
    }
}