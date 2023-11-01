const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["delsewa"],
    cooldown: 13,
    isSewa: true,
    isVip: true,
    callback: async ({ sock, m, groupName }) => {
        let groupFetchAllParticipating = await sock.groupFetchAllParticipating()
        let listSewa = Object.keys(db.expired[m.botNumber].sewa).filter((x) => Object.keys(groupFetchAllParticipating).includes(x))
        let listDelete = Object.keys(db.expired[m.botNumber].sewa).filter((x) => !Object.keys(groupFetchAllParticipating).includes(x))
        let data = listSewa.filter((x) => (m.quoted && m.text !== "" && m.quoted.body == x || m.quoted && m.text !== "" && m.quoted.text == x || m.text == groupFetchAllParticipating[x].subject || m.text == x || !isNaN(m.text) && Object.keys(listSewa)[Number(m.text) -1] == x)) 
        for(let x of listDelete) {
        delete db.expired[m.botNumber].sewa[x]
        }
        if (m.text.includes("https://chat.whatsapp.com/")) {
        if (!m.text.split(".com/")[0] == "https://chat.whatsapp") return m.reply("Error link")
        let idGroup = await sock.groupAcceptInvite(m.text.split("https://chat.whatsapp.com/")[1])
        if (!Object.keys(db.expired[m.botNumber].sewa).includes(idGroup)) return m.reply("Belum sewa kak")
        let groupMetadata = await sock.groupMetadata(idGroup)
        delete db.expired[m.botNumber].sewa[idGroup]
        await m.reply("Success delete sewa " + groupMetadata.subject)
        } else if (m.quoted && m.quoted.text.includes("https://chat.whatsapp.com/")) {
        if (!m.quoted.text.split(".com/")[0] == "https://chat.whatsapp") return m.reply("Error link")
        let idGroup = await sock.groupAcceptInvite(m.quoted.text.split("https://chat.whatsapp.com/")[1])
        if (!Object.keys(db.expired[m.botNumber].sewa).includes(idGroup)) return m.reply("Belum sewa kak")
        let groupMetadata = await sock.groupMetadata(idGroup)
        delete db.expired[m.botNumber].sewa[idGroup]
        await m.reply("Success delete sewa " + groupMetadata.subject)
        } else if (m.quoted && m.quoted.budy.includes("https://chat.whatsapp.com/")) {
        if (!m.quoted.budy.split(".com/")[0] == "https://chat.whatsapp") return m.reply("Error link")
        let idGroup = await sock.groupAcceptInvite(m.quoted.budy.split("https://chat.whatsapp.com/")[1])
        if (!Object.keys(db.expired[m.botNumber].sewa).includes(idGroup)) return m.reply("Belum sewa kak")
        let groupMetadata = await sock.groupMetadata(idGroup)
        delete db.expired[m.botNumber].sewa[idGroup]
        await m.reply("Success delete sewa " + groupMetadata.subject)
        } else if (data.length == 1) {
        let groupMetadata = await sock.groupMetadata(data[0])
        delete db.expired[m.botNumber].sewa[data[0]]
        await m.reply("Success delete sewa " + groupMetadata.subject)
        } else if (m.isGroup) {
        if (!Object.keys(db.expired[m.botNumber].sewa).includes(m.chat)) return m.reply("Belum sewa kak")
        delete db.expired[m.botNumber].sewa[m.chat]
        await m.reply("Success delete sewa " + groupName)
        } else {
        if (listSewa.length == 0) return m.reply("Masih kosong kak")
        let teks = "\`\`\`「 DELETE SEWA 」\`\`\`\n\n"
        let dataId = 1
        for (let x of listSewa) {
        let groupMetadata = await sock.groupMetadata(x)
        teks += `${dataId++}. ${groupMetadata.subject}\n`
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