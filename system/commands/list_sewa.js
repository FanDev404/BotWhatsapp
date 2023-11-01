const fs = require("fs") 
const chalk = require("chalk")
const moment = require("moment-timezone")
const { timeToEpired } = require("@libs/function")
module.exports = {
    commands: ["listsewa"],
    cooldown: 13,
    isSewa: true,
    isVip: true, 
    callback: async ({ sock, m }) => {
        let teks = "\`\`\`「 LIST SEWA 」\`\`\`\n\n"
        let dataGroup = Object.keys(await sock.groupFetchAllParticipating())
        let dataSewa = Object.keys(db.expired[m.botNumber].sewa).filter((x) => dataGroup.includes(x))
        let dataNull = Object.keys(db.expired[m.botNumber].sewa).filter((x) => !dataGroup.includes(x))
        for(let x of dataNull) {
        delete db.expired[m.botNumber].sewa[x]
        }
        for (let x of dataSewa) {
        try{
        var groupMetadata = await sock.groupMetadata(x)
        } catch {
        var groupMetadata = { subject: "Tidak diketahui", owner: undefined, creation: 0, participants: [] }
        }
        if (groupMetadata.participants.filter((x) => x.admin !== null).map((x) => x.id).includes(m.botNumber)) {
        try{
        var linkGroup = "https://chat.whatsapp.com/" + (await sock.groupInviteCode(x))
        } catch {
        var linkGroup = "Link group invalid!"
        }
        var url = linkGroup
        } else {
        var url = "Botz Is Not Admin"
        }
        teks += ` *•* Name Group : ${groupMetadata.subject}\n *•* Owner : ${groupMetadata.owner !== undefined ? "@" + groupMetadata.owner.split("@")[0] : "Tidak diketahui"}\n *•* Creation : ${moment(groupMetadata.creation * 1000).tz("Asia/Jakarta").format("DD/MM/YYYY HH:mm:ss")}\n *•* Total Members : ${groupMetadata.participants.length}\n *•* Date : ${db.expired[m.botNumber].sewa[x].date}\n *•* Expired : ${db.expired[m.botNumber].sewa[x].expired == "INFINITY"? "PERMANENT" : timeToEpired(db.expired[m.botNumber].sewa[x].expired)}\n *•* Link : ${url}\n\n────────────────\n\n`
        }
        teks += `\n*Total ada : ${dataSewa.length}*`
        m.reply(teks)
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})