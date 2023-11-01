const { DisconnectReason, useMultiFileAuthState, fetchLatestBaileysVersion, makeInMemoryStore } = require("baileys")
const fs = require("fs")
const chalk = require("chalk")
const pino = require("pino")
const util = require("util") 
const stable = require("json-stable-stringify") 
const qrcode = require("qrcode")
const config = require("@config")
const moment = require("moment-timezone") 
const { exec } = require("child_process")
const { Boom } = require("@hapi/boom")
const { Message, readCommands } = require("@message/msg") 
const { decodeJid } = require("@libs/function")
const { serialize, makeWASocket } = require("@libs/serialize")
const { connectToServer } = require("@libs/whatsapp-server")
const loadDatabase = require("@message/database")
const callingMessage = require("@message/anticall")
const groupMessage = require("@message/group")
const listSession = fs.readdirSync("./connections").filter((x) => !x.includes("session")).map((x) => x + "@s.whatsapp.net")
//=================================================//
global.db = JSON.parse(fs.readFileSync("./database/database.json"))
global.db = {
    allcommand: {},
    anonymous: [],
    antispam: {},
    banned: {},
    blockcmd: [],
    chats: {},
    cooldown: {},
    createcode: {},
    database: {},
    devoloper: "", 
    expired: {},
    listcmd: {},
    listerror: {},
    message: {},
    users: {},
    ...(global.db || {})
}
//=================================================//
const connectToWhatsApp = async() => {
const { state, saveCreds } = await useMultiFileAuthState("./connections/session")
const { version } = await fetchLatestBaileysVersion()
const store = makeInMemoryStore({ logger: pino().child({ level: "silent", stream: "store" }) })
//=================================================//
const sock = makeWASocket({
printQRInTerminal: true,
logger: pino({ level: "silent" }),
auth: state,
browser: ["Whatsapp-Botz", "IOS", "4.1.0"],
version
})
//=================================================//
store.bind(sock.ev)
//=================================================//
try{
var autoJoin = config[decodeJid(sock.user.id)].autojoin
} catch {
var autoJoin = false
}
//=================================================//
try{
var autoRead = config[decodeJid(sock.user.id)].autoread
} catch {
var autoRead = false
}
//=================================================//
setInterval(() => {
try{
var autoBackup = config[decodeJid(sock.user.id)].autobackup
} catch {
var autoBackup = false
}
if (autoBackup && Object.keys(sock).includes("user") && Object.keys(sock.user).includes("id") && sock.user.id) {
const timeWib = moment().locale("id").tz("Asia/Jakarta").format("dddd, DD MMMM YYYY HH:mm:ss")
sock.sendMessage(decodeJid(sock.user.id), { document: fs.readFileSync("./database/database.json"), caption: timeWib, mimetype: "application/bin", fileName: "database.json" }) 
sock.sendMessage(decodeJid(sock.user.id), { document: fs.readFileSync("./settings.json"), caption: timeWib, mimetype: "application/bin", fileName: "settings.json" }) 
exec("zip -r ./connections.zip ./connections", (errr) => {
if (errr) return
sock.sendMessage(decodeJid(sock.user.id), { document: fs.readFileSync("./connections.zip"), caption: timeWib, mimetype: "application/bin", fileName: "connections.zip" })
setTimeout(() => {
fs.unlinkSync("./connections.zip")
}, 1000)
})
}
}, config.localBackup)
//=================================================//
setInterval(() => { 
    for(let jid of Object.keys(db.chats)) {
        for(let x of Object.keys(db.chats[jid].store.key).filter((x) => (db.chats[jid].store.key[x].time !== 0))) {
            if (Date.now() >= Number(db.chats[jid].store.key[x].time)) {
                db.chats[jid].store.key[x].time = 0
                return sock.sendMessage(jid, { text: "Expired is key " + x }).catch(() => "") 
            }
        }
    }
}, 3000)
//=================================================//
setInterval(() => {
if (Object.keys(db.cooldown).length > 0) {
for (let x of Object.keys(db.cooldown)) {
try{ 
var cooldown = db.cooldown[x].expired
} catch {
var cooldown = 0
}
if (Date.now() >= cooldown) {
delete db.cooldown[x]
}}}
}, 1000)
//=================================================//
setInterval(() => {
if (Object.keys(db.antispam).length > 0) {
for (let x of Object.keys(db.antispam)) {
try{ 
var cooldown = db.antispam[x].expired
} catch {
var cooldown = 0
}
if (Date.now() >= cooldown) {
delete db.antispam[x]
}}}
}, 1000)
//=================================================//
if (listSession.length > 0) {
for (let x of listSession) {
connectToServer(sock, x.split("@")[0])
}}
//=================================================//
sock.ev.on("connection.update", async (update) => {
const { connection, lastDisconnect, qr } = update
if (lastDisconnect == "undefined" && qr != "undefined") {
qrcode.generate(qr, { small: true })
}
if (connection == "close") {
const reason = new Boom(lastDisconnect?.error)?.output.statusCode
if (lastDisconnect.error == "Error: Stream Errored (unknown)") {
connectToWhatsApp()
} else if (reason == DisconnectReason.badSession) {
console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ ERROR ]"), "Bad Session File, Please Delete Session and Scan Again")
connectToWhatsApp()
} else if (reason == DisconnectReason.connectionClosed) {
console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ ERROR ]"), "Connection closed, reconnecting....")
connectToWhatsApp()
} else if (reason == DisconnectReason.connectionLost) {
console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ ERROR ]"), "Connection Lost from Server, reconnecting....")
connectToWhatsApp()
} else if (reason == DisconnectReason.connectionReplaced) {
console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ ERROR ]"), "Connection Replaced, Another New Session Opened, Please Close Current Session First")
sock.logout()
} else if (reason == DisconnectReason.loggedOut) {
console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ ERROR ]"), "Device Logged Out, Please Scan Again And Run.")
sock.logout()
} else if (reason == DisconnectReason.restartRequired) {
console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ ERROR ]"), "Restart Required, Restarting....")
connectToWhatsApp()
} else if (reason == DisconnectReason.timedOut) {
console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ ERROR ]"), "Connection TimedOut, Reconnecting....")
connectToWhatsApp()
}
} else if (connection == "connecting") {
console.log("Connecting...")
} else if (connection == "open") {
readCommands()
console.log(chalk.whiteBright("├"), chalk.keyword("aqua")("[ CONNECT ]"), "Connecting to the WhatsApp bot....")
if (autoJoin && config.linkGroup.includes("https://chat.whatsapp.com/")) {
try{
sock.groupAcceptInvite(config.linkGroup.split("https://chat.whatsapp.com/")[1])
} catch { console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ ERROR ]"), "link group invalid!") }
}}
})
//=================================================//
sock.ev.on("messages.upsert", async ({messages, type}) => {
const msg = messages[0] || messages[messages.length - 1]
if (type !== "notify") return
if (!msg.message) return
if (msg.key && msg.key.remoteJid == "status@broadcast") {
if (autoRead) { sock.readMessages([msg.key]) }
return
}
const m = serialize(sock, msg, store)
loadDatabase(m)
Message(sock, m, store) 
})
//=================================================//
sock.ev.on("contacts.update", (update) => {
for (let contact of update) {
let id = decodeJid(contact?.id)
if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
}
})
//=================================================//
sock.ws.on("CB:call", async (json) => {
callingMessage(sock, json)
})
//=================================================//
sock.ev.on("group-participants.update", async (anu) => {
groupMessage(sock, anu)
})
//=================================================//
sock.ev.on("creds.update", saveCreds)
//=================================================//
setInterval(async () => {
await fs.writeFileSync("./database/database.json", stable(global.db, { space: "    " }))
for(let x of fs.readdirSync("./").filter((x) => !["connections","database","node_modules","system","temp","index.js","main.js","package-lock.json","package.json","settings.json"].includes(x))) {
exec("rm -rf " + x)
}
}, 3000)
//=================================================//
return sock
}
//=================================================//
module.exports = { connectToWhatsApp }




let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
    delete require.cache[file]
    require(file)
})