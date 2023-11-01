module.exports = {
    commands: ["s"],
    tags: "converter menu", 
    isSewa: true,
    isWait: true, 
    isMedia: {
        isImage: true, 
        isVideo: true, 
        isQuotedMedia: {
            isQuotedImage: true, 
            isQuotedVideo: true
        }
    },
    callback: async ({ mywa, m, cmdSuccess, cmdFailed, command, isImage, isVideo, isQuotedImage, isQuotedVideo }) => {
        try {
            if (isImage || isQuotedImage) {
                const media = await mywa.downloadMediaMessage(isQuotedImage? m.quoted : m)
                await mywa.sendMessageV2(m.chat, { sticker: media, packName: (m.isPremium(m.sender) && m.pushName !== "No Name")? m.pushName : m.isPremium(m.sender)? m.senderNumber : "" }, { quoted: m })
                cmdSuccess(command, "converter menu")
            } else if (isVideo || isQuotedVideo) {
                if ((isQuotedVideo? m.quoted.duration : m.duration) > 10) return m.reply("Hanya dapat mendownload video sampai 10 detik kak")
                const media = await mywa.downloadMediaMessage(isQuotedVideo? m.quoted : m)
                await mywa.sendMessageV2(m.chat, { sticker: media, packName: (m.isPremium(m.sender) && m.pushName !== "No Name")? m.pushName : m.isPremium(m.sender)? m.senderNumber : "" }, { quoted: m })
                cmdSuccess(command, "converter menu")
            }
        } catch (error) {
            cmdFailed(command, "converter menu", error)
        }
    }
}