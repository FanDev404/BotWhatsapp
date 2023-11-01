import util from "util"
import { resizeImage } from "../../libs/function.js"
export default {
    commands: ["resize"],
    tags: "converter menu", 
    isSewa: true,
    isWait: true, 
    isMedia: {
        isImage: true, 
        isQuotedMedia: {
            isQuotedImage: true
        }
    },
    callback: async ({ mywa, m, command, cmdSuccess, cmdFailed, isQuotedImage }) => {
        try {
            if (!m.text.includes("x")) return m.reply("Invalid example!!")
            if (m.text.split("x").filter((x) => m.isNumber(Number(x))).length < 2) return m.reply("Invalid example!!")
            const media = await mywa.downloadMediaMessage(isQuotedImage? m.quoted : m)
            const { status, base64, buffer, message } = await resizeImage(media, m.text.split("x")[0], m.text.split("x")[1]) 
            if (!status) return m.reply(util.format(message))
            await m.reply(buffer, m.chat, db.settings.replyType, [], m.sender, { type: "image", quoted: m })
            cmdSuccess(command, "converter menu")
        } catch (error) {
            cmdFailed(command, "converter menu", error)
        }
    }
}