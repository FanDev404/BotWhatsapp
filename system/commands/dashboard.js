const fs = require("fs") 
const chalk = require("chalk")
const { toFirstCase, runtime } = require("@libs/function")
module.exports = {
    commands: ["dashboard"],
    cooldown: 13,
    isSewa: true,
    callback: async ({ m }) => {
        let data = Object.keys(db.allcommand).filter((x) => (db.allcommand[x].succes > 0 || db.allcommand[x].failed > 0))
        let succes = 0
        let failed = 0
        for (let x of data) {
        succes += db.allcommand[x].succes
        failed += db.allcommand[x].failed
        }
        let teks = "*Dashboard*\n\n"
        teks += `*Runtime* : ${runtime(process.uptime())}\n\n`
        teks += "*Commands Today*\n"
        for (let x of data) {
        teks += `*•* ${toFirstCase(x)} : ${Number(db.allcommand[x].succes) + Number(db.allcommand[x].failed)}\n`
        }
        teks += `\n*Total* : ${data.length}\n\n`
        teks += "*Command Status*\n"
        teks += ` *•* Succes : ${succes}\n`
        teks += ` *•* Failed : ${failed}\n\n`
        teks += "*Command Failed*\n"
        for (let x of data) {
        teks += `${db.allcommand[x].failed > 0? " *•* " + toFirstCase(x) + " : " + Number(db.allcommand[x].failed) + "\n" : ""}`
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