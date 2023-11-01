const fs = require("fs") 
const chalk = require("chalk")
const { randomNomor } = require("@libs/function")
module.exports = {
    commands: ["cekgoblok","cekjelek","cekgay","ceklesbi","cekganteng","cekcantik","cekbego","ceksuhu","cekpinter","cekjago","ceknolep","cekbabi","cekbeban","cekbaik","cekjahat","cekanjing","cekharam","cekpakboy","cekpakgirl","ceksange","cekbaper","cekfakboy","cekalim","ceksuhu","cekfakgirl","cekkeren","cekwibu","cekpasarkas","cekkul"],
    cooldown: 13,
    isSewa: true,
    callback: async ({ m, command }) => {
        let teks = `*Pertanyaan :* ${command}\n`
        teks +=  `*Users :* @${m.input? m.input.split("@")[0] : m.senderNumber}\n`
        teks += `*Jawaban :* ${randomNomor(100)}%`
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




