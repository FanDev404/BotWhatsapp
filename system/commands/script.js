const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["script"],
    cooldown: 13,
    isSewa: true,
    callback: async ({ m }) => {
        let teks = ""
        teks += "*BASE INFO*\n"
        teks += "- Anti pending key\n"
        teks += "- Anti copas\n"
        teks += "- Vip? Premiu? Belum ada apa apa sama bot ini\n"
        teks += "- Fiture beda dari yang lain terutama penggunaan example\n"
        teks += "- 99% Anti Error\n"
        teks += "- Akan terus di kembangkan\n"
        teks += "- Jika menemukan error akan langsung di fix jika ada detail error\n"
        teks += "- Database new\n"
        teks += "- Fiture akan trs di kembangkan dan berbeda versi\n"
        teks += "- Ada kemungkinan sekali coba pakai akan males ganti sc lain 90% ke atas\n"
        teks += "- Fiture banyak? percuma kalo masih banyakin errornya\n"
        teks += "- Bisa add fiture lewat case atau plungis\n"
        teks += "- Size : di bawah 1mb (tanpa module)\n"
        teks += "- Base Original : https://github.com/Aztecs444/Bot-Whatsapp\n"
        teks += "- Source code : Maaf kak untuk bot ini edisi terbatas...\n\n"
        teks += "*TANKS TO*\n"
        teks += "- Fan Dev\n"
        teks += "- Dittaz OFC\n"
        teks += "- Nun Pedia\n"
        teks += "- Nina Kawai\n"
        teks += "- Lol Human\n"
        teks += "- try catch dev\n"
        teks += "- Amirul Dev"
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