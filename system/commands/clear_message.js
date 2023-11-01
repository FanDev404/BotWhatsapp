const fs = require("fs") 
const chalk = require("chalk")
const util = require("util") 
const i18n = require("i18n")
module.exports = {
    commands: ["clearmess","clearstore"],
    cooldown: 13,
    isSewa: true,
    isVip: true,
    callback: async ({ sock, m, store }) => {
        let data = Object.keys(await store.messages)
        if (data.length == 0) return m.reply("Tidak ada yang bisa di clear kak")
        for (let x of data) {
        let messages = await store.messages[x].array.filter((a) => (Object.keys(a).includes("key") && Object.keys(a).includes("messageTimestamp"))).map(async (a) => { return { id: a.key?.id, fromMe: a.key?.fromMe, timestamp: isNaN(a.messageTimestamp)? a.messageTimestamp : a.messageTimestamp.low } }) 
        sock.chatModify({ clear: { messages }}, x, [])
        await store.messages[x].clear()
        }
        m.reply(util.format(i18n.__("success")))
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})