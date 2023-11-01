module.exports = {
    commands: ["rvo"],
    tags: "converter menu", 
    isSewa: true,
    isMedia: {
        isViewOnce: true, 
        isQuotedMedia: {
            isQuotedViewOnce: true
        }
    },
    callback: async ({ mywa, m, cmdSuccess, cmdFailed, command, isImage, isVideo, isQuotedImage, isQuotedVideo }) => {
        try {
            if (isImage || isQuotedImage) {
                const media = await mywa.downloadMediaMessage(isQuotedImage? m.quoted : m)
                await m.reply(media, m.chat, db.settings.replyType, [], m.sender, { type: "image", quoted: m })
                cmdSuccess(command, "converter menu")
            } else if (isVideo || isQuotedVideo) {
                const media = await mywa.downloadMediaMessage(isQuotedVideo? m.quoted : m)
                await m.reply(media, m.chat, db.settings.replyType, [], m.sender, { type: "video", quoted: m })
                cmdSuccess(command, "converter menu")
            }
        } catch (error) {
            cmdFailed(command, "converter menu", error)
        }
    }
}