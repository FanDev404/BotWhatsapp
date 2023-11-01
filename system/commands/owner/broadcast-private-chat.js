import { sleep } from "../../libs/function.js"
export default {
    commands: ["bcpc"],
    tags: "owner menu", 
    isSewa: true,
    isOwner: true,
    callback: async ({ mywa, m, command, cmdSuccess, cmdFailed, isImage, isVideo, isDocument, isQuotedDocument, isQuotedImage, isQuotedVideo }) => {
        try {
            const listBlock = (await mywa.getBlockedContacts()).map((x) => x.id._serialized)
            const data = (await mywa.getChats()).map((x) => x.id._serialized).filter((x) => (x.endsWith("@c.us") && !listBlock.includes(x))).filter(async (x) => {
                    return (await mywa.isRegisteredUser(x))
                })
            if (isImage || isQuotedImage) {
                const teks = m.text? "\`\`\`「  BROADCAST MESSAGE  」\`\`\`\n\n" + m.text : "\`\`\`「  BROADCAST MESSAGE  」\`\`\`"
                const media = await mywa.downloadMediaMessage(isQuotedImage? m.quoted : m)
                for (let x of data) {
                    await mywa.sendMessageV2(x, { image: media, caption: teks, mentions: [...teks.matchAll(/@([0-9]{5,16}|0)/g)].map((x) => x[1]).filter((x) => m.isNumber(parseInt(x))).map((x) => x + "@c.us"), contextInfo: { isForwarded: true, forwardingScore: 999 }})
                    await sleep(2000)
                }
                m.reply(`Success send broadcast message to ${data.length} chats`)
                cmdSuccess(command, "owner menu")
            } else if (isVideo || isQuotedVideo) {
                const teks = m.text? "\`\`\`「  BROADCAST MESSAGE  」\`\`\`\n\n" + m.text : "\`\`\`「  BROADCAST MESSAGE  」\`\`\`"
                const media = await mywa.downloadMediaMessage(isQuotedVideo? m.quoted : m)
                for (let x of data) {
                    await mywa.sendMessageV2(x, { video: media, caption: teks, mentions: [...teks.matchAll(/@([0-9]{5,16}|0)/g)].map((x) => x[1]).filter((x) => m.isNumber(parseInt(x))).map((x) => x + "@c.us"), contextInfo: { isForwarded: true, forwardingScore: 999 }})
                    await sleep(2000)
                }
                m.reply(`Success send broadcast message to ${data.length} chats`)
                cmdSuccess(command, "owner menu")
            } else if (isDocument || isQuotedDocument) {
                const teks = m.text? "\`\`\`「  BROADCAST MESSAGE  」\`\`\`\n\n" + m.text : "\`\`\`「  BROADCAST MESSAGE  」\`\`\`"
                const media = await mywa.downloadMediaMessage(isQuotedDocument? m.quoted : m)
                const fileName = isQuotedDocument? m.quoted.fileName : m.fileName
                for (let x of data) {
                    await mywa.sendMessageV2(x, { document: media, caption: teks, fileName, mentions: [...teks.matchAll(/@([0-9]{5,16}|0)/g)].map((x) => x[1]).filter((x) => m.isNumber(parseInt(x))).map((x) => x + "@c.us"), contextInfo: { isForwarded: true, forwardingScore: 999 }})
                    await sleep(2000)
                }
                m.reply(`Success send broadcast message to ${data.length} chats`)
                cmdSuccess(command, "owner menu")
            } else {
                if (!m.text) return m.reply("Text?")
                const teks = "\`\`\`「  BROADCAST MESSAGE  」\`\`\`\n\n" + m.text
                for (let x of data) {
                    await mywa.sendMessageV2(x, { text: teks, mentions: [...teks.matchAll(/@([0-9]{5,16}|0)/g)].map((x) => x[1]).filter((x) => m.isNumber(parseInt(x))).map((x) => x + "@c.us"), contextInfo: { isForwarded: true, forwardingScore: 999 }})
                    await sleep(2000)
                }
                m.reply(`Success send broadcast message to ${data.length} chats`)
                cmdSuccess(command, "owner menu")
            }
        } catch (error) {
            cmdFailed(command, "owner menu", error)
        }
    }
}