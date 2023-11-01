const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["leave"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ sock, m }) => {
        const groupFetchAllParticipating = await sock.groupFetchAllParticipating()
        const groupMentanda = Object.keys(groupFetchAllParticipating).filter((x) => (m.quoted && m.text !== "" && m.quoted.body == x || m.quoted && m.text !== "" && m.quoted.text == x || m.text == groupFetchAllParticipating[x].subject || m.text == x || !isNaN(m.text) && Object.keys(groupFetchAllParticipating)[Number(m.text) -1] == x)) 
        if (m.text.includes("https://chat.whatsapp.com/")) {
        if (!m.text.split(".com/")[0] == "https://chat.whatsapp") return m.reply("Error link")
        const idGroup = await sock.groupAcceptInvite(m.text.split("https://chat.whatsapp.com/")[1])
        await sock.groupLeave(idGroup)
        if (idGroup !== m.chat) await m.reply("Success leave group")
        } else if (m.quoted && m.quoted.text.includes("https://chat.whatsapp.com/")) {
        if (!m.quoted.text.split(".com/")[0] == "https://chat.whatsapp") return m.reply("Error link")
        const idGroup = await sock.groupAcceptInvite(m.quoted.text.split("https://chat.whatsapp.com/")[1])
        await sock.groupLeave(idGroup)
        if (idGroup !== m.chat) await m.reply("Success leave group")
        } else if (m.quoted && m.quoted.body.includes("https://chat.whatsapp.com/")) {
        if (!m.quoted.body.split(".com/")[0] == "https://chat.whatsapp") return m.reply("Error link")
        const idGroup = await sock.groupAcceptInvite(m.quoted.body.split("https://chat.whatsapp.com/")[1])
        await sock.groupLeave(idGroup)
        if (idGroup !== m.chat) await m.reply("Success leave group")
        } else if (groupMentanda.length == 1) {
        await sock.groupLeave(groupMentanda[0])
        if (groupMentanda[0] !== m.chat) await m.reply("Success leave group")
        } else if (m.isGroup) {
        await sock.groupLeave(m.chat)
        } else {
        let teks = "\`\`\`「 LEAVE GROUPS 」\`\`\`\n\n"
        let dataId = 1
        for (let x of Object.keys(groupFetchAllParticipating)) {
        teks += `${dataId++}. ${groupFetchAllParticipating[x].subject}\n`
        }
        m.reply(teks)
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