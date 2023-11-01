const fs = require("fs")
const chalk = require("chalk")
const pino = require("pino")
const qrcode = require("qrcode")
const { DisconnectReason, useMultiFileAuthState, fetchLatestBaileysVersion, makeInMemoryStore } = require("baileys")

const { Boom } = require("@hapi/boom")
const { exec } = require("child_process")

const { decodeJid } = require("@libs/function")

const { Message } = require("@message/msg") 
const { serialize, makeWASocket } = require("@libs/serialize")
const config = require("@config")

const loadDatabase = require("@message/database")
const callingMessage = require("@message/anticall")
const groupMessage = require("@message/group")
const client = {}
//=================================================//
exports.connectToServer = async (sock, jid) => {
const store = makeInMemoryStore({ logger: pino().child({ level: "silent", stream: "store" }) })
const listSession = fs.readdirSync("./connections").filter((x) => !x.includes("session")).map((x) => x + "@s.whatsapp.net")
const { state, saveCreds } = await useMultiFileAuthState("./connections/" + jid.split("@")[0])
const { version, isLatest } = await fetchLatestBaileysVersion()
//=================================================//
client[jid] = makeWASocket({
printQRInTerminal: true,
logger: pino({ level: "silent" }),
auth: state,
browser: ["Whatsapp-Botz", "IOS", "4.1.0"],
version
}) 
//=================================================//
store.bind(client[jid].ev)
//=================================================//
try{
var autoJoin = config[decodeJid(client[jid].user.id)].autojoin
} catch {
var autoJoin = false
}
//=================================================//
try{
var autoRead = config[decodeJid(client[jid].user.id)].autoread
} catch {
var autoRead = false
}
//=================================================//
const ownerNumber = Object.keys(config).includes(decodeJid(sock.user.id))? config[decodeJid(sock.user.id)].ownerNumber : config.ownerNumber
//=================================================//
client[jid].ev.on("connection.update", async (update) => {
const { connection, qr, lastDisconnect } = update
if (!listSession.includes(jid) && qr) {
return sock.sendMessage(jid, { image: await qrcode.toBuffer(qr, { scale: 8 }), caption: "Scan QR ini untuk jadi bot sementara\n\n1. Klik titik tiga di pojok kanan atas\n2. Klik Perangkat tertaut\n3. Klik Tautkan Perangkat\n4. Scan QR Ini", jpegThumbnail: null })
}
if (connection == "open") {
try{
if (autoJoin && config.linkGroup.includes("https://chat.whatsapp")) {
client[jid].groupAcceptInvite(config.linkGroup.split("https://chat.whatsapp.com/")[1])
}} catch { console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ ERROR ]"), "link group invalid!") }
return client[jid].sendMessage(ownerNumber + "@s.whatsapp.net", { text: "Connected to server." })
} else if (connection == "close") {
const reason = new Boom(lastDisconnect?.error)?.output.statusCode
if (reason == DisconnectReason.restartRequired) {
console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ ERROR ]"), "Restart Required, Restarting....")
return this.connectToServer(sock, jid)
} else if (reason == DisconnectReason.timedOut) {
console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ ERROR ]"), "Connection TimedOut, Reconnecting....")
return this.connectToServer(sock, jid)
} else {
exec("rm -rf ./connections/" + jid.split("@")[0])
return sock.sendMessage(jid, { text: "Anda sudah tidak lagi menjadi bot." })
}}
})
//=================================================//
client[jid].ev.on("messages.upsert", async ({messages, type}) => {
const msg = messages[0] || messages[messages.length - 1]
if (type !== "notify") return
if (!msg.message) return
if (msg.key && msg.key.remoteJid == "status@broadcast") {
if (autoRead) { client[jid].readMessages([msg.key]) }
return
}
const m = serialize(client[jid], msg, store)
loadDatabase(m)
Message(client[jid], m, store) 
})
//=================================================//
client[jid].ev.on("contacts.update", (update) => {
for (let contact of update) {
let id = decodeJid(contact?.id)
if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
}
})
//=================================================//
client[jid].ws.on("CB:call", async (json) => {
callingMessage(client[jid], json)
})
//=================================================//
client[jid].ev.on("group-participants.update", async (anu) => {
groupMessage(client[jid], anu)
})
//=================================================//
client[jid].ev.on("creds.update", saveCreds)
}

exports.stoopedToServer = (sock, jid) => {
const listSession = fs.readdirSync("./connections").filter((x) => !x.includes("session")).map((x) => x + "@s.whatsapp.net")
const cekDataList = listSession.includes(jid)? true : Object.keys(client).includes(jid)
if (!cekDataList) return sock.sendMessage(jid, { text: "Anda sudah tidak lagi menjadi bot." })
try{
client[jid].end()
} catch {}
try{
client[jid].logout()
} catch {}
delete client[jid]
exec("rm -rf ./connections/" + jid.split("@")[0])
}


let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
    delete require.cache[file]
    require(file)
})