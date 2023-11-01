const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["tagall"],
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    callback: async ({ m, groupMembers }) => {
        let teks = "\`\`\`「  TAG ALL  」\`\`\`\n\n"
        teks += m.text !== ""? `Message : ${m.text}\n\n` : ""
        for (let x of groupMembers) {
        teks += `» @${x.split("@")[0]}\n`
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