module.exports = {
    commands: ["setpp"],
    tags: "owner menu", 
    isSewa: true,
    isOwner: true,
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
                await mywa.setProfilePict(m.botNumber, media, "long")
                await m.reply("Success changed photo profile")
                cmdSuccess(command, "owner menu")
            } else if (isImage || isQuotedImage) {
                const media = await mywa.downloadMediaMessage(isQuotedImage? m.quoted : m)
                await mywa.setProfilePict(m.botNumber, media)
                await m.reply("Success changed photo profile")
                cmdSuccess(command, "owner menu")
            }
        } catch (error) {
            cmdFailed(command, "owner menu", error)
        }
    }
}