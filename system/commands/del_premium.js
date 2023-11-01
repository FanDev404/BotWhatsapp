const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["delpremium","delprem"],
    cooldown: 13,
    isSewa: true,
    isVip: true,
    callback: async ({ m }) => {
        const listPremium = Object.keys(db.expired[m.botNumber].premium)
        const data = listPremium.filter((x) => (m.input == x || !isNaN(m.text) && listPremium[Number(m.text) - 1] == x))
        if (data.length == 1) {
        delete db.expired[m.botNumber].premium[data[0]]
        await m.reply("Success delete premium @" + data[0].split("@")[0])
        } else {
        if (listPremium.length == 0) return m.reply("Masih kosong kak")
        let teks = "\`\`\`「 DELETE PREMIUM 」\`\`\`\n\n"
        let dataId = 1
        for (let x of listPremium) {
        teks += `${dataId++}. ${x.split("@")[0]}\n`
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