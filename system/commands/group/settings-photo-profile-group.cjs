module.exports = {
    commands: ["setppgc"],
    tags: "group menu", 
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    isBotAdmin: true,
    isMedia: {
        isImage: true, 
        isQuotedMedia: {
            isQuotedImage: true
        }
    }, 
    callback: async ({ mywa, m, command, cmdSuccess, cmdFailed, isQuotedImage, isImage }) => {
        try {
            if (isImage && m.text == "full" || isImage && m.text == "/full" || isQuotedImage && m.text == "full" || isQuotedImage && m.text == "/full") {
                const media = await mywa.downloadMediaMessage(isQuotedImage? m.quoted : m)
                await mywa.setProfilePict(m.chat, media, "long")
                await m.reply("Success changed photo profile")
                cmdSuccess(command, "group menu")
            } else if (isImage || isQuotedImage) {
                const media = await mywa.downloadMediaMessage(isQuotedImage? m.quoted : m)
                await mywa.setProfilePict(m.chat, media)
                await m.reply("Success changed photo profile")
                cmdSuccess(command, "group menu")
            }
        } catch (error) {
            cmdFailed(command, "group menu", error)
        }
    }
}