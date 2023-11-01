const { calender } = require("@libs/function")
const config = require("@config")
const fs = require("fs") 
const chalk = require("chalk")
const toMs = require("ms")
const axios = require("axios")
const loadDatabase = (m) => {
try{
//================================================================\\
if (Object.keys(db.expired).includes(m.botNumber)) {
if (!("owner" in db.expired[m.botNumber])) db.expired[m.botNumber].owner = {}
if (!("premium" in db.expired[m.botNumber])) db.expired[m.botNumber].premium = {}
if (!("sewa" in db.expired[m.botNumber])) db.expired[m.botNumber].sewa = {}
if (!("vip" in db.expired[m.botNumber])) db.expired[m.botNumber].vip = {}
} else db.expired[m.botNumber] = {
owner: {}, 
premium: {}, 
sewa: {}, 
vip: {}, 
}
//================================================================\\
if (m.isGroup && Object.keys(db.chats).includes(m.chat)) {
if (!("antilink" in db.chats[m.chat])) db.chats[m.chat].antilink = false
if (!("antilinkyt" in db.chats[m.chat])) db.chats[m.chat].antilinkyt = false
if (!("antilinkfb" in db.chats[m.chat])) db.chats[m.chat].antilinkfb = false
if (!("antilinkig" in db.chats[m.chat])) db.chats[m.chat].antilinkig = false
if (!("antilinktele" in db.chats[m.chat])) db.chats[m.chat].antilinktele = false
if (!("antilinkwa" in db.chats[m.chat])) db.chats[m.chat].antilinkwa = false
if (!("antilinktiktok" in db.chats[m.chat])) db.chats[m.chat].antilinktiktok = false
if (!("antilinktwitter" in db.chats[m.chat])) db.chats[m.chat].antilinktwitter = false
if (!("antivirtex" in db.chats[m.chat])) db.chats[m.chat].antivirtex = false
if (!("antiasing" in db.chats[m.chat])) db.chats[m.chat].antiasing = false
if (!("antitag" in db.chats[m.chat])) db.chats[m.chat].antitag = false
if (!("antidelete" in db.chats[m.chat])) db.chats[m.chat].antidelete = false
if (!("antiviewonce" in db.chats[m.chat])) db.chats[m.chat].antiviewonce = false
if (!("antitoxic" in db.chats[m.chat])) db.chats[m.chat].antitoxic = false
if (!("antisange" in db.chats[m.chat])) db.chats[m.chat].antisange = false
if (!("antibot" in db.chats[m.chat])) db.chats[m.chat].antibot = false
if (!("autorespongc" in db.chats[m.chat])) db.chats[m.chat].autorespongc = false
if (!("autoreactgc" in db.chats[m.chat])) db.chats[m.chat].autoreactgc = false
if (!("mute" in db.chats[m.chat])) db.chats[m.chat].mute = false
if (!("welcome" in db.chats[m.chat])) db.chats[m.chat].welcome = false
if (!("rord" in db.chats[m.chat])) db.chats[m.chat].rord = { antilink: "delete", antilinkyt: "delete", antilinkfb: "delete", antilinkig: "delete", antilinktele: "delete", antilinkwa: "delete", antilinktiktok: "delete", antilinktwitter: "delete", antivirtex: "delete", antitag: "delete", antitoxic: "delete", antisange: "delete" }
if (!("welcometype" in db.chats[m.chat])) db.chats[m.chat].welcometype = "text"
if (!("sewa" in db.chats[m.chat])) db.chats[m.chat].sewa = { status: true, date: calender, expired: Date.now() + toMs("1days") }
if (!("afk_group" in db.chats[m.chat])) db.chats[m.chat].afk_group = []
if (!("local_mute" in db.chats[m.chat])) db.chats[m.chat].local_mute = []
if (!("setwelcome" in db.chats[m.chat])) db.chats[m.chat].setwelcome = { add: "SELAMAT DATANG DI GRPUP\nJANGAN LUPA INTRO\n\nNAMA :\nUMUR :\nASAL KOTA :\n", remove: "YHHH ADA YANG KELUAR GRPUP 😭", promote: "CIEE YANG BARU JADI ADMIN GROUP", demote: "CIEE YANG BARU JADI MEMBER GROUP" }
if (!("store" in db.chats[m.chat])) db.chats[m.chat].store = { pay: { text: "", isImage: "" }, isImage: "", proses: "", done: "", key: {} }
if (isNaN(db.chats[m.chat].limit)) db.chats[m.chat].limit = 200
} else if (m.isGroup) db.chats[m.chat] = {
antilink: false,
antilinkyt: false,
antilinkfb: false,
antilinkig: false,
antilinktele: false,
antilinkwa: false,
antilinktiktok: false,
antilinktwitter: false,
antivirtex: false,
antiasing: false,
antitag: false,
antidelete: false,
antiviewonce: false,
antitoxic: false,
antisange: false,
antibot: false, 
autorespongc: false,
autoreactgc: false,
mute: false,
welcome: false,
rord: { antilink: "delete", antilinkyt: "delete", antilinkfb: "delete", antilinkig: "delete", antilinktele: "delete", antilinkwa: "delete", antilinktiktok: "delete", antilinktwitter: "delete", antivirtex: "delete", antitag: "delete", antitoxic: "delete", antisange: "delete" }, 
welcometype: "text", 
sewa: { status: true, date: calender, expired: Date.now() + toMs("1days") },
afk_group: [], 
local_mute: [], 
setwelcome: { add: "SELAMAT DATANG DI GRPUP\nJANGAN LUPA INTRO\n\nNAMA :\nUMUR :\nASAL KOTA :\n", remove: "YHHH ADA YANG KELUAR GRPUP 😭", promote: "CIEE YANG BARU JADI ADMIN GROUP", demote: "CIEE YANG BARU JADI MEMBER GROUP" }, 
store: { pay: { text: "", isImage: "" }, isImage: "", proses: "", done: "", key: {} }, 
limit: 200
}
//================================================================\\
if (Object.keys(config).includes(m.botNumber)) {
if (!("ownerNumber" in config[m.botNumber])) config[m.botNumber].ownerNumber = config.ownerNumber
if (!("ownerName" in config[m.botNumber])) config[m.botNumber].ownerName = config.ownerName
if (!("botName" in config[m.botNumber])) config[m.botNumber].botName = config.botName
if (!("setmenu" in config[m.botNumber])) config[m.botNumber].setmenu = "image"
if (!("setprefix" in config[m.botNumber])) config[m.botNumber].setprefix = "yes"
if (!("replytype" in config[m.botNumber])) config[m.botNumber].replytype = "mess1"
if (!("mode" in config[m.botNumber])) config[m.botNumber].mode = "public"
if (!("auto" in config[m.botNumber])) config[m.botNumber].auto = "unavailable"
if (!("autoblockcmd" in config[m.botNumber])) config[m.botNumber].autoblockcmd = false
if (!("autoreport" in config[m.botNumber])) config[m.botNumber].autoreport = true
if (!("autobio" in config[m.botNumber])) config[m.botNumber].autobio = false
if (!("autosticker" in config[m.botNumber])) config[m.botNumber].autosticker = false
if (!("autorespon" in config[m.botNumber])) config[m.botNumber].autorespon = false
if (!("autoread" in config[m.botNumber])) config[m.botNumber].autoread = false
if (!("autovn" in config[m.botNumber])) config[m.botNumber].autovn = false
if (!("autolevel" in config[m.botNumber])) config[m.botNumber].autolevel = false
if (!("autojoin" in config[m.botNumber])) config[m.botNumber].autojoin = false
if (!("autobackup" in config[m.botNumber])) config[m.botNumber].autobackup = false
if (!("anticall" in config[m.botNumber])) config[m.botNumber].anticall = false
if (!("antispam" in config[m.botNumber])) config[m.botNumber].antispam = false
if (!("local_read" in config[m.botNumber])) config[m.botNumber].local_read = []
if (!("local_unread" in config[m.botNumber])) config[m.botNumber].local_unread = []
} else config[m.botNumber] = {
ownerNumber: config.ownerNumber, 
ownerName: config.ownerName, 
botName: config.botName,
setmenu: "image", 
setprefix: "yes",
replytype: "mess1", 
mode: "public",
auto: "unavailable", 
autoblockcmd: false, 
autoreport: true, 
autobio: false, 
autosticker: false, 
autorespon: false, 
autoread: false, 
autovn: false, 
autolevel: false,
autojoin: false,
autobackup: false, 
anticall: false,
antispam: false,
local_read: [], 
local_unread: []
}
//================================================================\\
if (Object.keys(db.users).includes(m.sender)) {
if (!("name" in db.users[m.sender])) db.users[m.sender].name = m.pushName
if (!("date" in db.users[m.sender])) db.users[m.sender].date = calender
if (!("level" in db.users[m.sender])) db.users[m.sender].level = "Low Tier"
if (!("xp" in db.users[m.sender])) db.users[m.sender].xp = 1
if (!("balance" in db.users[m.sender])) db.users[m.sender].balance = 0
if (!("limit" in db.users[m.sender])) db.users[m.sender].limit = config.limitAwal
} else db.users[m.sender] = {
name: m.pushName, 
date: calender, 
level: "Low Tier",
xp: 1,
balance: 0,
limit: config.limitAwal,
}
//================================================================\\
} catch (e) {
console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ ERROR ]"), `${e}`)
}}

module.exports = loadDatabase


let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})