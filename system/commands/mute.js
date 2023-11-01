const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["mute"],
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    callback: async ({ m, groupAdmins, groupMembers }) => {
        if (m.input) {
        if (!groupMembers.includes(m.input)) return m.reply("Itu nomer mana kak tidak ada di group") 
        if (m.input == m.botNumber) return m.reply("Itu nomer bot kak") 
        if (m.input == (db.devoloper + "@s.whatsapp.net")) return m.reply("Itu nomer dev kak")
        if (m.input == (m.ownerNumber + "@s.whatsapp.net")) return m.reply("Itu owner kak")
        if (Object.keys(db.expired[m.botNumber].vip).includes(m.input)) return m.reply("Itu owner kak")
        if (Object.keys(db.expired[m.botNumber].owner).includes(m.input)) return m.reply("Itu owner kak")
        if (groupAdmins.includes(m.input)) return m.reply("Itu nomer admin kak") 
        if (db.chats[m.chat].local_mute.includes(m.input)) return m.reply("Sudah di mute")
        db.chats[m.chat].local_mute.push(m.input)
        m.reply("Success mute @" + m.input.split("@")[0])
        } else {
        if (db.chats[m.chat].mute) return m.reply("Sudah active")
        db.chats[m.chat].mute = true
        m.reply("Success mute group")
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