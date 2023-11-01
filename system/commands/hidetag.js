const fs = require("fs") 
const chalk = require("chalk")
const config = require("@config")
const { getBuffer } = require("@libs/function")
const { getContentType } = require("baileys")
module.exports = {
    commands: ["hidetag"],
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    callback: async ({ sock, m, groupMembers, isImage, isVideo, isViewOnce, isDocument, isQuotedDocument, isQuotedViewOnce, isQuotedImage, isQuotedVideo }) => {
        if (isImage || isQuotedImage) {
        const teks = (m.text == "" && isQuotedImage)? m.quoted.body : m.text
        const media = await sock.downloadMediaMessage(isQuotedImage? m.quoted : m)
        await sock.sendMessage(m.chat, { contextInfo: { mentionedJid: groupMembers }, image: media, caption: teks })
        } else if (isVideo || isQuotedVideo) {
        if ((isQuotedVideo? m.quoted.message[m.type].seconds : m.message[m.type].seconds) > 600) return m.reply("Terlalu gede sizenya kak")
        const teks = (m.text == "" && isQuotedVideo)? m.quoted.body : m.text
        const media = await sock.downloadMediaMessage(isQuotedVideo? m.quoted : m)
        await sock.sendMessage(m.chat, { contextInfo: { mentionedJid: groupMembers }, video: media, caption: teks })
        } else if (isViewOnce || isQuotedViewOnce) {
        if (isQuotedViewOnce && getContentType(m.quoted.message) == "videoMessage" && m.quoted.message["videoMessage"].seconds > 600 || getContentType(m.message) == "videoMessage" && m.message["videoMessage"].seconds > 600) { return m.reply("Terlalu gede sizenya kak") }
        const teks = (m.text == "" && isQuotedViewOnce)? m.quoted.body : m.text
        const media = await sock.downloadMediaMessage(isQuotedViewOnce? m.quoted : m)
        if (isQuotedViewOnce && m.text == "" && getContentType(m.quoted.message) == "videoMessage" ||  getContentType(m.message) == "videoMessage") {
        await sock.sendMessage(m.chat, { contextInfo: { mentionedJid: groupMembers }, video: media, caption: teks, viewOnce: true })
        } else if (isQuotedViewOnce && m.text == "" && getContentType(m.quoted.message) == "imageMessage" ||  getContentType(m.message) == "imageMessage") {
        await sock.sendMessage(m.chat, { contextInfo: { mentionedJid: groupMembers }, image: media, caption: teks, viewOnce: true })
        }
        } else if (isDocument || isQuotedDocument) {
        const teks = (m.text == "" && isQuotedDocument)? m.quoted.body : m.text
        const fileName = isQuotedDocument? m.quoted.message["documentMessage"].fileName : m.message["documentMessage"].fileName
        const media = await sock.downloadMediaMessage(isQuotedDocument? m.quoted : m)
        await sock.sendMessage(m.chat, { document: media, mimetype: "application/bin", fileName: fileName, mentions: groupMembers })
        } else {
        const text = (m.text == "" && m.quoted)? m.quoted.budy : m.text
        if (config[m.botNumber].replytype == "mess1") {
        sock.sendMessage(m.chat, { text, contextInfo: { mentionedJid: groupMembers, forwardingScore: 999, isForwarded: true }})
        } else if (config[m.botNumber].replytype == "mess2") {
        sock.sendMessage(m.chat, { text, contextInfo: { mentionedJid: groupMembers, forwardingScore: 10, isForwarded: true }})
        } else if (config[m.botNumber].replytype == "mess3") {
        sock.sendMessage(m.chat, { text, mentions: groupMembers })
        } else if (config[m.botNumber].replytype == "mess4") {
        try{
        var ppimg = await getBuffer((await sock.profilePictureUrl(m.sender, "image"))) 
        } catch {
        var ppimg = await getBuffer("https://raw.githubusercontent.com/Aztecs444/media/Zeck/image/profilePicture.jpg")
        }
        sock.sendMessage(m.chat, { contextInfo: { mentionedJid: groupMembers, externalAdReply: { showAdAttribution: true, title: "Hallo kak👋", body: "DONT CLICK HERE", previewType: "PHOTO", thumbnail: ppimg, sourceUrl: "https://wa.me/" + m.ownerNumber }}, text })
        } else if (config[m.botNumber].replytype == "mess5") {
        try{
        var ppimg = await getBuffer((await sock.profilePictureUrl(m.sender, "image"))) 
        } catch {
        var ppimg = await getBuffer("https://raw.githubusercontent.com/Aztecs444/media/Zeck/image/profilePicture.jpg")
        }
        sock.sendMessage(m.chat, { contextInfo: { mentionedJid: groupMembers, forwardingScore: 9999, isForwarded: true, externalAdReply: { title: "Hallo kak👋", body: "DONT CLICK HERE", previewType: "PHOTO", thumbnail: ppimg, sourceUrl: "https://wa.me/" + m.ownerNumber }}, text })
        } else if (config[m.botNumber].replytype == "mess6") {
        try{
        var ppimg = await getBuffer((await sock.profilePictureUrl(m.sender, "image"))) 
        } catch {
        var ppimg = await getBuffer("https://raw.githubusercontent.com/Aztecs444/media/Zeck/image/profilePicture.jpg")
        }
        sock.sendMessage(m.chat, { contextInfo: { mentionedJid: groupMembers, forwardingScore: 10, isForwarded: true, externalAdReply: { title: "Hallo kak👋", body: "DONT CLICK HERE", previewType: "PHOTO", thumbnail: ppimg, sourceUrl: "https://wa.me/" + m.ownerNumber }}, text })
        } else if (config[m.botNumber].replytype == "mess7") {
        try{
        var ppimg = await getBuffer((await sock.profilePictureUrl(m.sender, "image"))) 
        } catch {
        var ppimg = await getBuffer("https://raw.githubusercontent.com/Aztecs444/media/Zeck/image/profilePicture.jpg")
        }
        sock.sendMessage(m.chat, { contextInfo: { mentionedJid: groupMembers, externalAdReply: { title: "Hallo kak👋", body: "DONT CLICK HERE", previewType: "PHOTO", thumbnail: ppimg, sourceUrl: "https://wa.me/" + m.ownerNumber }}, text })
        }
        }
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})