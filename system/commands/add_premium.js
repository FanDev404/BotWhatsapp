const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["addpremium","addprem"],
    cooldown: 13,
    isSewa: true,
    isVip: true,
    callback: async ({ sock, m }) => {
        if (!m.input) return m.reply("Input nomer")
        if (m.input.startsWith("08")) return m.reply("Gunakan code negara kak")
        if ((await sock.onWhatsApp(m.input)).length == 0) return m.reply("Nomer itu sudah tidak aktif kak")
        if (m.input == (db.devoloper + "@s.whatsapp.net")) return m.reply("Itu nomer dev kak")
        if (m.input == (m.ownerNumber + "@s.whatsapp.net")) return m.reply("User sudah menjadi owner")
        if (Object.keys(db.expired[m.botNumber].vip).includes(m.input)) return m.reply("User sudah menjadi owner")
        if (Object.keys(db.expired[m.botNumber].owner).includes(m.input)) return m.reply("User sudah menjadi owner")
        if (Object.keys(db.expired[m.botNumber].premium).includes(m.input) && db.expired[m.botNumber].premium[m.input].expired == "INFINITY") {
        return m.reply("User sudah menjadi premium")
        }
        if (Object.keys(db.database).includes(m.sender)) {
        if (db.database[m.sender].command !== "addpremium") { db.database[m.sender].command = "addpremium" }
        if (db.database[m.sender].id !== m.input) { db.database[m.sender].id = m.input }
        if (db.database[m.sender].expired !== "") { db.database[m.sender].expired = "" }
        } else {
        db.database[m.sender] = { command: "addpremium", id: m.input, expired: "" }
        }        
        m.reply("\`\`\`「 ADD PREMIUM 」\`\`\`\n\n1 = PERMANENT\n2 = YEARS\n3 = MONTHS\n4 = WEEKS\n5 = DAYS\n6 = HOURS\n7 = MINUTES\n8 = SECONDS")
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})