const fs = require("fs") 
const chalk = require("chalk")
const { calender } = require("@libs/function")
module.exports = {
    commands: ["report"],
    cooldown: 13,
    minArgs: 1,
    expectedArgs: "<teks>",
    example: "{prefix}{command} ada error bang",
    isSewa: true,
    callback: async ({ m }) => {
        let teks = "\`\`\`「 REPORT 」\`\`\`\n\n"
        teks += `⭔ *Dari* : @${m.senderNumber}\n`
        teks += `⭔ *Date* : ${calender}\n`
        teks += `⭔ *Time* : ${m.timeWib}\n`
        teks += `⭔ *Laporan* : ${m.text}`
        m.reply(teks, m.ownerNumber + "@s.whatsapp.net")
        m.reply("Laporan telah terkirim")
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})