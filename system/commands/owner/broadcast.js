import { sleep } from "../../libs/function.js"
export default {
    commands: ["bc"],
    tags: "owner menu", 
    isSewa: true,
    isOwner: true,
    callback: async ({ mywa, m, command, cmdSuccess, cmdFailed, isImage, isVideo, isDocument, isQuotedDocument, isQuotedImage, isQuotedVideo }) => {
        try {
            const listBlock = (await mywa.getBlockedContacts()).map((x) => x.id._serialized)
            const data = [
                ...(await mywa.getChats()).map((x) => x.id._serialized).filter((x) => (x.endsWith("@c.us") && !listBlock.includes(x))).filter(async (x) => {
                    return (await mywa.isRegisteredUser(x))
                }),
                ...(await mywa.getAllGroups()).filter((x) => {
                    return (x.announce && x.participants.map((v) => ((typeof v.id == "object" && v.id !== undefined)? v.id._serialized : v.id)).includes(m.botNumber) && x.participants.filter((v) => (v.isAdmin || v.isSuperAdmin)).map((v) => ((typeof v.id == "object" && v.id !== undefined)? v.id._serialized : v.id)).includes(m.botNumber) || !x.announce && x.participants.map((v) => ((typeof v.id == "object" && v.id !== undefined)? v.id._serialized : v.id)).includes(m.botNumber)) 
                }).map((x) => x.id)
            ]
            if (isImage || isQuotedImage) {
                const teks = m.text? "\`\`\`「  BROADCAST MESSAGE  」\`\`\`\n\n" + m.text : "\`\`\`「  BROADCAST MESSAGE  」\`\`\`"
                const media = await mywa.downloadMediaMessage(isQuotedImage? m.quoted : m)
                for (let x of data) {
                    const groupMetadata = x.endsWith("@g.us")? (await mywa.groupMetadata(x).catch(e => {})) : {}
                    const mention = [...teks.matchAll(/@([0-9]{5,16}|0)/g)].map((x) => x[1]).filter((x) => m.isNumber(parseInt(x))).map((x) => x + "@c.us")
                    const mentions = [...(Object.keys(groupMetadata).length > 0? groupMetadata?.participants.map((x) => ((typeof x.id == "object" && x.id !== undefined)? x.id._serialized : x.id)) : []), ...mention]
                    await mywa.sendMessageV2(x, { image: media, caption: teks, mentions, contextInfo: { isForwarded: true, forwardingScore: 999 }})
                    await sleep(2000)
                }
                m.reply(`Success send broadcast message to ${data.length} chats`)
                cmdSuccess(command, "owner menu")
            } else if (isVideo || isQuotedVideo) {
                const teks = m.text? "\`\`\`「  BROADCAST MESSAGE  」\`\`\`\n\n" + m.text : "\`\`\`「  BROADCAST MESSAGE  」\`\`\`"
                const media = await mywa.downloadMediaMessage(isQuotedVideo? m.quoted : m)
                for (let x of data) {
                    const groupMetadata = x.endsWith("@g.us")? (await mywa.groupMetadata(x).catch(e => {})) : {}
                    const mention = [...teks.matchAll(/@([0-9]{5,16}|0)/g)].map((x) => x[1]).filter((x) => m.isNumber(parseInt(x))).map((x) => x + "@c.us")
                    const mentions = [...(Object.keys(groupMetadata).length > 0? groupMetadata?.participants.map((x) => ((typeof x.id == "object" && x.id !== undefined)? x.id._serialized : x.id)) : []), ...mention]
                    await mywa.sendMessageV2(x, { video: media, caption: teks, mentions, contextInfo: { isForwarded: true, forwardingScore: 999 }})
                    await sleep(2000)
                }
                m.reply(`Success send broadcast message to ${data.length} chats`)
                cmdSuccess(command, "owner menu")
            } else if (isDocument || isQuotedDocument) {
                const teks = m.text? "\`\`\`「  BROADCAST MESSAGE  」\`\`\`\n\n" + m.text : "\`\`\`「  BROADCAST MESSAGE  」\`\`\`"
                const media = await mywa.downloadMediaMessage(isQuotedDocument? m.quoted : m)
                const fileName = isQuotedDocument? m.quoted.fileName : m.fileName
                for (let x of data) {
                    const groupMetadata = x.endsWith("@g.us")? (await mywa.groupMetadata(x).catch(e => {})) : {}
                    const mention = [...teks.matchAll(/@([0-9]{5,16}|0)/g)].map((x) => x[1]).filter((x) => m.isNumber(parseInt(x))).map((x) => x + "@c.us")
                    const mentions = [...(Object.keys(groupMetadata).length > 0? groupMetadata?.participants.map((x) => ((typeof x.id == "object" && x.id !== undefined)? x.id._serialized : x.id)) : []), ...mention]
                    await mywa.sendMessageV2(x, { document: media, caption: teks, fileName, mentions, contextInfo: { isForwarded: true, forwardingScore: 999 }})
                    await sleep(2000)
                }
                m.reply(`Success send broadcast message to ${data.length} chats`)
                cmdSuccess(command, "owner menu")
            } else {
                if (!m.text) return m.reply("Text?")
                const teks = "\`\`\`「  BROADCAST MESSAGE  」\`\`\`\n\n" + m.text
                for (let x of data) {
                    const groupMetadata = x.endsWith("@g.us")? (await mywa.groupMetadata(x).catch(e => {})) : {}
                    const mention = [...teks.matchAll(/@([0-9]{5,16}|0)/g)].map((x) => x[1]).filter((x) => m.isNumber(parseInt(x))).map((x) => x + "@c.us")
                    const mentions = [...(Object.keys(groupMetadata).length > 0? groupMetadata?.participants.map((x) => ((typeof x.id == "object" && x.id !== undefined)? x.id._serialized : x.id)) : []), ...mention]
                    await mywa.sendMessageV2(x, { text: teks, mentions, contextInfo: { isForwarded: true, forwardingScore: 999 }})
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