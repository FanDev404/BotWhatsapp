const fs = require("fs")
const chalk = require("chalk") 
const stable = require("json-stable-stringify") 
const data = JSON.parse(fs.readFileSync("./settings.json"))

const config = {
    ownerNumber: data.ownerNumber, 
    ownerName: data.ownerName, 
    botName: data.botName, 
    githubName: data.githubName, 
    githubRepo: data.githubRepo, 
    githubTokenClassic: data.githubTokenClassic, 
    openAiKey: data.openAiKey, 
    removebgKey: data.removebgKey, 
    audioToTextKey: data.audioToTextKey, 
    vipSewa: data.vipSewa, 
    linkGroup: data.linkGroup, 
    logonya: data.logonya, 
    thumbnailDok: data.thumbnailDok, 
    thumbnailVid: data.thumbnailVid, 
    localBackup: data.localBackup, 
    limitAwal: data.limitAwal, 
    ...(data)
}

setInterval(async () => {
await fs.writeFileSync("./settings.json", stable(config, { space: "  " }))
}, 3000)


module.exports = config


let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
    delete require.cache[file]
    require(file)
})