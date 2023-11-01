const util = require("util") 
const fs = require("fs") 
const chalk = require("chalk")
const { ChatGPTRequest } = require("@libs/uploader")
module.exports = {
    commands: ["ai"],
    cooldown: 13,
    minArgs: 3,
    expectedArgs: "<link>",
    example: "{prefix}{command} Siapa presiden Indonesia",
    isSewa: true,
    isPremium: true, 
    callback: async ({ m }) => {
        const response = await ChatGPTRequest(m.text)
        if (!response.status) return m.reply(util.format(response.message))        
        m.reply(util.format(response.data))
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})