const fs = require("fs")
const chalk = require("chalk")
const config = require("@config")
const { decodeJid, getBuffer } = require("@libs/function")

module.exports = async(sock, json) => {
const botNumber = decodeJid(sock.user.id)
const ownerNumber = Object.keys(config).includes(botNumber)? config[botNumber].ownerNumber : config.ownerNumber
const callerId = json.content[0].attrs['call-creator']
const replyType = Object.keys(config).includes(botNumber)? config[botNumber].replytype : "web1"
const antiCall = Object.keys(config).includes(botNumber)? config[botNumber].anticall : false

const setReply = async (chatId, teks) => {
if (replyType == "mess1") {
return sock.sendMessage(chatId, { text: teks, contextInfo: { mentionedJid: [...teks.matchAll(/@(\d{0,16})/g)].map((x) => x[1] + "@s.whatsapp.net"), forwardingScore: 999, isForwarded: true }})
} else if (replyType == "mess2") {
return sock.sendMessage(chatId, { text: teks, contextInfo: { mentionedJid: [...teks.matchAll(/@(\d{0,16})/g)].map((x) => x[1] + "@s.whatsapp.net"), forwardingScore: 10, isForwarded: true }})
} else if (replyType == "mess3") {
return sock.sendMessage(chatId, { text: teks, mentions: [...teks.matchAll(/@(\d{0,16})/g)].map((x) => x[1] + "@s.whatsapp.net") })
} else if (replyType == "mess4") {
try{
var ppimg = await getBuffer((await sock.profilePictureUrl(callerId, "image"))) 
} catch {
var ppimg = await getBuffer("https://raw.githubusercontent.com/Aztecs444/media/Zeck/image/profilePicture.jpg")
}
return sock.sendMessage(chatId, { contextInfo: { mentionedJid: [...teks.matchAll(/@(\d{0,16})/g)].map((x) => x[1] + "@s.whatsapp.net"), externalAdReply: { showAdAttribution: true, title: "CALLING MESSAGE", body: "DONT CLICK HERE", previewType: "PHOTO", thumbnail: ppimg, sourceUrl: "https://wa.me/" + ownerNumber }}, text: teks })
} else if (replyType == "mess5") {
try{
var ppimg = await getBuffer((await sock.profilePictureUrl(callerId, "image"))) 
} catch {
var ppimg = await getBuffer("https://raw.githubusercontent.com/Aztecs444/media/Zeck/image/profilePicture.jpg")
}
return sock.sendMessage(chatId, { contextInfo: { mentionedJid: [...teks.matchAll(/@(\d{0,16})/g)].map((x) => x[1] + "@s.whatsapp.net"), forwardingScore: 9999, isForwarded: true, externalAdReply: { title: "CALLING MESSAGE", body: "DONT CLICK HERE", previewType: "PHOTO", thumbnail: ppimg, sourceUrl: "https://wa.me/" + ownerNumber }}, text: teks })
} else if (replyType == "mess6") {
try{
var ppimg = await getBuffer((await sock.profilePictureUrl(callerId, "image"))) 
} catch {
var ppimg = await getBuffer("https://raw.githubusercontent.com/Aztecs444/media/Zeck/image/profilePicture.jpg")
}
return sock.sendMessage(chatId, { contextInfo: { mentionedJid: [...teks.matchAll(/@(\d{0,16})/g)].map((x) => x[1] + "@s.whatsapp.net"), forwardingScore: 10, isForwarded: true, externalAdReply: { title: "CALLING MESSAGE", body: "DONT CLICK HERE", previewType: "PHOTO", thumbnail: ppimg, sourceUrl: "https://wa.me/" + ownerNumber }}, text: teks })
} else if (replyType == "mess7") {
try{
var ppimg = await getBuffer((await sock.profilePictureUrl(callerId, "image"))) 
} catch {
var ppimg = await getBuffer("https://raw.githubusercontent.com/Aztecs444/media/Zeck/image/profilePicture.jpg")
}
return sock.sendMessage(chatId, { contextInfo: { mentionedJid: [...teks.matchAll(/@(\d{0,16})/g)].map((x) => x[1] + "@s.whatsapp.net"), externalAdReply: { title: "CALLING MESSAGE", body: "DONT CLICK HERE", previewType: "PHOTO", thumbnail: ppimg, sourceUrl: "https://wa.me/" + ownerNumber }}, text: teks })
}}




if (antiCall && json.content[0].tag == "offer") {
if (callerId.split("@")[0] == ownerNumber) return
if (callerId.split("@")[0] == db.devoloper) return
setTimeout(() => {
sock.updateBlockStatus(callerId, "block")
}, 3000)
setTimeout(() => {
setReply(ownerNumber + "@s.whatsapp.net", `Terdeteksi @${callerId.split("@")[0]} telah menelpon bot`)
}, 1000)
setReply(callerId, "Sistem otomatis block!\nJangan menelpon bot!\nSilahkan hubungi https://wa.me/" + ownerNumber)
}}



let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})