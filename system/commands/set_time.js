const fs = require("fs") 
const chalk = require("chalk")
const toMs = require("ms")
module.exports = {
    commands: ["settime"],
    cooldown: 13,
    minArgs: 1,
    expectedArgs: "<teks>",
    example: "{prefix}{command} 5 jam@Diamond ML",
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    callback: async ({ m }) => {
        if (isNaN(parseInt(m.text))) return m.reply("Example 404") 
        if (!m.text.includes("@")) return m.reply("Example 404")
        const data = Object.keys(db.chats[m.chat].store.key).filter((x) => (x.toLowerCase() == m.text.split("@")[1].toLowerCase()))
        if (data.length == 0) return m.reply("Nama tersebut tidak ada dalam list kak")
        if (m.text.includes("detik")) {
        db.chats[m.chat].store.key[data[0]].time = Date.now() + toMs(parseInt(m.text) + "s") 
        m.reply(`Success set time ${m.text.split("@")[0]} dengan key ${data[0]}`)
        } else if (m.text.includes("menit")) {
        db.chats[m.chat].store.key[data[0]].time = Date.now() + toMs(parseInt(m.text) + "m") 
        m.reply(`Success set time ${m.text.split("@")[0]} dengan key ${data[0]}`)
        } else if (m.text.includes("jam")) {
        db.chats[m.chat].store.key[data[0]].time = Date.now() + toMs(parseInt(m.text) + "h") 
        m.reply(`Success set time ${m.text.split("@")[0]} dengan key ${data[0]}`)
        } else if (m.text.includes("hari")) {
        db.chats[m.chat].store.key[data[0]].time = Date.now() + toMs(parseInt(m.text) + "d") 
        m.reply(`Success set time ${m.text.split("@")[0]} dengan key ${data[0]}`)
        } else {
        m.reply("Example not found : detik, menit, jam, hari")
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