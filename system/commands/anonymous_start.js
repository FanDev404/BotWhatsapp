const fs = require("fs") 
const chalk = require("chalk")
const toMs = require("ms")
const { pickRandom } = require("@libs/function")
module.exports = {
    commands: ["start"],
    cooldown: 13,
    isSewa: true,
    isPrivate: true,
    callback: async ({ sock, m }) => {
        const data = db.anonymous.filter((x) => (x.roomA == m.chat || x.roomB == m.chat))
        const dataChat = db.anonymous.filter((x) => !x.isChat)
        if (data.length > 0 && (data[0].roomA == m.chat || data[0].roomB == m.chat)) { return m.reply("Kamu masih di dalam room anonymous.") }
        if (dataChat.length > 0) {
        const results = pickRandom(dataChat)
        if (results.roomA == "") {
        if (!m.isBlock(results.roomB)) m.reply("Berhasil Menemukan Partner, sekarang kamu dapat mengirim pesan.", results.roomB, results.roomB, {}) 
        results.roomA = m.chat
        results.isChat = true
        results.expired = "INFINITY"
        m.reply("Berhasil Menemukan Partner, sekarang kamu dapat mengirim pesan.") 
        } else if (results.roomB == "") {
        if (!m.isBlock(results.roomA)) m.reply("Berhasil Menemukan Partner, sekarang kamu dapat mengirim pesan.", results.roomA, results.roomA, {}) 
        results.roomB = m.chat
        results.isChat = true
        results.expired = "INFINITY"
        m.reply("Berhasil Menemukan Partner, sekarang kamu dapat mengirim pesan.") 
        } else {
        m.reply("Kamu telah membuat room anonymous\nMohon tunggu sedang mencari partner.") 
        db.anonymous.push({ roomA: m.chat, roomB: "", isChat: false, expired: Date.now() + toMs("5m") })
        }
        } else {
        m.reply("Kamu telah membuat room anonymous\nMohon tunggu sedang mencari partner.") 
        db.anonymous.push({ roomA: m.chat, roomB: "", isChat: false, expired: Date.now() + toMs("5m") })
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