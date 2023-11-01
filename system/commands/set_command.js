const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["setcmd"],
    cooldown: 13,
    minArgs: 1,
    expectedArgs: "<command>",
    example: "{prefix}{command} menu",
    isSewa: true,
    isOwner: true,
    isMedia: {
        isQuotedMedia: {
		       	  isQuotedSticker: true
                  }
    }, 
    callback: async ({ m }) => {
        const fileSha256 = m.quoted.message.stickerMessage.fileSha256.toString("base64")
        if (!Object.keys(db.allcommand).includes(m.text)) return m.reply("Commands not found!")        
        if (Object.keys(db.listcmd).includes(fileSha256)) return m.reply("Coba pakai sticker lain")
        db.listcmd[fileSha256] = { command: m.text }
        await m.reply("Success set command")
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})