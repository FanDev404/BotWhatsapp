const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["addlimit","addbalance","kuranglimit","kurangbalance"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ m, command }) => {
        if (!m.input) return m.reply("Input nomer")
        if (m.input.startsWith("08")) return m.reply("Gunakan code negara kak")
        if (m.input == m.botNumber) return m.reply("Coba gunakan nomer lain kak") 
        if (m.input == (db.devoloper + "@s.whatsapp.net")) return m.reply("Coba gunakan nomer lain kak") 
        if (!Object.keys(db.users).includes(m.input)) return m.reply("Nomer tersebut belum ada di database kak")
        if (Object.keys(db.expired[m.botNumber].vip).includes(m.input)) return m.reply("Coba gunakan nomer lain kak") 
        if (Object.keys(db.expired[m.botNumber].owner).includes(m.input)) return m.reply("Coba gunakan nomer lain kak") 
        if (Object.keys(db.expired[m.botNumber].premium).includes(m.input)) return m.reply("Coba gunakan nomer lain kak") 
        if (Object.keys(db.database).includes(m.sender)) {
        if (db.database[m.sender].command !== command) { db.database[m.sender].command = command }
        if (db.database[m.sender].id !== m.input) { db.database[m.sender].id = m.input }
        if (db.database[m.sender].expired !== "") { db.database[m.sender].expired = "" }
        } else {
        db.database[m.sender] = { command, id: m.input, expired: "" }
        }
        m.reply("Jumlah?") 
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})