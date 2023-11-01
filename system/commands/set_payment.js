const fs = require("fs") 
const chalk = require("chalk")
const util = require("util") 
const { TelegraPh } = require("@libs/uploader")
module.exports = {
    commands: ["setpay","setpayment"],
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    callback: async ({ sock, m, isQuotedImage, isImage }) => {
        if (isQuotedImage || isImage) {
        const tesk = (m.quoted && m.text == "")? m.quoted.body : m.text
        const id = fs.readdirSync("./temp").filter((x) => !x.includes("Zzzzzzzzzz@4.0.4")).length + 1
        const media = await sock.downloadAndSaveMediaMessage((isQuotedImage? m.quoted : m), "./temp/" + id)
        const { status, data, message } = await TelegraPh(media) 
        if (!status) return m.reply(util.format(message))
        db.chats[m.chat].store.pay.isImage = data
        if (tesk !== "") {
        db.chats[m.chat].store.pay.text = tesk
        }
        m.reply("Success set payment")
        } else if (m.quoted && m.quoted.body !== "" && m.text == "") {
        db.chats[m.chat].store.pay.text = m.quoted.body
        m.reply("Success set payment")
        } else if (m.text !== "") {
        db.chats[m.chat].store.pay.text = m.text
        m.reply("Success set payment")
        } else {
        m.reply("ALAH MBOH COK MLS NGETIK.")
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