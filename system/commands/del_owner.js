const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["delowner"],
    cooldown: 13,
    isSewa: true,
    isVip: true,
    callback: async ({ m }) => {
        const listOwner = [...Object.keys(db.expired[m.botNumber].vip), ...Object.keys(db.expired[m.botNumber].owner)]
        const data = listOwner.filter((x) => (m.input == x || !isNaN(m.text) && listOwner[Number(m.text) - 1] == x))
        if (data.length == 1) {
        if (Object.keys(db.expired[m.botNumber].vip).includes(data[0])) {
        delete db.expired[m.botNumber].vip[data[0]]
        } else if (Object.keys(db.expired[m.botNumber].owner).includes(data[0])) {
        delete db.expired[m.botNumber].owner[data[0]]
        }
        await m.reply("Success delete owner @" + data[0].split("@")[0])
        } else {
        if (listOwner.length == 0) return m.reply("Masih kosong kak")
        let teks = "\`\`\`「 DELETE OWNER 」\`\`\`\n\n"
        let dataId = 1
        for (let x of listOwner) {
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