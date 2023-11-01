module.exports = {
    commands: ["swm"],
    tags: "converter menu", 
    example: "{prefix}{command} Punya Nun 😤",
    isSewa: true,
    isPremium: true,
    isWait: true, 
    isMedia: {
        isImage: true, 
        isVideo: true, 
        isQuotedMedia: {
            isQuotedImage: true, 
            isQuotedVideo: true,
            isQuotedSticker: true
        }
    },
    callback: async ({ mywa, m, cmdSuccess, cmdFailed, command, isImage, isVideo, isQuotedImage, isQuotedVideo, isQuotedSticker }) => {
        try {
            if (isImage || isQuotedImage) {
                const media = await mywa.downloadMediaMessage(isQuotedImage? m.quoted : m)
                await mywa.sendMessageV2(m.chat, { sticker: media, packName: m.text? m.text : "" }, { quoted: m })
                cmdSuccess(command, "converter menu")
            } else if (isVideo || isQuotedVideo) {
                if ((isQuotedVideo? m.quoted.duration : m.duration) > 10) return m.reply("Hanya dapat mendownload video sampai 10 detik kak")
                const media = await mywa.downloadMediaMessage(isQuotedVideo? m.quoted : m)
                await mywa.sendMessageV2(m.chat, { sticker: media, packName: m.text? m.text : "" }, { quoted: m })
                cmdSuccess(command, "converter menu")
            } else if (isQuotedSticker) {
                const media = await mywa.downloadMediaMessage(m.quoted)
                await mywa.sendMessageV2(m.chat, { sticker: media, packName: m.text? m.text : "" }, { quoted: m })
                cmdSuccess(command, "converter menu")
            }
        } catch (error) {
            cmdFailed(command, "converter menu", error)
        }
    }
}