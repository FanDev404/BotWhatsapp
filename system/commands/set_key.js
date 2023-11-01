const fs = require("fs") 
const chalk = require("chalk")
const config = require("@config")
module.exports = {
    commands: ["setkey"],
    cooldown: 13,
    minArgs: 1,
    expectedArgs: "<teks>",
    example: "{prefix}{command} aplwgva1o90al#removebg",
    isSewa: true,
    isVip: true,
    callback: async ({ m }) => {
        if (m.text.includes("#removebg") && m.text.split("#removebg")[0] !== "") {
        config.removebgKey = m.text.split("#removebg")[0]
        m.reply("Success set key removebg " + m.text.split("#removebg")[0])
        } else if (m.text.includes("#openai") && m.text.split("#openai")[0] !== "") {
        config.openAiKey = m.text.split("#openai")[0]
        m.reply("Success set key openai " + m.text.split("#openai")[0])
        } else if (m.text.includes("#removebg") && m.text.split("#removebg")[0] == "") {
        m.reply("Au ahh, Kakak baka keynya mana 😑") 
        } else if (m.text.includes("#openai") && m.text.split("#openai")[0] == "") {
        m.reply("Au ahh, Kakak baka keynya mana 😑")
        } else {
        m.reply("removebg or openai") 
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