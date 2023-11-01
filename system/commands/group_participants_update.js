const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["add","remove","promote","demote"],
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    isBotAdmin: true,
    callback: async ({ sock, m, groupAdmins, participants, command }) => {
        if (!m.input) return m.reply("Input nomer")
        if (m.input.startsWith("08")) return m.reply("Gunakan code negara kak")
        if ((await sock.onWhatsApp(m.input)).length == 0) return m.reply("Nomer itu sudah tidak aktif kak")
        if (command == "add") {
        if (participants.map((x) => x.id).includes(m.input)) return m.reply("Sudah menjadi member group") 
        } else if (command == "remove") {
        if (!participants.map((x) => x.id).includes(m.input)) return m.reply("Nomer tersebut bukan member group") 
        } else if (command == "promote") {
        if (!participants.map((x) => x.id).includes(m.input)) return m.reply("Nomer tersebut bukan member group") 
        if (groupAdmins.includes(m.input)) return m.reply("Nomer tersebut sudah menjadi admin") 
        } else if (command == "demote") {
        if (!participants.map((x) => x.id).includes(m.input)) return m.reply("Nomer tersebut bukan member group") 
        if (!groupAdmins.includes(m.input)) return m.reply("Nomer tersebut belum menjadi admin") 
        }        
        sock.groupParticipantsUpdate(m.chat, [m.input], command).then((results) => {
        if (results[0].status == 200 || results[0].status == "200") {
        m.reply(`Success ${command} @${m.input.split("@")[0]}`)
        } else {
        m.reply(`Gagal ${command} @${m.input.split("@")[0]}`)
        }
        }).catch(() => m.reply(`Gagal ${command} @${m.input.split("@")[0]}`)) 
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})