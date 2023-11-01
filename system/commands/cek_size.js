const fs = require("fs") 
const chalk = require("chalk")
const { exec } = require("child_process")
module.exports = {
    commands: ["ceksize"],
    cooldown: 13,
    isSewa: true,
    callback: async ({ m }) => {
        let data = fs.readdirSync("./")
        let teks = "┌──⭓「 *SIZE BOTZ* 」\n│\n"
        exec("du -hsc *", (err, stdout) => {
        teks += `│⭔ connections : ${parseFloat(stdout.split("connections")[0])} ${stdout.split("connections")[0].includes("G")? "GB" : stdout.split("connections")[0].includes("M")? "MB" : "KB"}\n`
        teks += `│⭔ database : ${parseFloat(stdout.split("database")[0].split("connections")[1])} ${stdout.split("database")[0].split("connections")[1].includes("G")? "GB" : stdout.split("database")[0].split("connections")[1].includes("M")? "MB" : "KB"}\n`
        teks += `│⭔ node_modules : ${parseFloat(stdout.split("node_modules")[0].split("main.js")[1])} ${stdout.split("node_modules")[0].split("main.js")[1].includes("G")? "GB" : stdout.split("node_modules")[0].split("main.js")[1].includes("M")? "MB" : "KB"}\n`
        teks += `│⭔ system : ${parseFloat(stdout.split("system")[0].split("settings.json")[1])} ${stdout.split("system")[0].split("settings.json")[1].includes("G")? "GB" : stdout.split("system")[0].split("settings.json")[1].includes("M")? "MB" : "KB"}\n`
        teks += `│⭔ temp : ${parseFloat(stdout.split("temp")[0].split("system")[1])} ${stdout.split("temp")[0].split("system")[1].includes("G")? "GB" : stdout.split("temp")[0].split("system")[1].includes("M")? "MB" : "KB"}\n`
        teks += `│⭔ index.js : ${parseFloat(stdout.split("index.js")[0].split("database")[1])} ${stdout.split("index.js")[0].split("database")[1].includes("G")? "GB" : stdout.split("index.js")[0].split("database")[1].includes("M")? "MB" : "KB"}\n`
        teks += `│⭔ main.js : ${parseFloat(stdout.split("main.js")[0].split("index.js")[1])} ${stdout.split("main.js")[0].split("index.js")[1].includes("G")? "GB" : stdout.split("main.js")[0].split("index.js")[1].includes("M")? "MB" : "KB"}\n`
        teks += `│⭔ package-lock.json : ${parseFloat(stdout.split("package-lock.json")[0].split("node_modules")[1])} ${stdout.split("package-lock.json")[0].split("node_modules")[1].includes("G")? "GB" : stdout.split("package-lock.json")[0].split("node_modules")[1].includes("M")? "MB" : "KB"}\n`
        teks += `│⭔ package.json : ${parseFloat(stdout.split("package.json")[0].split("package-lock.json")[1])} ${stdout.split("package.json")[0].split("package-lock.json")[1].includes("G")? "GB" : stdout.split("package.json")[0].split("package-lock.json")[1].includes("M")? "MB" : "KB"}\n`
        teks += `│⭔ settings.json : ${parseFloat(stdout.split("settings.json")[0].split("package.json")[1])} ${stdout.split("settings.json")[0].split("package.json")[1].includes("G")? "GB" : stdout.split("settings.json")[0].split("package.json")[1].includes("M")? "MB" : "KB"}\n`
        teks += `│\n└────────────⭓\n\n*Total Size : ${parseFloat(stdout.split("total")[0].split("temp")[1])}  ${stdout.split("total")[0].split("temp")[1].includes("G")? "GB" : stdout.split("total")[0].split("temp")[1].includes("M")? "MB" : "KB"}*`
        m.reply(teks)
        })        
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})