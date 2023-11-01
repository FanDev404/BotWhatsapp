const fs = require("fs")
const chalk = require("chalk") 
const moment = require("moment-timezone") 
const config = require("@config") 
const { default: makeWASocket, getContentType, downloadContentFromMessage, generateForwardMessageContent, generateWAMessageFromContent } = require("baileys")
const { decodeJid, randomNomor, runtime, calender, getBuffer } = require("@libs/function")
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require("@libs/exif")



exports.makeWASocket = (connectionOptions) => {
const sock = makeWASocket(connectionOptions)
//=================================================//
sock.copyNForward = async(jid, message, forwardingScore = true, options = {}) => {
let m = generateForwardMessageContent(message, !!forwardingScore)
let mtype = Object.keys(m)[0]
if (forwardingScore && typeof forwardingScore == "number" && forwardingScore > 1) m[mtype].contextInfo.forwardingScore += forwardingScore
m = generateWAMessageFromContent(jid, m, { ...options, userJid: sock?.user?.id })
await sock.relayMessage(jid, m.message, { messageId: m?.key?.id, additionalAttributes: { ...options } })
return m
}
//=================================================//
sock.downloadAndSaveMediaMessage = async(msg, filename) => {
const { fromBuffer } = require("file-type")    
const messageType = ["viewOnceMessageV2","viewOnceMessage","documentWithCaptionMessage"].includes(msg.type)? getContentType(msg.message).split("Message")[0] : msg.type.split("Message")[0]
const stream = await downloadContentFromMessage(msg.message[messageType + "Message"], messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
let type = await fromBuffer(buffer)
await fs.writeFileSync(filename + "." + type.ext, buffer)
return (filename + "." + type.ext)
}
//=================================================//
sock.downloadMediaMessage = async(msg) => {
const messageType = ["viewOnceMessageV2","viewOnceMessage","documentWithCaptionMessage"].includes(msg.type)? getContentType(msg.message).split("Message")[0] : msg.type.split("Message")[0]
const stream = await downloadContentFromMessage(msg.message[messageType + "Message"], messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
return buffer
}
//=================================================//
sock.sendContact = async (jid, number, name, quoted) => {
let njid = number.replace(new RegExp("[()+-/ +/]", "gi"), "") + "@s.whatsapp.net"
let vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${name.replace(/\n/g, "\\n")}\nTEL;type=CELL;type=VOICE;waid=${number}:${number}\nEND:VCARD`
return sock.sendMessage(jid, { contacts: { displayName: `${name}`, contacts: [{ vcard }] }}, { quoted })
}
//=================================================//
sock.sendKontak = async (jid, data, quoted) => {
const vcard = []
const ownerNumber = Object.keys(config).includes(decodeJid(sock?.user?.id))? config[decodeJid(sock.user.id)].ownerNumber : config.ownerNumber
const ownerName = Object.keys(config).includes(decodeJid(sock?.user?.id))? config[decodeJid(sock.user.id)].ownerName : config.ownerName
for (let x of data) {
const name = x == ownerNumber + "@s.whatsapp.net"? ownerName : Object.keys(db.users).includes(x)? db.users[x].name : x.split("@")[0]          
vcard.push({vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:${name.replace(/\n/g, "\\n")}\nTEL;type=CELL;type=VOICE;waid=${x.split("@")[0]}:${x.split("@")[0]}\nEND:VCARD`}) 
}
return sock.sendMessage(jid, { contacts: { displayName: `${vcard.length} Kontak`, contacts: vcard }}, { quoted })
}
//=================================================//
sock.sendStickerImage = async (jid, options = {}, quoted = {}) => {
const buff = Buffer.isBuffer(options.buffer)? options.buffer : /^data:.*?\/.*?;base64,/i.test(options.buffer)? Buffer.from(options.buffer.split`,`[1], "base64") : /^https?:\/\//.test(options.buffer) ? await (await fetch(options.buffer)).buffer() : fs.existsSync(options.buffer) ? fs.readFileSync(options.buffer) : Buffer.alloc(0)
if (Object.keys(options).includes("packname") || Object.keys(options).includes("author")) {
const buffer = await writeExifImg(buff, options)
return await sock.sendMessage(jid, { sticker: { url: buffer }}, quoted)
} else {
const buffer = await imageToWebp(options.buffer)
return await sock.sendMessage(jid, { sticker: buffer }, quoted)
}}
//=================================================//
sock.sendStickerVideo = async (jid, options = {}, quoted = {}) => {
const buff = Buffer.isBuffer(options.buffer)? options.buffer : /^data:.*?\/.*?;base64,/i.test(options.buffer)? Buffer.from(options.buffer.split`,`[1], "base64") : /^https?:\/\//.test(options.buffer) ? await (await fetch(options.buffer)).buffer() : fs.existsSync(options.buffer) ? fs.readFileSync(options.buffer) : Buffer.alloc(0)
if (Object.keys(options).includes("packname") || Object.keys(options).includes("author")) {
const buffer = await writeExifVid(buff, options)
return await sock.sendMessage(jid, { sticker: { url: buffer }}, quoted)
} else {
const buffer = await videoToWebp(options.buffer)
return await sock.sendMessage(jid, { sticker: buffer }, quoted)
}}
//=================================================//
Object.defineProperty(sock, "name", {
value: { ...({}) },
configurable: true,
})
return sock
}

