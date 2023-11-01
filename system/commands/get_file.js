const fs = require("fs") 
const chalk = require("chalk")
const { basename } = require("path")
module.exports = {
    commands: ["getfile"],
    cooldown: 13,
    minArgs: 1,
    expectedArgs: "<teks>",
    example: "{prefix}{command} ./package.json",
    isSewa: true,
    isVip: true,
    callback: async ({ sock, m }) => {
        const data = []
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
        if (m.text.includes("node_modules")) return m.reply("Sizenya gede banget kak 🙂")
        if (m.text.includes("connection")) return m.reply("Sizenya gede banget kak 🙂")
        if (!Object.keys(data).includes(basename(m.text))) return m.reply("File not found")
        setTimeout(() => {
        m.reply("Sending files.......")
        }, 2000)
        setTimeout(() => {
        sock.sendMessage(m.chat, { document: fs.readFileSync(data[basename(m.text)].temp), mimetype: "application/bin", fileName: `${basename(m.text)}` }, { quoted: m })
        }, 4000)        
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})