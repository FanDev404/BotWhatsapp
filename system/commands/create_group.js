const fs = require("fs") 
const chalk = require("chalk")
const moment = require("moment-timezone")
module.exports = {
    commands: ["creategc"],
    cooldown: 13,
    minArgs: 1,
    expectedArgs: "<teks>",
    example: "{prefix}{command} Anime Lovers",
    isSewa: true,
    isOwner: true,
    callback: async ({ sock, m }) => {        
        let create = await sock.groupCreate(m.text, [])
        let code = await sock.groupInviteCode(create.id)
        let teks = "\`\`\`「  CREATION GROUP MESSAGE  」\`\`\`\n\n"
        teks += `▸ Name : ${create.subject}\n`
        teks += `▸ Owner : @${create.owner.split("@")[0]}\n`
        teks += `▸ Creation : ${moment(create.creation * 1000).tz("Asia/Jakarta").format("DD/MM/YYYY HH:mm:ss")}\n`        
        teks += `▸ Link : https://chat.whatsapp.com/${code}`
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