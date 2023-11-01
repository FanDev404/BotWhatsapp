module.exports = {
    commands: ["hidetag"],
    tags: "group menu",
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    callback: async ({ mywa, m, command, cmdSuccess, cmdFailed, isImage, isVideo, isDocument, isText, isQuotedDocument, isQuotedImage, isQuotedVideo }) => {
        try {
            if (isImage || isQuotedImage) {
                const teks = (m.text == "" && isQuotedImage)? m.quoted.body : m.text
                const media = await mywa.downloadMediaMessage(isQuotedImage? m.quoted : m)
                const mentions = Object.keys(m.groupMetadata).length > 0? m.groupParticipants.filter((x) => (!x.isAdmin && !x.isSuperAdmin)).map((x) => ((typeof x.id == "object" && x.id !== undefined)? x.id._serialized : x.id)) : []
                await mywa.sendMessageV2(m.chat, { image: media, caption: teks, mentions, contextInfo: { isForwarded: true, forwardingScore: 999 }})
                cmdSuccess(command, "group menu")
            } else if (isVideo || isQuotedVideo) {
                const teks = (m.text == "" && isQuotedVideo)? m.quoted.body : m.text
                const media = await mywa.downloadMediaMessage(isQuotedImage? m.quoted : m)
                await mywa.sendMessageV2(m.chat, { video: media, caption: teks, mentions, contextInfo: { isForwarded: true, forwardingScore: 999 }})
                cmdSuccess(command, "group menu")
            } else if (isDocument || isQuotedDocument) {
                const teks = (m.text == "" && isQuotedDocument)? m.quoted.body : m.text
                const media = await mywa.downloadMediaMessage(isQuotedDocument? m.quoted : m)
                const fileName = isQuotedDocument? m.quoted.fileName : m.fileName
                const mentions = Object.keys(m.groupMetadata).length > 0? m.groupParticipants.filter((x) => (!x.isAdmin && !x.isSuperAdmin)).map((x) => ((typeof x.id == "object" && x.id !== undefined)? x.id._serialized : x.id)) : []
                await mywa.sendMessageV2(m.chat, { document: media, caption: teks, fileName, mentions, contextInfo: { isForwarded: true, forwardingScore: 999 }})
                cmdSuccess(command, "group menu")
            } else {
                if (!isText) return m.reply("Text?")
                const teks = (m.text == "" && isQuotedText)? m.quoted.body : m.text
                const mentions = Object.keys(m.groupMetadata).length > 0? m.groupParticipants.filter((x) => (!x.isAdmin && !x.isSuperAdmin)).map((x) => ((typeof x.id == "object" && x.id !== undefined)? x.id._serialized : x.id)) : []
                await mywa.sendMessageV2(m.chat, { text: teks, mentions, contextInfo: { isForwarded: true, forwardingScore: 999 }})
                cmdSuccess(command, "group menu")
            }
        } catch (error) {
            cmdFailed(command, "group menu", error)
        }
    }
}