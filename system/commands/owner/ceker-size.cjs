const { exec } = require("child_process") 
module.exports = {
    commands: ["ceksize"],
    tags: "owner menu", 
    isSewa: true,
    isOwner: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            let teks = "┌──⭓「 *SIZE BOTZ* 」\n│\n"
            let teksPetik = (text) => {
                 return "```" + text + "```"
            }
            exec("du -hsc *", (err, stdout) => {
                if (err) return cmdFailed(command, "owner menu", err)
                teks += `│⭔ ${teksPetik("local-json :")} ${teksPetik(parseFloat(stdout.split("local-json")[0].split("index.js")[1]))} ${teksPetik(stdout.split("local-json")[0].split("index.js")[1].includes("G")? "GB" : stdout.split("local-json")[0].split("index.js")[1].includes("M")? "MB" : "KB")}\n`
                teks += `│⭔ ${teksPetik("node_modules :")} ${teksPetik(parseFloat(stdout.split("node_modules")[0].split("main.cjs")[1]))} ${teksPetik(stdout.split("node_modules")[0].split("main.cjs")[1].includes("G")? "GB" : stdout.split("node_modules")[0].split("main.cjs")[1].includes("M")? "MB" : "KB")}\n`
                teks += `│⭔ ${teksPetik("system :")} ${teksPetik(parseFloat(stdout.split("system")[0].split("settings.json")[1]))} ${teksPetik(stdout.split("system")[0].split("settings.json")[1].includes("G")? "GB" : stdout.split("system")[0].split("settings.json")[1].includes("M")? "MB" : "KB")}\n`
                teks += `│⭔ ${teksPetik("temp :")} ${teksPetik(parseFloat(stdout.split("temp")[0].split("system")[1]))} ${teksPetik(stdout.split("temp")[0].split("system")[1].includes("G")? "GB" : stdout.split("temp")[0].split("system")[1].includes("M")? "MB" : "KB")}\n`
                teks += `│⭔ ${teksPetik("index.js :")} ${teksPetik(parseFloat(stdout.split("index.js")[0]))} ${teksPetik(stdout.split("index.js")[0].includes("G")? "GB" : stdout.split("index.js")[0].includes("M")? "MB" : "KB")}\n`
                teks += `│⭔ ${teksPetik("main.cjs :")} ${teksPetik(parseFloat(stdout.split("main.cjs")[0].split("local-json")[1]))} ${teksPetik(stdout.split("main.cjs")[0].split("local-json")[1].includes("G")? "GB" : stdout.split("main.cjs")[0].split("local-json")[1].includes("M")? "MB" : "KB")}\n`
                teks += `│⭔ ${teksPetik("package.json :")} ${teksPetik(parseFloat(stdout.split("package.json")[0].split("node_modules")[1]))} ${teksPetik(stdout.split("package.json")[0].split("node_modules")[1].includes("G")? "GB" : stdout.split("package.json")[0].split("node_modules")[1].includes("M")? "MB" : "KB")}\n`
                teks += `│⭔ ${teksPetik("settings.json :")} ${teksPetik(parseFloat(stdout.split("settings.json")[0].split("package.json")[1]))} ${teksPetik(stdout.split("settings.json")[0].split("package.json")[1].includes("G")? "GB" : stdout.split("settings.json")[0].split("package.json")[1].includes("M")? "MB" : "KB")}\n`
                teks += `│\n└────────────⭓\n\n*Total Size : ${parseFloat(stdout.split("total")[0].split("temp")[1])}  ${stdout.split("total")[0].split("temp")[1].includes("G")? "GB" : stdout.split("total")[0].split("temp")[1].includes("M")? "MB" : "KB"}*`
                m.reply(teks)
                cmdSuccess(command, "owner menu")
            })  
        } catch (error) {
            cmdFailed(command, "owner menu", error)
        }
    }
}