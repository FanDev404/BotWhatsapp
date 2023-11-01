const fs = require("fs")
const chalk = require("chalk")
const moment = require("moment-timezone") 
const config = require("@config")

const { decodeJid, getBuffer } = require("@libs/function")

module.exports = async(sock, anu) => {
try{

const from = anu.id
const botNumber = decodeJid(sock.user.id)
const sender = anu.participants[0]
const senderNumber = sender.split("@")[0]
const ownerNumber = Object.keys(config).includes(botNumber)? config[botNumber].ownerNumber : config.ownerNumber

const groupMetadata = await sock.groupMetadata(from)
const groupName = groupMetadata.subject  
const groupDesc = groupMetadata.desc !== undefined? groupMetadata.desc : ""
const replyType = Object.keys(config).includes(botNumber)? config[botNumber].replytype : "mess1"
const welcomeType = Object.keys(db.chats).includes(from)? db.chats[from].welcometype : "text"
const isMe = sender.includes(botNumber)
const isWelcome = Object.keys(db.chats).includes(from)? db.chats[from].welcome : false
const isAdd = anu.action == "add" 
const isRemove = anu.action == "remove"
const isPromote = anu.action == "promote"
const isDemote = anu.action == "demote"
if (Object.keys(db.chats).includes(from) && db.chats[from].setwelcome[anu.action] !== "" && db.chats[from].setwelcome[anu.action].includes("{groupName}") && db.chats[from].setwelcome[anu.action].includes("{users}") && db.chats[from].setwelcome[anu.action].includes("{desc}")) {
const teks1 = db.chats[from].setwelcome[anu.action].split("{groupName}")
if (teks1.length == 4) {
var teks2 = teks1[0] + groupName + teks1[1] + groupName + teks1[2] + groupName + teks1[3]
} else if (teks1.length == 3) {
var teks2 = teks1[0] + groupName + teks1[1] + groupName + teks1[2]
} else {
var teks2 = teks1[0] + groupName + teks1[1]
}
const teks3 = teks2.split("{users}")
if (teks3.length == 4) {
var teks4 = teks3[0] + senderNumber + teks3[1] + senderNumber + teks3[2] + senderNumber + teks3[3]
} else if (teks3.length == 3) {
var teks4 = teks3[0] + senderNumber + teks3[1] + senderNumber + teks3[2]
} else {
var teks4 = teks3[0] + senderNumber + teks3[1]
}
const teks5 = teks4.split("{desc}")
var teksWelcome = teks5[0] + groupDesc + teks5[1]
} else if (Object.keys(db.chats).includes(from) && db.chats[from].setwelcome[anu.action] !== "" && db.chats[from].setwelcome[anu.action].includes("{groupName}") && db.chats[from].setwelcome[anu.action].includes("{users}")) {
const teks1 = db.chats[from].setwelcome[anu.action].split("{groupName}")
if (teks1.length == 4) {
var teks2 = teks1[0] + groupName + teks1[1] + groupName + teks1[2] + groupName + teks1[3]
} else if (teks1.length == 3) {
var teks2 = teks1[0] + groupName + teks1[1] + groupName + teks1[2]
} else {
var teks2 = teks1[0] + groupName + teks1[1]
}
const teks3 = teks2.split("{users}")
if (teks3.length == 4) {
var teks4 = teks3[0] + senderNumber + teks3[1] + senderNumber + teks3[2] + senderNumber + teks3[3]
} else if (teks3.length == 3) {
var teks4 = teks3[0] + senderNumber + teks3[1] + senderNumber + teks3[2]
} else {
var teks4 = teks3[0] + senderNumber + teks3[1]
}
var teksWelcome = teks4
} else if (Object.keys(db.chats).includes(from) && db.chats[from].setwelcome[anu.action] !== "" && db.chats[from].setwelcome[anu.action].includes("{groupName}")) {
const teks1 = db.chats[from].setwelcome[anu.action].split("{groupName}")
if (teks1.length == 4) {
var teks2 = teks1[0] + groupName + teks1[1] + groupName + teks1[2] + groupName + teks1[3]
} else if (teks1.length == 3) {
var teks2 = teks1[0] + groupName + teks1[1] + groupName + teks1[2]
} else {
var teks2 = teks1[0] + groupName + teks1[1]
}
var teksWelcome = teks2
} else if (Object.keys(db.chats).includes(from) && db.chats[from].setwelcome[anu.action] !== "" && db.chats[from].setwelcome[anu.action].includes("{users}")) {
const teks1 = db.chats[from].setwelcome[anu.action].split("{users}")
if (teks1.length == 4) {
var teks2 = teks1[0] + senderNumber + teks1[1] + senderNumber + teks1[2] + senderNumber + teks1[3]
} else if (teks1.length == 3) {
var teks2 = teks1[0] + senderNumber + teks1[1] + senderNumber + teks1[2]
} else {
var teks2 = teks1[0] + senderNumber + teks1[1]
}
var teksWelcome = teks2
} else if (Object.keys(db.chats).includes(from) && db.chats[from].setwelcome[anu.action] !== "") {
var teksWelcome = db.chats[from].setwelcome[anu.action]
}









const setReply = async (teks, chatId = from) => {
if (welcomeType == "image") {
try{
var ppimg = await sock.profilePictureUrl(sender, "image")
} catch {
var ppimg = "https://raw.githubusercontent.com/Aztecs444/media/Zeck/image/profilePicture.jpg"
}
const thumbnail = await getBuffer(ppimg)
return sock.sendMessage(chatId, { image: thumbnail, caption: teks, mentions: [...teks.matchAll(/@(\d{0,16})/g)].map((x) => x[1] + "@s.whatsapp.net") })
} else if (welcomeType == "context") {
try{
var ppimg = await sock.profilePictureUrl(sender, "image")
} catch {
var ppimg = "https://raw.githubusercontent.com/Aztecs444/media/Zeck/image/profilePicture.jpg"
}
const thumbnail = await getBuffer(ppimg)
return sock.sendMessage(chatId, { text: teks, contextInfo: { mentionedJid: [...teks.matchAll(/@(\d{0,16})/g)].map((x) => x[1] + "@s.whatsapp.net"), externalAdReply: { showAdAttribution: true, title: `hallo kak👋 ${senderNumber}`, body: "DONT CLICK HERE", mediaType: 1, renderLargerThumbnail: true, thumbnail, sourceUrl: `https://wa.me/${senderNumber}` }}})

} else {
if (replyType == "mess1") {
return sock.sendMessage(chatId, { text: teks, contextInfo: { mentionedJid: [...teks.matchAll(/@(\d{0,16})/g)].map((x) => x[1] + "@s.whatsapp.net"), forwardingScore: 999, isForwarded: true }})
} else if (replyType == "mess2") {
return sock.sendMessage(chatId, { text: teks, contextInfo: { mentionedJid: [...teks.matchAll(/@(\d{0,16})/g)].map((x) => x[1] + "@s.whatsapp.net"), forwardingScore: 10, isForwarded: true }})
} else if (replyType == "mess3") {
return sock.sendMessage(chatId, { text: teks, mentions: [...teks.matchAll(/@(\d{0,16})/g)].map((x) => x[1] + "@s.whatsapp.net") })
} else if (replyType == "mess4") {
try{
var ppimg = await getBuffer((await sock.profilePictureUrl(sender, "image"))) 
} catch {
var ppimg = await getBuffer("https://raw.githubusercontent.com/Aztecs444/media/Zeck/image/profilePicture.jpg")
}
return sock.sendMessage(chatId, { contextInfo: { mentionedJid: [...teks.matchAll(/@(\d{0,16})/g)].map((x) => x[1] + "@s.whatsapp.net"), externalAdReply: { showAdAttribution: true, title: "GROUP UPDATE MESSAGE", body: "DONT CLICK HERE", previewType: "PHOTO", thumbnail: ppimg, sourceUrl: "https://wa.me/" + ownerNumber }}, text: teks })
} else if (replyType == "mess5") {
try{
var ppimg = await getBuffer((await sock.profilePictureUrl(sender, "image"))) 
} catch {
var ppimg = await getBuffer("https://raw.githubusercontent.com/Aztecs444/media/Zeck/image/profilePicture.jpg")
}
return sock.sendMessage(chatId, { contextInfo: { mentionedJid: [...teks.matchAll(/@(\d{0,16})/g)].map((x) => x[1] + "@s.whatsapp.net"), forwardingScore: 9999, isForwarded: true, externalAdReply: { title: "GROUP UPDATE MESSAGE", body: "DONT CLICK HERE", previewType: "PHOTO", thumbnail: ppimg, sourceUrl: "https://wa.me/" + ownerNumber }}, text: teks })
} else if (replyType == "mess6") {
try{
var ppimg = await getBuffer((await sock.profilePictureUrl(sender, "image"))) 
} catch {
var ppimg = await getBuffer("https://raw.githubusercontent.com/Aztecs444/media/Zeck/image/profilePicture.jpg")
}
return sock.sendMessage(chatId, { contextInfo: { mentionedJid: [...teks.matchAll(/@(\d{0,16})/g)].map((x) => x[1] + "@s.whatsapp.net"), forwardingScore: 10, isForwarded: true, externalAdReply: { title: "GROUP UPDATE MESSAGE", body: "DONT CLICK HERE", previewType: "PHOTO", thumbnail: ppimg, sourceUrl: "https://wa.me/" + ownerNumber }}, text: teks })
} else if (replyType == "mess7") {
try{
var ppimg = await getBuffer((await sock.profilePictureUrl(sender, "image"))) 
} catch {
var ppimg = await getBuffer("https://raw.githubusercontent.com/Aztecs444/media/Zeck/image/profilePicture.jpg")
}
return sock.sendMessage(chatId, { contextInfo: { mentionedJid: [...teks.matchAll(/@(\d{0,16})/g)].map((x) => x[1] + "@s.whatsapp.net"), externalAdReply: { title: "GROUP UPDATE MESSAGE", body: "DONT CLICK HERE", previewType: "PHOTO", thumbnail: ppimg, sourceUrl: "https://wa.me/" + ownerNumber }}, text: teks })
}}}








if (isWelcome && isAdd && !isMe && db.chats[from].setwelcome[anu.action] !== "") {
setReply(teksWelcome)
console.log(chalk.whiteBright("├"), chalk.keyword("blue")("[ GROUP UPDATE ]"), `${senderNumber} telah bergabung ke group ${groupName}`)
} else if (isWelcome && isRemove && !isMe && db.chats[from].setwelcome[anu.action] !== "") {
setReply(teksWelcome)
console.log(chalk.whiteBright("├"), chalk.keyword("blue")("[ GROUP UPDATE ]"), `${senderNumber} telah keluar dari group ${groupName}`)
} else if (isWelcome && isPromote && !isMe && db.chats[from].setwelcome[anu.action] !== "") {
setReply(teksWelcome)
console.log(chalk.whiteBright("├"), chalk.keyword("blue")("[ GROUP UPDATE ]"), `${senderNumber} telah di promote`)
} else if (isWelcome && isDemote && !isMe && db.chats[from].setwelcome[anu.action] !== "") {
setReply(teksWelcome)
console.log(chalk.whiteBright("├"), chalk.keyword("blue")("[ GROUP UPDATE ]"), `${senderNumber} telah di demote`)
}







  
} catch (err) {
let e = String(err)
if (e.includes("this.isZero")) return
if (e.includes("rate-overlimit")) return
if (e.includes("Connection Closed")) return
if (e.includes("Timed Out")) return
if (e.includes("Value not found")) return
console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ ERROR ]"), `${err}`)
}}







let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})