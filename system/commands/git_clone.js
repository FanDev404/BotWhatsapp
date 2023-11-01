const fs = require("fs") 
const chalk = require("chalk")
const util = require("util") 
const { githubRepository } = require("@libs/uploader")
module.exports = {
    commands: ["gitclone"],
    cooldown: 13,
    minArgs: 1,
    expectedArgs: "<link>",
    example: "{prefix}{command} https://github.com/Aztecs444/SlimeBotz",
    isSewa: true,
    isWait: true, 
    callback: async ({ sock, m }) => {
        if (!m.text.includes("https://github.com/")) return m.reply("Itu bukan link github kak") 
        if (m.text.split("https://github.com")[1].split("/").filter((x) => x !== "").length !== 2) return m.reply("Ada kesalahan, mungkin perlu masukan nama akun/repo") 
        const { status, data, message } = await githubRepository(m.text.split("https://github.com")[1].split("/").filter((x) => x !== "")[0], m.text.split("https://github.com")[1].split("/").filter((x) => x !== "")[1]) 
        if (!status) return m.reply(util.format(message))
        if (data.size > 70000) return m.reply("Gede banget kak sizenya 🙂") 
        sock.sendMessage(m.chat, { document: { url: `https://api.github.com/repos/${data.full_name}/zipball` }, mimetype: "application/bin", fileName: `${data.name}.zip` }, { quoted: m })
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("�?"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})