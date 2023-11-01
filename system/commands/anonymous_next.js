const fs = require("fs") 
const chalk = require("chalk")
const toMs = require("ms")
const { pickRandom } = require("@libs/function")
module.exports = {
    commands: ["next"],
    cooldown: 13,
    isSewa: true,
    isPrivate: true,
    callback: async ({ sock, m }) => {
        const data = db.anonymous.filter((x) => (x.roomA == m.chat || x.roomB == m.chat))
        const dataChat = db.anonymous.filter((x) => !x.isChat && (x.roomA == "" || x.roomB == ""))
        const results = pickRandom(dataChat)
        if (data.length == 0) return m.reply("Kamu tidak dalam room anonymous.")
        if (!data[0].isChat) return m.reply("Kamu masih belum menemukan partner anonymous.")
        if (data[0].roomA == m.chat) {
        if (!m.isBlock(data[0].roomB)) m.reply("Partnermu telah meninggalkan room anonymous.", data[0].roomB, data[0].roomB, {}) 
        if (dataChat.length == 0) {
        data[0].roomB = ""
        data[0].isChat = false
        data[0].expired = Date.now() + toMs("5m")
        m.reply("Mohon tunggu sedang mencari partner.") 
        } else {
        if (!m.isBlock((results.roomA !== ""? results.roomA : results.roomB))) m.reply("Berhasil Menemukan Partner, sekarang kamu dapat mengirim pesan.", (results.roomA !== ""? results.roomA : results.roomB), (results.roomA !== ""? results.roomA : results.roomB), {}) 
        m.reply("Berhasil menemukan partner lain, Silahkan tunggu partner masuk ke dalam room.") 
        data[0].roomB = results.roomA !== ""? results.roomA : results.roomB
        db.anonymous.splice(db.anonymous.indexOf(results, 1))
        }
        } else if (data[0].roomB == m.chat) {
        if (!m.isBlock(data[0].roomA)) m.reply("Partnermu telah meninggalkan room anonymous.", data[0].roomA, data[0].roomA, {}) 
        if (dataChat.length == 0) {
        data[0].roomA = ""
        data[0].isChat = false
        data[0].expired = Date.now() + toMs("5m")
        m.reply("Mohon tunggu sedang mencari partner.") 
        } else {
        if (!m.isBlock((results.roomA !== ""? results.roomA : results.roomB))) m.reply("Berhasil Menemukan Partner, sekarang kamu dapat mengirim pesan.", (results.roomA !== ""? results.roomA : results.roomB), (results.roomA !== ""? results.roomA : results.roomB), {}) 
        m.reply("Berhasil menemukan partner lain, Silahkan tunggu partner masuk ke dalam room.") 
        data[0].roomA = results.roomA !== ""? results.roomA : results.roomB
        db.anonymous.splice(db.anonymous.indexOf(results, 1))
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