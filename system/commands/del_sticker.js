const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["delstick"],
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ m }) => {
        const listSticker = fs.readdirSync("./temp").filter((x) => (x.includes(".webp") && isNaN(parseInt(x))))
        const data = listSticker.filter((x) => (x.includes(m.text) || !isNaN(m.text) && listSticker[Number(m.text) - 1] == x))
        if (data.length == 1) {
        fs.unlinkSync("./temp/" + data[0])
        await m.reply("Success delete sticker " + data[0])
        } else {
        if (listSticker.length == 0) return m.reply("Masih kosong kak")
        let teks = "\`\`\`「 DELETE STICKER 」\`\`\`\n\n"
        let dataId = 1
        for (let x of listSticker) {
        teks += `${dataId++}. ${x.split(".webp")}\n`
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