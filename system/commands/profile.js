const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["profile"],
    cooldown: 13,
    isSewa: true,
    callback: async ({ m }) => { 
        let teks = "\`\`\`「  PROFILE USERS  」\`\`\`\n\n"
        teks += ` *•* Name : ${m.pushName}\n`
        teks += ` *•* Users : @${m.senderNumber}\n`
        teks += ` *•* Saldo : Rp. ${db.users[m.sender].balance}\n`
        teks += ` *•* Limit : ${db.users[m.sender].limit}\n`
        teks += ` *•* Level : ${db.users[m.sender].level}\n`        
        teks += ` *•* Status : ${m.isOwner? "Owner" : m.isPremium? "Premium" : "Users"}`
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