exports.serialize = (sock, msg, store) => {
    const m = {}
    if (msg.key) {
        m.key = {
                   id: msg?.key?.id || "", 
                   fromMe: msg?.key?.fromMe || false, 
                   remoteJid: msg?.key?.remoteJid || "", 
                   participant: msg?.key?.participant || ""
        }
        m.isBaileys = m?.key?.id.startsWith("BAE5") && m?.key?.id.length == 16
        m.chat = m.key.remoteJid
        m.isGroup = m.chat.endsWith("@g.us")
        m.sender = decodeJid(m?.key?.fromMe && sock?.user?.id || m.key.participant || m.chat || "")
        m.senderNumber = m.sender.split("@")[0]
    }
    m.type = (!["senderKeyDistributionMessage","messageContextInfo"].includes(Object.keys(msg.message)[0]) && Object.keys(msg.message)[0]) || (Object.keys(msg.message).length >= 3 && Object.keys(msg.message)[1] !== "messageContextInfo" && Object.keys(msg.message)[1]) || Object.keys(msg.message)[Object.keys(msg.message).length - 1]
    if (Object.keys(db.message).includes(m.sender)) {
        if (m.type == "extendedTextMessage") {
            db.message[m.sender].key = m.key            
            db.message[m.sender].message = { extendedTextMessage: msg.message[m.type] }
        } else if (m.type == "conversation") {
            db.message[m.sender].key = m.key
            db.message[m.sender].message = { conversation: msg.message[m.type] }
        } else if (m.type == "imageMessage") {
            db.message[m.sender].key = m.key
            db.message[m.sender].message = { imageMessage: msg.message[m.type] }
        } else if (m.type == "videoMessage") {
            db.message[m.sender].key = m.key
            db.message[m.sender].message = { videoMessage: msg.message[m.type] }
        } else if (m.type == "stickerMessage") {
            db.message[m.sender].key = m.key
            db.message[m.sender].message = { stickerMessage: msg.message[m.type] }
        } else if (m.type == "audioMessage") {
            db.message[m.sender].key = m.key
            db.message[m.sender].message = { audioMessage: msg.message[m.type] }
        } else if (m.type == "viewOnceMessage") {
            db.message[m.sender].key = m.key
            db.message[m.sender].message = { viewOnceMessage: msg.message[m.type] }
        } else if (m.type == "viewOnceMessageV2") {
            db.message[m.sender].key = m.key
            db.message[m.sender].message = { viewOnceMessageV2: msg.message[m.type] }
        } else if (m.type == "contactMessage") {
            db.message[m.sender].key = m.key
            db.message[m.sender].message = { contactMessage: msg.message[m.type] }
        } else if (m.type == "contactsArrayMessage") {
            db.message[m.sender].key = m.key
            db.message[m.sender].message = { contactsArrayMessage: msg.message[m.type] }
        } else if (m.type == "locationMessage") {
            db.message[m.sender].key = m.key
            db.message[m.sender].message = { locationMessage: msg.message[m.type] }
        } else if (m.type == "documentMessage") {
            db.message[m.sender].key = m.key
            db.message[m.sender].message = { documentMessage: msg.message[m.type] }
        } else if (m.type == "documentWithCaptionMessage") {
            db.message[m.sender].key = m.key
            db.message[m.sender].message = { documentWithCaptionMessage: msg.message[m.type] }
        }
    } else {
        if (m.type == "extendedTextMessage") {
            db.message[m.sender] = { key: m.key, message: { extendedTextMessage: msg.message[m.type] }}
        } else if (m.type == "conversation") {
            db.message[m.sender] = { key: m.key, message: { conversation: msg.message[m.type] }}
        } else if (m.type == "imageMessage") {
            db.message[m.sender] = { key: m.key, message: { imageMessage: msg.message[m.type] }}
        } else if (m.type == "videoMessage") {
            db.message[m.sender] = { key: m.key, message: { videoMessage: msg.message[m.type] }}
        } else if (m.type == "stickerMessage") {
            db.message[m.sender] = { key: m.key, message: { stickerMessage: msg.message[m.type] }}
        } else if (m.type == "audioMessage") {
            db.message[m.sender] = { key: m.key, message: { audioMessage: msg.message[m.type] }}
        } else if (m.type == "viewOnceMessage") {
            db.message[m.sender] = { key: m.key, message: { viewOnceMessage: msg.message[m.type] }}
        } else if (m.type == "viewOnceMessageV2") {
            db.message[m.sender] = { key: m.key, message: { viewOnceMessageV2: msg.message[m.type] }}
        } else if (m.type == "contactMessage") {
            db.message[m.sender] = { key: m.key, message: { contactMessage: msg.message[m.type] }}
        } else if (m.type == "contactsArrayMessage") {
            db.message[m.sender] = { key: m.key, message: { contactsArrayMessage: msg.message[m.type] }}
        } else if (m.type == "locationMessage") {
            db.message[m.sender] = { key: m.key, message: { locationMessage: msg.message[m.type] }}
        } else if (m.type == "documentMessage") {
            db.message[m.sender] = { key: m.key, message: { documentMessage: msg.message[m.type] }}
        } else if (m.type == "documentWithCaptionMessage") {
            db.message[m.sender] = { key: m.key, message: { documentWithCaptionMessage: msg.message[m.type] }}
        }
    }
    if (["viewOnceMessage","viewOnceMessageV2","documentWithCaptionMessage"].includes(m.type)) {
        msg.message = msg.message[m.type].message
    }
    m.body = m.type == "conversation"? msg.message.conversation : m.type == "extendedTextMessage"? msg.message.extendedTextMessage.text : m.type == "imageMessage"? msg.message.imageMessage.caption : m.type == "videoMessage"? msg.message.videoMessage.caption : m.type == "viewOnceMessage"? msg.message[getContentType(msg.message)]?.caption : m.type == "viewOnceMessageV2"? msg.message[getContentType(msg.message)]?.caption : m.type == "documentMessage"? msg.message.documentMessage?.caption : m.type == "documentWithCaptionMessage"? msg.message.documentMessage.caption : m.type == "pollCreationMessage"? msg.message.pollCreationMessage.name : ""
    m.budy = m.type == "conversation"? msg.message.conversation : m.type == "extendedTextMessage"? msg.message.extendedTextMessage.text : ""
    m.args = m.body.trim().split(/ +/).slice(1)
    m.text = m?.args?.join(" ")
    m.botNumber = decodeJid(sock?.user?.id)
    m.pushName = msg.pushName
    m.timeWib = moment().tz("Asia/Jakarta").format("HH:mm:ss")
    if (m.timeWib < "23:59:00") {
        m.ucapanWaktu = "Selamat malam" 
    } 
    if (m.timeWib < "19:00:00") { 
        m.ucapanWaktu = "Selamat malam"
    } 
    if (m.timeWib < "18:00:00") { 
        m.ucapanWaktu = "Selamat sore" 
    } 
    if (m.timeWib < "15:00:00") { 
        m.ucapanWaktu = "Selamat siang"
    } 
    if (m.timeWib < "11:00:00") { 
        m.ucapanWaktu = "Selamat pagi"
    } 
    if (m.timeWib < "06:00:00") { 
        m.ucapanWaktu = "Selamat pagi"
    }
    m.mentionedJid = msg.message[m.type]?.contextInfo?.mentionedJid?.length > 0? msg.message[m.type].contextInfo.mentionedJid : []
    m.isMention = m.mentionedJid.length > 0
    m.isNumber = (x) => typeof x === "number" && !isNaN(x)
    m.isBlock = async (x) => (await sock.fetchBlocklist()).includes(x)
    m.isLinkPreview = msg.message[m.type]?.previewType == 0
    m.ownerNumber = Object.keys(config).includes(m.botNumber)? config[m.botNumber].ownerNumber : config.ownerNumber
    m.ownerName = Object.keys(config).includes(m.botNumber)? config[m.botNumber].ownerName : config.ownerName
    m.botName = Object.keys(config).includes(m.botNumber)? config[m.botNumber].botName : config.botName
    m.replyType = Object.keys(config).includes(m.botNumber)? config[m.botNumber].replytype : "mess4"   
    m.setPrefix = Object.keys(config).includes(m.botNumber)? config[m.botNumber].setprefix : "yes"
    m.mode = Object.keys(config).includes(m.botNumber)? config[m.botNumber].mode : "public"
    m.auto = Object.keys(config).includes(m.botNumber)? config[m.botNumber].auto : "unavailable"
    m.autoBlockCmd = Object.keys(config).includes(m.botNumber)? config[m.botNumber].autoblockcmd : false
    m.autoReport = Object.keys(config).includes(m.botNumber)? config[m.botNumber].autoreport : true
    m.autoBio = Object.keys(config).includes(m.botNumber)? config[m.botNumber].autobio : false
    m.autoSticker = Object.keys(config).includes(m.botNumber)? config[m.botNumber].autosticker : false
    m.autoRespon = Object.keys(config).includes(m.botNumber)? config[m.botNumber].autorespon : false
    m.autoRead = Object.keys(config).includes(m.botNumber)? config[m.botNumber].autoread : false
    m.autoVn = Object.keys(config).includes(m.botNumber)? config[m.botNumber].autovn : false
    m.autoLevel = Object.keys(config).includes(m.botNumber)? config[m.botNumber].autolevel : false
    m.antiSpam = Object.keys(config).includes(m.botNumber)? config[m.botNumber].antispam : false
    m.localRead = Object.keys(config).includes(m.botNumber)? config[m.botNumber].local_read : []
    m.localUnread = Object.keys(config).includes(m.botNumber)? config[m.botNumber].local_unread : []
    m.isAntiLink = Object.keys(db.chats).includes(m.chat)? db.chats[m.chat].antilink : false
    m.isAntiLinkYoutube = Object.keys(db.chats).includes(m.chat)? db.chats[m.chat].antilinkyt : false
    m.isAntiLinkFacebook = Object.keys(db.chats).includes(m.chat)? db.chats[m.chat].antilinkfb : false
    m.isAntiLinkInstagram = Object.keys(db.chats).includes(m.chat)? db.chats[m.chat].antilinkig : false
    m.isAntiLinkTelegram = Object.keys(db.chats).includes(m.chat)? db.chats[m.chat].antilinktele : false
    m.isAntiLinkWhatsapp = Object.keys(db.chats).includes(m.chat)? db.chats[m.chat].antilinkwa : false
    m.isAntiLinkTiktok = Object.keys(db.chats).includes(m.chat)? db.chats[m.chat].antilinktiktok : false
    m.isAntiLinkTwitter = Object.keys(db.chats).includes(m.chat)? db.chats[m.chat].antilinktwitter : false
    m.isAntiVirtex = Object.keys(db.chats).includes(m.chat)? db.chats[m.chat].antivirtex : false
    m.isAntiAsing = Object.keys(db.chats).includes(m.chat)? db.chats[m.chat].antiasing : false
    m.isAntiTag = Object.keys(db.chats).includes(m.chat)? db.chats[m.chat].antitag : false
    m.isAntiDelete = Object.keys(db.chats).includes(m.chat)? db.chats[m.chat].antidelete : false
    m.isAntiViewOnce = Object.keys(db.chats).includes(m.chat)? db.chats[m.chat].antiviewonce : false
    m.isAntiToxic = Object.keys(db.chats).includes(m.chat)? db.chats[m.chat].antitoxic : false
    m.isAntiSange = Object.keys(db.chats).includes(m.chat)? db.chats[m.chat].antisange : false
    m.isAntiBotz = Object.keys(db.chats).includes(m.chat)? db.chats[m.chat].antibot : false    
    m.isAutoResponGroup = Object.keys(db.chats).includes(m.chat)? db.chats[m.chat].autorespongc : false
    m.isAutoReactGroup = Object.keys(db.chats).includes(m.chat)? db.chats[m.chat].autoreactgc : false
    m.isBanChat = Object.keys(db.chats).includes(m.chat)? db.chats[m.chat].mute : false
    if (Object.keys(db.expired).includes(m.botNumber)) {
        m.isCreator = [db.devoloper + "@s.whatsapp.net", m.ownerNumber + "@s.whatsapp.net", ...Object.keys(db.expired[m.botNumber].vip)].includes(m.sender)
        m.isOwner = m.isCreator? true : Object.keys(db.expired[m.botNumber].owner).includes(m.sender)
        m.isPremium = m.isOwner? true : Object.keys(db.expired[m.botNumber].premium).includes(m.sender)
        m.isSewa = m.isPremium? true : m.key.fromMe? true : config.vipSewa.includes(m.chat)? true : Object.keys(db.expired[m.botNumber].sewa).includes(m.chat)? true : Object.keys(db.chats).includes(m.chat)? db.chats[m.chat].sewa.status : false
    } else {
        m.isCreator = [db.devoloper + "@s.whatsapp.net", m.ownerNumber + "@s.whatsapp.net"].includes(m.sender)
        m.isOwner = m.isCreator? true : false
        m.isPremium = m.isOwner? true : false
        m.isSewa = m.isPremium? true : config.vipSewa.includes(m.chat)? true :  m.key.fromMe
    }
    m.messageTimestamp = msg.messageTimestamp
    m.message = msg.message
    m.quoted = msg.message[m.type]?.contextInfo?.quotedMessage? {} : false
    if (m.quoted) {
        m.quoted.key = {
            id: msg.message[m.type].contextInfo?.stanzaId || "",
            fromMe: msg.message[m.type].contextInfo?.participant == m.botNumber,
            remoteJid: decodeJid(m.message[m.type].contextInfo?.remoteJid || m.chat || m.sender),
            participant: decodeJid(msg.message[m.type].contextInfo?.participant)
        }
        m.quoted.isBaileys = m.quoted?.key?.id.startsWith("BAE5") && m.quoted?.key?.id.length == 16
        m.quoted.chat = m.quoted.key.remoteJid
        m.quoted.isGroup = m.quoted.chat.endsWith("@g.us")
        m.quoted.sender = m.quoted.key.participant
        m.quoted.senderNumber = m.quoted.key.participant.split("@")[0]
        m.quoted.type = Object.keys(msg.message[m.type].contextInfo.quotedMessage)[0]
        if (["viewOnceMessage","viewOnceMessageV2","documentWithCaptionMessage"].includes(m.quoted.type)) {
            msg.message[m.type].contextInfo.quotedMessage = msg.message[m.type].contextInfo.quotedMessage[m.quoted.type].message
        }
        m.quoted.body = m.quoted.type == "conversation"? msg.message[m.type].contextInfo.quotedMessage.conversation : m.quoted.type == "extendedTextMessage"? msg.message[m.type].contextInfo.quotedMessage.extendedTextMessage.text : m.quoted.type == "imageMessage"? msg.message[m.type].contextInfo.quotedMessage.imageMessage.caption : m.quoted.type == "videoMessage"? msg.message[m.type].contextInfo.quotedMessage.videoMessage.caption : m.quoted.type == "viewOnceMessage"? msg.message[m.type].contextInfo.quotedMessage[getContentType(msg.message[m.type].contextInfo.quotedMessage)]?.caption : m.quoted.type == "viewOnceMessageV2"? msg.message[m.type].contextInfo.quotedMessage[getContentType(msg.message[m.type].contextInfo.quotedMessage)]?.caption : m.quoted.type == "documentMessage"? msg.message[m.type].contextInfo.quotedMessage.documentMessage?.caption : m.quoted.type == "documentWithCaptionMessage"? msg.message[m.type].contextInfo.quotedMessage.documentMessage.caption : m.quoted.type == "pollCreationMessage"? msg.message[m.type].contextInfo.quotedMessage.pollCreationMessage.name : ""
        m.quoted.budy = m.quoted.type == "conversation"? msg.message[m.type].contextInfo.quotedMessage.conversation : m.quoted.type == "extendedTextMessage"? msg.message[m.type].contextInfo.quotedMessage.extendedTextMessage.text : ""
        m.quoted.args = m.quoted.body.trim().split(/ +/).slice(1)
        m.quoted.text = m?.quoted?.args?.join(" ")
        m.quoted.pushName = Object.keys(db.users).includes(m.quoted.sender)? db.users[m.quoted.sender].name : "No Name"
        m.quoted.mentionedJid = msg.message[m.type]?.contextInfo?.quotedMessage?.contextInfo?.mentionedJid?.length > 0? msg.message[m.type].contextInfo.quotedMessage.contextInfo.mentionedJid : []
        m.quoted.isMention = m.quoted.mentionedJid.length > 0
        m.quoted.isNumber = (x) => typeof x === "number" && !isNaN(x)
        m.quoted.isLinkPreview = msg.message[m.type].contextInfo.quotedMessage[m.quoted.type]?.previewType == 0
        if (db && Object.keys(db.expired).includes(m.botNumber)) {
            m.quoted.isCreator = [db.devoloper + "@s.whatsapp.net", m.ownerNumber + "@s.whatsapp.net", ...Object.keys(db.expired[m.botNumber].vip)].includes(m.quoted.sender)
            m.quoted.isOwner = m.isCreator? true : Object.keys(db.expired[m.botNumber].owner).includes(m.quoted.sender)
            m.quoted.isPremium = m.isOwner? true : Object.keys(db.expired[m.botNumber].premium).includes(m.quoted.sender)
            m.quoted.isSewa = m.isPremium? true : m.quoted.key.fromMe? true : config.vipSewa.includes(m.quoted.chat)? true : Object.keys(db.expired[m.botNumber].sewa).includes(m.quoted.chat)? true : Object.keys(db.chats).includes(m.quoted.chat)? db.chats[m.quoted.chat].sewa.status : false
        } else {
            m.quoted.isCreator = [db.devoloper + "@s.whatsapp.net", m.ownerNumber + "@s.whatsapp.net"].includes(m.quoted.sender)
            m.quoted.isOwner = m.isCreator? true : false
            m.quoted.isPremium = m.isOwner? true : false
            m.quoted.isSewa = m.isPremium? true : config.vipSewa.includes(m.quoted.chat)? true : m.quoted.key.fromMe
        }
        m.quoted.message = msg.message[m.type].contextInfo.quotedMessage
    } 
    m.input = m.isMention? m.mentionedJid[0] : m.quoted? m.quoted.sender : m.text != "" && !isNaN(parseFloat(m.text.replace(new RegExp("[()+-/ +/]", "gi"), "")))? parseFloat(m.text.replace(new RegExp("[()+-/ +/]", "gi"), "")) + "@s.whatsapp.net" : false
    m.reply = async (teks, chatId = m.chat, profileID = m.sender, options = { quoted: m }, type = m.replyType) => {
        if (type == "mess1") {
            return sock.sendMessage(chatId, { text: teks, contextInfo: { mentionedJid: [...teks.matchAll(/@(\d{0,16})/g)].map((x) => x[1] + "@s.whatsapp.net"), forwardingScore: 999, isForwarded: true }}, options)
        } else if (type == "mess2") {
            return sock.sendMessage(chatId, { text: teks, contextInfo: { mentionedJid: [...teks.matchAll(/@(\d{0,16})/g)].map((x) => x[1] + "@s.whatsapp.net"), forwardingScore: 10, isForwarded: true }}, options)
        } else if (type == "mess3") {
            return sock.sendMessage(chatId, { text: teks, mentions: [...teks.matchAll(/@(\d{0,16})/g)].map((x) => x[1] + "@s.whatsapp.net") }, options)
        } else if (type == "mess4") {
            try{
                var ppimg = await getBuffer((await sock.profilePictureUrl(profileID, "image"))) 
            } catch {
                var ppimg = await getBuffer("https://raw.githubusercontent.com/Aztecs444/media/Zeck/image/profilePicture.jpg")
            }
            return sock.sendMessage(chatId, { contextInfo: { mentionedJid: [...teks.matchAll(/@(\d{0,16})/g)].map((x) => x[1] + "@s.whatsapp.net"), externalAdReply: { showAdAttribution: true, title: "Hallo kak👋", body: "DONT CLICK HERE", previewType: "PHOTO", thumbnail: ppimg, sourceUrl: "https://wa.me/" + m.ownerNumber }}, text: teks }, options)
        } else if (type == "mess5") {
            try{
                var ppimg = await getBuffer((await sock.profilePictureUrl(profileID, "image"))) 
            } catch {
                var ppimg = await getBuffer("https://raw.githubusercontent.com/Aztecs444/media/Zeck/image/profilePicture.jpg")
            }
            return sock.sendMessage(chatId, { contextInfo: { mentionedJid: [...teks.matchAll(/@(\d{0,16})/g)].map((x) => x[1] + "@s.whatsapp.net"), forwardingScore: 9999, isForwarded: true, externalAdReply: { title: "Hallo kak👋", body: "DONT CLICK HERE", previewType: "PHOTO", thumbnail: ppimg, sourceUrl: "https://wa.me/" + m.ownerNumber }}, text: teks }, options)
        } else if (type == "mess6") {
            try{
                var ppimg = await getBuffer((await sock.profilePictureUrl(profileID, "image"))) 
            } catch {
                var ppimg = await getBuffer("https://raw.githubusercontent.com/Aztecs444/media/Zeck/image/profilePicture.jpg")
            }
            return sock.sendMessage(chatId, { contextInfo: { mentionedJid: [...teks.matchAll(/@(\d{0,16})/g)].map((x) => x[1] + "@s.whatsapp.net"), forwardingScore: 10, isForwarded: true, externalAdReply: { title: "Hallo kak👋", body: "DONT CLICK HERE", previewType: "PHOTO", thumbnail: ppimg, sourceUrl: "https://wa.me/" + m.ownerNumber }}, text: teks }, options)
        } else if (type == "mess7") {
            try{
                var ppimg = await getBuffer((await sock.profilePictureUrl(profileID, "image"))) 
            } catch {
                var ppimg = await getBuffer("https://raw.githubusercontent.com/Aztecs444/media/Zeck/image/profilePicture.jpg")
            }
            return sock.sendMessage(chatId, { contextInfo: { mentionedJid: [...teks.matchAll(/@(\d{0,16})/g)].map((x) => x[1] + "@s.whatsapp.net"), externalAdReply: { title: "Hallo kak👋", body: "DONT CLICK HERE", previewType: "PHOTO", thumbnail: ppimg, sourceUrl: "https://wa.me/" + m.ownerNumber }}, text: teks }, options)
        }
    }
    if (Object.keys(db.users).includes(m.sender) && db.users[m.sender].name !== m.pushName) { db.users[m.sender].name = m.pushName }
    if (Object.keys(db.users).includes(m.sender) && (m.key.fromMe? true : m.isPremium) && db.users[m.sender].level !== "Primordial Glory") { db.users[m.sender].level = "Primordial Glory" }
    if (Object.keys(db.users).includes(m.sender) && (m.key.fromMe? true : m.isPremium) && !isNaN(db.users[m.sender].limit)) { db.users[m.sender].limit = "Unlimited" }
    if (Object.keys(db.users).includes(m.sender) && (m.key.fromMe? true : m.isPremium) && !isNaN(db.users[m.sender].balance)) { db.users[m.sender].balance = "Unlimited" }
    if (Object.keys(db.users).includes(m.sender) && !m.isPremium && db.users[m.sender].level == "Primordial Glory") { db.users[m.sender].level = "Low Tier" }
    if (Object.keys(db.users).includes(m.sender) && !m.isPremium && isNaN(db.users[m.sender].limit)) { db.users[m.sender].limit = config.limitAwal }
    if (Object.keys(db.users).includes(m.sender) && !m.isPremium && isNaN(db.users[m.sender].balance)) { db.users[m.sender].balance = 0 }
//=================================================//
    if (m.autoBio) sock.updateProfileStatus(`${runtime(process.uptime())}`)
    if (m.autoRead && !m.localUnread.includes(m.chat) || m.localRead.includes(m.chat)) {
        sock.readMessages([m.key])
    }
    if (m.auto == "recording") {        
        sock.sendPresenceUpdate("recording", m.chat)
    } else if (m.auto == "typing") {        
        sock.sendPresenceUpdate("composing", m.chat)
    } else if (m.auto == "available") {        
        sock.sendPresenceUpdate("available", m.chat)
    } else if (m.auto == "unavailable") {        
        sock.sendPresenceUpdate("unavailable", m.chat)
    }
//=================================================//
    if (Object.keys(db.expired).includes(m.botNumber)) {
        for (let x of Object.keys(db.expired[m.botNumber].owner)) {
            if (Date.now() >= db.expired[m.botNumber].owner[x].expired) {
                delete db.expired[m.botNumber].owner[x]
                if (!m.isBlock(x)) m.reply("Waktu menjadi owner kamu telah habis", x, x, {}) 
            }
        }
    }
//=================================================//
    if (Object.keys(db.expired).includes(m.botNumber)) {
        for (let x of Object.keys(db.expired[m.botNumber].premium)) {
            if (Date.now() >= db.expired[m.botNumber].premium[x].expired) {
                delete db.expired[m.botNumber].premium[x]
                if (!m.isBlock(x)) m.reply("Waktu menjadi premium kamu telah habis", x, x, {}) 
            }
        }
    }
//=================================================//
    if (!config.vipSewa.includes(m.chat) && Object.keys(db.chats).includes(m.chat) && db.chats[m.chat].sewa.status) {
        if (Object.keys(db.expired[m.botNumber].sewa).includes(m.chat)) {
            db.chats[m.chat].sewa = { status: false, date: calender, expired: 0 }
        } else {
            if (Date.now() >= db.chats[m.chat].sewa.expired) {
                if (Object.keys(store.messages).includes(m.chat)) store.messages[m.chat].clear()
                if (db.chats[m.chat].antilink) db.chats[m.chat].antilink = false
                if (db.chats[m.chat].antilinkyt) db.chats[m.chat].antilinkyt = false
                if (db.chats[m.chat].antilinkfb) db.chats[m.chat].antilinkfb = false
                if (db.chats[m.chat].antilinkig) db.chats[m.chat].antilinkig = false
                if (db.chats[m.chat].antilinktele) db.chats[m.chat].antilinktele = false
                if (db.chats[m.chat].antilinkwa) db.chats[m.chat].antilinkwa = false
                if (db.chats[m.chat].antilinktiktok) db.chats[m.chat].antilinktiktok = false
                if (db.chats[m.chat].antilinktwitter) db.chats[m.chat].antilinktwitter = false
                if (db.chats[m.chat].antivirtex) db.chats[m.chat].antivirtex = false
                if (db.chats[m.chat].antiasing) db.chats[m.chat].antiasing = false
                if (db.chats[m.chat].antitag) db.chats[m.chat].antitag = false
                if (db.chats[m.chat].antidelete) db.chats[m.chat].antidelete = false
                if (db.chats[m.chat].antiviewonce) db.chats[m.chat].antiviewonce = false
                if (db.chats[m.chat].antitoxic) db.chats[m.chat].antitoxic = false
                if (db.chats[m.chat].antisange) db.chats[m.chat].antisange = false
                if (db.chats[m.chat].antibot) db.chats[m.chat].antibot = false
                if (db.chats[m.chat].autorespongc) db.chats[m.chat].autorespongc = false
                if (db.chats[m.chat].autoreactgc) db.chats[m.chat].autoreactgc = false
                if (db.chats[m.chat].mute) db.chats[m.chat].mute = false
                if (db.chats[m.chat].welcome) db.chats[m.chat].welcome = false
                if (db.chats[m.chat].afk_group.length > 0) Object.keys(db.chats[m.chat].afk_group).forEach((x) => { db.chats[m.chat].afk_group.splice(db.chats[m.chat].afk_group[x], 1) })
                db.chats[m.chat].sewa = { status: false, date: calender, expired: 0 }
                m.reply("Waktu sewa group ini telah habis")
            }
        }
    } else if (Object.keys(db.expired).includes(m.botNumber)) {
        for (let x of Object.keys(db.expired[m.botNumber].sewa)) {
            if (!config.vipSewa.includes(x) && Date.now() >= db.expired[m.botNumber].sewa[x].expired) {
                if (Object.keys(store.messages).includes(x)) store.messages[x].clear() 
                if (Object.keys(db.chats).includes(x)) {                
                    if (db.chats[x].antilink) db.chats[x].antilink = false
                    if (db.chats[x].antilinkyt) db.chats[x].antilinkyt = false
                    if (db.chats[x].antilinkfb) db.chats[x].antilinkfb = false
                    if (db.chats[x].antilinkig) db.chats[x].antilinkig = false
                    if (db.chats[x].antilinktele) db.chats[x].antilinktele = false
                    if (db.chats[x].antilinkwa) db.chats[x].antilinkwa = false
                    if (db.chats[x].antilinktiktok) db.chats[x].antilinktiktok = false
                    if (db.chats[x].antilinktwitter) db.chats[x].antilinktwitter = false
                    if (db.chats[x].antivirtex) db.chats[x].antivirtex = false
                    if (db.chats[x].antiasing) db.chats[x].antiasing = false
                    if (db.chats[x].antitag) db.chats[x].antitag = false
                    if (db.chats[x].antidelete) db.chats[x].antidelete = false
                    if (db.chats[x].antiviewonce) db.chats[x].antiviewonce = false
                    if (db.chats[x].antitoxic) db.chats[x].antitoxic = false
                    if (db.chats[x].antisange) db.chats[x].antisange = false
                    if (db.chats[x].antibot) db.chats[x].antibot = false
                    if (db.chats[x].autorespongc) db.chats[x].autorespongc = false
                    if (db.chats[x].autoreactgc) db.chats[x].autoreactgc = false
                    if (db.chats[x].mute) db.chats[x].mute = false
                    if (db.chats[x].welcome) db.chats[x].welcome = false
                    if (db.chats[x].afk_group.length > 0) Object.keys(db.chats[x].afk_group).forEach((v) => { db.chats[x].afk_group.splice(db.chats[x].afk_group[v], 1) })
                }
                if (Object.keys(store.messages).includes(x)) store.messages[x].clear() 
                delete db.expired[m.botNumber].sewa[x]
                m.reply("Waktu sewa group ini telah habis", x, x, {}) 
            }
        }
    }
//=================================================//
    if (m.autoLevel && !m.key.fromMe && !m.isPremium) {
        if (db.users[m.sender].xp == 3) {
            const levelRole = "Warrior III"
            const levelRoleSebelum = "Low Tier"
            const limitNumber = randomNomor(10)
            if (db.users[m.sender].level !== "Primordial Glory") {
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${m.timeWib}`
                m.reply(teks)
            }
        } else if (db.users[m.sender].xp == 6) {
            const levelRole = "Warrior II"
            const levelRoleSebelum = "Warrior III"
            const limitNumber = randomNomor(15)
            if (db.users[m.sender].level !== "Primordial Glory") {
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${m.timeWib}`
                m.reply(teks)
            }
        } else if (db.users[m.sender].xp == 9) {
            const levelRole = "Warrior I"
            const levelRoleSebelum = "Warrior I1"
            const limitNumber = randomNomor(20)
            if (db.users[m.sender].level !== "Primordial Glory") {
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${m.timeWib}`
                m.reply(teks)
            }
        } else if (db.users[m.sender].xp == 12) {
            const levelRole = "Elite III"
            const levelRoleSebelum = "Warrior I"
            const limitNumber = randomNomor(25)
            if (db.users[m.sender].level !== "Primordial Glory") {
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${m.timeWib}`
                m.reply(teks)
            }
        } else if (db.users[m.sender].xp == 16) {
            const levelRole = "Elite II"
            const levelRoleSebelum = "Elite III"
            const limitNumber = randomNomor(30)
            if (db.users[m.sender].level !== "Primordial Glory") {
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${m.timeWib}`
                m.reply(teks)
            }
        } else if (db.users[m.sender].xp == 20) {
            const levelRole = "Elite I"
            const levelRoleSebelum = "Elite II"
            const limitNumber = randomNomor(35)
            if (db.users[m.sender].level !== "Primordial Glory") {
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${m.timeWib}`
                m.reply(teks)
            }
        } else if (db.users[m.sender].xp == 24) {
            const levelRole = "Master IV"
            const levelRoleSebelum = "Elite I"
            const limitNumber = randomNomor(40)
            if (db.users[m.sender].level !== "Primordial Glory") {
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${m.timeWib}`
                m.reply(teks)
            }
        } else if (db.users[m.sender].xp == 29) {
            const levelRole = "Master III"
            const levelRoleSebelum = "Master IV"
            const limitNumber = randomNomor(45)
            if (db.users[m.sender].level !== "Primordial Glory") {
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${m.timeWib}`
                m.reply(teks)
            }
        } else if (db.users[m.sender].xp == 34) {
            const levelRole = "Master II"
            const levelRoleSebelum = "Master III"
            const limitNumber = randomNomor(50)
            if (db.users[m.sender].level !== "Primordial Glory") {
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${m.timeWib}`
                m.reply(teks)
            }
        } else if (db.users[m.sender].xp == 39) {
            const levelRole = "Master I"
            const levelRoleSebelum = "Master II"
            const limitNumber = randomNomor(55)
            if (db.users[m.sender].level !== "Primordial Glory") {
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${m.timeWib}`
                m.reply(teks)
            }
        } else if (db.users[m.sender].xp == 44) {
            const levelRole = "GrandMaster V"
            const levelRoleSebelum = "Master I"
            const limitNumber = randomNomor(60)
            if (db.users[m.sender].level !== "Primordial Glory") {
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${m.timeWib}`
                m.reply(teks)
            }
        } else if (db.users[m.sender].xp == 50) {
            const levelRole = "GrandMaster IV"
            const levelRoleSebelum = "GrandMaster V"
            const limitNumber = randomNomor(65)
            if (db.users[m.sender].level !== "Primordial Glory") {
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${m.timeWib}`
                m.reply(teks)
            }
        } else if (db.users[m.sender].xp == 56) {
            const levelRole = "GrandMaster III"
            const levelRoleSebelum = "GrandMaster IV"
            const limitNumber = randomNomor(70) 
            if (db.users[m.sender].level !== "Primordial Glory") {
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${m.timeWib}`
                m.reply(teks)
            }
        } else if (db.users[m.sender].xp == 62) {
            const levelRole = "GrandMaster II"
            const levelRoleSebelum = "GrandMaster III"
            const limitNumber = randomNomor(75)
            if (db.users[m.sender].level !== "Primordial Glory") {
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${m.timeWib}`
                m.reply(teks)
            }
        } else if (db.users[m.sender].xp == 68) {
            const levelRole = "GrandMaster I"
            const levelRoleSebelum = "GrandMaster II"
            const limitNumber = randomNomor(80)
            if (db.users[m.sender].level !== "Primordial Glory") {
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${m.timeWib}`
                m.reply(teks)
            }
        } else if (db.users[m.sender].xp == 74) {
            const levelRole = "Epic V"
            const levelRoleSebelum = "GrandMaster I"
            const limitNumber = randomNomor(85)
            if (db.users[m.sender].level !== "Primordial Glory") {
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${m.timeWib}`
                m.reply(teks)
            }
        } else if (db.users[m.sender].xp == 81) {
            const levelRole = "Epic IV"
            const levelRoleSebelum = "Epic V"
            const limitNumber = randomNomor(90)
            if (db.users[m.sender].level !== "Primordial Glory") {
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${m.timeWib}`
                m.reply(teks)
            }
        } else if (db.users[m.sender].xp == 88) {
            const levelRole = "Epic III"
            const levelRoleSebelum = "Epic IV"
            const limitNumber = randomNomor(95)
            if (db.users[m.sender].level !== "Primordial Glory") {
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${m.timeWib}`
                m.reply(teks)
            }
        } else if (db.users[m.sender].xp == 95) {
            const levelRole = "Epic II"
            const levelRoleSebelum = "Epic III"
            const limitNumber = randomNomor(100)
            if (db.users[m.sender].level !== "Primordial Glory") {
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${m.timeWib}`
                m.reply(teks)
            }
        } else if (db.users[m.sender].xp == 102) {
            const levelRole = "Epic I"
            const levelRoleSebelum = "Epic II"
            const limitNumber = randomNomor(105)
            if (db.users[m.sender].level !== "Primordial Glory") {
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${m.timeWib}`
                m.reply(teks)
            }
        } else if (db.users[m.sender].xp == 109) {
            const levelRole = "Legend V"
            const levelRoleSebelum = "Epic I"
            const limitNumber = randomNomor(110)
            if (db.users[m.sender].level !== "Primordial Glory") {
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${m.timeWib}`
                m.reply(teks)
            }
        } else if (db.users[m.sender].xp == 117) {
            const levelRole = "Legend IV"
            const levelRoleSebelum = "Legend V"
            const limitNumber = randomNomor(115)
            if (db.users[m.sender].level !== "Primordial Glory") {
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${m.timeWib}`
                m.reply(teks)
            }
        } else if (db.users[m.sender].xp == 125) {
            const levelRole = "Legend III"
            const levelRoleSebelum = "Legend IV"
            const limitNumber = randomNomor(120)
            if (db.users[m.sender].level !== "Primordial Glory") {
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${m.timeWib}`
                m.reply(teks)
            }
        } else if (db.users[m.sender].xp == 133) {
            const levelRole = "Legend II"
            const levelRoleSebelum = "Legend III"
            const limitNumber = randomNomor(125)
            if (db.users[m.sender].level !== "Primordial Glory") {
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${m.timeWib}`
                m.reply(teks)
            }
        } else if (db.users[m.sender].xp == 141) {
            const levelRole = "Legend I"
            const levelRoleSebelum = "Legend II"
            const limitNumber = randomNomor(130) 
            if (db.users[m.sender].level !== "Primordial Glory") {
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${m.timeWib}`
                m.reply(teks)
            }
        } else if (db.users[m.sender].xp == 149) {
            const levelRole = "Mythic V"
            const levelRoleSebelum = "Legend I"
            const limitNumber = randomNomor(135)
            if (db.users[m.sender].level !== "Primordial Glory") {
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${m.timeWib}`
                m.reply(teks)
            }
        } else if (db.users[m.sender].xp == 158) {
            const levelRole = "Mythic IV"
            const levelRoleSebelum = "Mythic V"
            const limitNumber = randomNomor(140)
            if (db.users[m.sender].level !== "Primordial Glory") {
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${m.timeWib}`
                m.reply(teks)
            }
        } else if (db.users[m.sender].xp == 167) {
            const levelRole = "Mythic III"
            const levelRoleSebelum = "Mythic IV"
            const limitNumber = randomNomor(145)
            if (db.users[m.sender].level !== "Primordial Glory") {
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${m.timeWib}`
                m.reply(teks)
            }
        } else if (db.users[m.sender].xp == 176) {
            const levelRole = "Mythic II"
            const levelRoleSebelum = "Mythic III"
            const limitNumber = randomNomor(150)
            if (db.users[m.sender].level !== "Primordial Glory") {
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${m.timeWib}`
                m.reply(teks)
            }
        } else if (db.users[m.sender].xp == 185) {
            const levelRole = "Mythic I"
            const levelRoleSebelum = "Mythic II"
            const limitNumber = randomNomor(155)
            if (db.users[m.sender].level !== "Primordial Glory") {
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${m.timeWib}`
                m.reply(teks)
            }
        } else if (db.users[m.sender].xp == 194) {
            const levelRole = "Mythical Glory"
            const levelRoleSebelum = "Mythic I"
            const limitNumber = randomNomor(160)
            if (db.users[m.sender].level !== "Primordial Glory") {
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${m.timeWib}`
                m.reply(teks)
            }
        } else {
            const levelRole = "Primordial Glory"
            const levelRoleSebelum = "Mythical Glory"
            const limitNumber = randomNomor(165)
            if (db.users[m.sender].level !== "Primordial Glory") {
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${m.timeWib}`
                m.reply(teks)
            }
        }
    } 


    return m
}






let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})