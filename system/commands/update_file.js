const fs = require("fs") 
const chalk = require("chalk")
const util = require("util") 
const { basename } = require("path")
module.exports = {
    commands: ["updatefile"],
    cooldown: 13,
    isSewa: true,
    isVip: true,
    isMedia: {
        isDocument: true, 
        isQuotedMedia: {
		       	  isQuotedDocument: true
                  }
    }, 
    callback: async ({ sock, m, isQuotedDocument }) => {
        const data = {}
        const fileName = isQuotedDocument? m.quoted.message["documentMessage"].fileName : m.message["documentMessage"].fileName
        for(let x of fs.readdirSync("./").filter((x) => x.includes(".")).map((x) => "./" + x)) {
        if (!Object.keys(data).includes(basename(x))) data[basename(x)] = { temp: x }
        }
        for(let x of fs.readdirSync("./database").filter((x) => x.includes(".")).map((x) => "./database/" + x)) {
        if (!Object.keys(data).includes(basename(x))) data[basename(x)] = { temp: x }
        }
        for(let x of fs.readdirSync("./temp").filter((x) => x.includes(".") || !x.includes(".file")).map((x) => "./temp/" + x)) {
        if (!Object.keys(data).includes(basename(x))) data[basename(x)] = { temp: x }
        }
        for(let x of fs.readdirSync("./system").filter((x) => x.includes(".")).map((x) => "./system/" + x)) {
        if (!Object.keys(data).includes(basename(x))) data[basename(x)] = { temp: x }
        }
        for(let x of fs.readdirSync("./system/commands").filter((x) => x.includes(".")).map((x) => "./system/commands/" + x)) {
        if (!Object.keys(data).includes(basename(x))) data[basename(x)] = { temp: x }
        }
        for(let x of fs.readdirSync("./system/message").filter((x) => x.includes(".")).map((x) => "./system/message/" + x)) {
        if (!Object.keys(data).includes(basename(x))) data[basename(x)] = { temp: x }
        }
        for(let x of fs.readdirSync("./system/libs").filter((x) => x.includes(".")).map((x) => "./system/libs/" + x)) {
        if (!Object.keys(data).includes(basename(x))) data[basename(x)] = { temp: x }
        }
        for(let x of fs.readdirSync("./system/config").filter((x) => x.includes(".")).map((x) => "./system/config/" + x)) {
        if (!Object.keys(data).includes(basename(x))) data[basename(x)] = { temp: x }
        }
        for(let x of fs.readdirSync("./system/config/locales").filter((x) => x.includes(".")).map((x) => "./system/config/locales/" + x)) {
        if (!Object.keys(data).includes(basename(x))) data[basename(x)] = { temp: x }
        }
        if (!Object.keys(data).includes(fileName)) return m.reply("File apa itu kak")
        const media = await sock.downloadMediaMessage(isQuotedDocument? m.quoted : m)
        setTimeout(() => {
        process.send("reset")
        }, 3000)
        setTimeout(() => {
        fs.writeFileSync(data[fileName].temp, media)
        }, 2000)
        m.reply("Success update file, Restaring bot...")
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})