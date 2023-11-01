const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["searchm"],
    cooldown: 13,
    minArgs: 1,
    expectedArgs: "<teks>",
    example: "{prefix}{command} P",
    isSewa: true,
    callback: async ({ m, store }) => {
        let data = await store.messages[m.chat].array.filter((x) => Object.keys(x).includes("message")).filter((x) => (Object.keys(x.message).includes("conversation") || Object.keys(x.message).includes("extendedTextMessage") || Object.keys(x.message).includes("imageMessage") || Object.keys(x.message).includes("videoMessage") || Object.keys(x.message).includes("documentMessage") || Object.keys(x.message).includes("documentWithCaptionMessage")))
        let numId = 1
        let teks = "\`\`\`「 SEARCH MESSAGE 」\`\`\`\n\n"
        for (let x of data) {
        let type = (!["senderKeyDistributionMessage","messageContextInfo"].includes(Object.keys(x.message)[0]) && Object.keys(x.message)[0]) || (Object.keys(x.message).length >= 3 && Object.keys(x.message)[1] !== "messageContextInfo" && Object.keys(x.message)[1]) || Object.keys(x.message)[Object.keys(x.message).length - 1]
        let body = type == "conversation"? x.message.conversation : type == "extendedTextMessage"? x.message.extendedTextMessage.text : type == "imageMessage"? x.message.imageMessage.caption : type == "videoMessage"? x.message.videoMessage.caption : type == "documentMessage"? x.message.documentMessage?.caption : type == "documentWithCaptionMessage"? x.message.documentMessage.caption : ""
        let results = body == m.body? "" : body.toLowerCase().includes(m.text.toLowerCase())? body : ""
        results !== ""? teks += `${numId++}. ${results}\n` : ""
        }
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