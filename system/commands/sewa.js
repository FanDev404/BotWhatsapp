const fs = require("fs") 
const chalk = require("chalk")
module.exports = {
    commands: ["listharga","sewa"],
    cooldown: 13,
    callback: async ({ m }) => {
        let teks = "\`\`\`「 LIST HARGA SEWA/UPGRADE 」\`\`\`\n\n"
        teks += "*Sewa Group*\n"
        teks += "- 1 hari : Rp. 1.000/free hari pertama\n"
        teks += "- 1 minggu : Rp. 5.000\n"
        teks += "- 1 bulan : Rp. 10.000\n"
        teks += "- Permanent : Bisa di omongin sama owner\n\n"
        if (m.isPremium && !m.isOwner) {
        teks += "*Perpanjang Premium*\n"
        teks += "- 1 hari : Rp. 1.000\n"
        teks += "- 1 minggu : Rp. 5.000\n"
        teks += "- 1 bulan : Rp. 10.000\n"
        teks += "- Permanent : Bisa di omongin sama owner\n\n"
        } else {
        teks += "*Upgrade Premium*\n"
        teks += "- 1 hari : Rp. 2.000\n"
        teks += "- 1 minggu : Rp. 10.000\n"
        teks += "- 1 bulan : Rp. 15.000\n"
        teks += "- Permanent : Bisa di omongin sama owner\n\n"
        }
        if (m.isOwner && !m.isCreator) {
        teks += "*Perpanjang Owner*\n"
        teks += "- 1 hari : Rp. 2.000\n"
        teks += "- 1 minggu : Rp. 10.000\n"
        teks += "- 1 bulan : Rp. 15.000\n"
        teks += "- Permanent : Bisa di omongin sama owner\n\n"
        } else {
        teks += "*Upgrade Owner*\n"
        teks += "- 1 hari : Rp. 5.000\n"
        teks += "- 1 minggu : Rp. 15.000\n"
        teks += "- 1 bulan : Rp. 30.000\n"
        teks += "- Permanent : Bisa di omongin sama owner\n\n"
        }
        teks += "*Keuntungan Sewa*\n"
        teks += "• Dapat akses fitur bot\n"
        teks += "• Dapat tambahan limit free\n"
        teks += "• Dan masih banyak lagi\n\n"
        teks += "*Keuntungan Premium*\n"
        teks += "• Dapat akses fitur premium\n"
        teks += "• Limit tanpa batas\n"
        teks += "• Bebas spam bot\n"
        teks += "• Cool down tanpa batas\n"
        teks += "• Premium fitur only\n"
        teks += "• Dan masih banyak lagi\n\n" 
        teks += "*Keuntungan Owner*\n"
        teks += "• Dapat akses fitur owner\n"
        teks += "• Limit tanpa batas\n"
        teks += "• Bebas spam bot\n"
        teks += "• Cool down tanpa batas\n"
        teks += "• Owner fitur only\n"
        teks += "• Bebas send apa pun ke group (link group dll)\n"
        teks += "• Dapat full access fiture jika kamu membeli owner permanent (vip)\n"
        teks += "• Dan masih banyak lagi\n\n"
        teks += `Bot on 24 jam jika minat langsung chat saja owner @${m.ownerNumber}`
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