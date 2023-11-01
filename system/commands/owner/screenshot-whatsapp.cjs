module.exports = {
    commands: ["sswa"],
    tags: "owner menu", 
    isSewa: true,
    isOwner: true,
    callback: async ({ mywa, m, command, cmdSuccess, cmdFailed }) => {
        try {
            await mywa.mPage.setViewportSize({ width: 340, height: 1000 })
            const media = await mywa.mPage.screenshot()
            await m.reply(media, m.chat, db.settings.replyType, [], m.sender, { type: "image", quoted: m })
            cmdSuccess(command, "owner menu")
        } catch (error) {
            cmdFailed(command, "owner menu", error)
        }
    }
}