const fs = require("fs") 
const chalk = require("chalk")
const { pickRandom } = require("@libs/function")
module.exports = {
    commands: ["memek","bego","goblok","perawan","babi","tolol","pintar","asu","gay","lesby","bajingan","jancok","anjing","ngentot","monyet","mastah","newbie","bangsat","bangke","sange","dakjal","wibu","puki","pantek","jadian","jodohku"], 
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    callback: async ({ m, groupMembers, command }) => {
        if (command == "jadian") {
        const nomer1 = pickRandom(groupMembers)
        const nomer2 = pickRandom(groupMembers)
        m.reply(`Ciee Yang Jadian💖 Jangan Lupa Pajak Jadiannya Yaa🐤\n\n@${nomer1.split("@")[0]} ❤️ @${nomer2.split("@")[0]}`) 
        } else if (command == "jodohku") {
        const nomer = pickRandom(groupMembers)
        m.reply(`jodoh kamu adalah @${nomer.split("@")[0]}`) 
        } else {
        const nomer = pickRandom(groupMembers)
        m.reply(`Yang paling ${command} di sini adalah @${nomer.split("@")[0]}`)
        }
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
}) 