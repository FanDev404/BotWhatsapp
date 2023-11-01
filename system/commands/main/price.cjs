module.exports = {
    commands: ["price"],
    tags: "main menu", 
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            let teks = "\`\`\`「 PRICE SEWA/UPGRADE 」\`\`\`\n\n" 
            let teksPetik = (text) => {
                 return "```" + text + "```"
            }
            teks += "*Sewa Group*\n"
            teks += `${teksPetik("- 1 hari : Rp. 1.000/free hari pertama")}\n`
            teks += `${teksPetik("- 1 minggu : Rp. 5.000")}\n`
            teks += `${teksPetik("- 1 bulan : Rp. 10.000")}\n`
            teks += `${teksPetik("- Permanent : Chats owner")}\n`
            if (m.isPremium(m.sender) && !m.isOwner(m.sender)) {
                teks += "\n*Perpanjang Premium*\n"
                teks += `${teksPetik("- 1 hari : Rp. 1.000")}\n`
                teks += `${teksPetik("- 1 minggu : Rp. 5.000")}\n`
                teks += `${teksPetik("- 1 bulan : Rp. 10.000")}\n`
                teks += `${teksPetik("- Permanent : Chats owner")}\n`
            } else {
                teks += "\n*Upgrade Premium*\n"
                teks += `${teksPetik("- 1 hari : Rp. 2.000")}\n`
                teks += `${teksPetik("- 1 minggu : Rp. 10.000")}\n`
                teks += `${teksPetik("- 1 bulan : Rp. 15.000")}\n`
                teks += `${teksPetik("- Permanent : Chats owner")}\n`
            }
            if (m.isOwner(m.sender) && !m.isCreator(m.sender)) {
                teks += "\n*Perpanjang Owner*\n"
                teks += `${teksPetik("- 1 hari : Rp. 2.000")}\n`
                teks += `${teksPetik("- 1 minggu : Rp. 10.000")}\n`
                teks += `${teksPetik("- 1 bulan : Rp. 15.000")}\n`
                teks += `${teksPetik("- Permanent : Chats owner")}\n`
            } else {
                teks += "\n*Upgrade Owner*\n"
                teks += `${teksPetik("- 1 hari : Rp. 5.000")}\n`
                teks += `${teksPetik("- 1 minggu : Rp. 15.000")}\n`
                teks += `${teksPetik("- 1 bulan : Rp. 30.000")}\n`
                teks += `${teksPetik("- Permanent : Chats owner")}\n`
            }
            teks += "\n*Keuntungan Sewa*\n"
            teks += `${teksPetik("• Dapat akses fitur bot")}\n`
            teks += `${teksPetik("• Dapat tambahan limit free")}\n`
            teks += `${teksPetik("• Dan masih banyak lagi")}\n`
            teks += "\n*Keuntungan Premium*\n"
            teks += `${teksPetik("• Dapat akses fitur premium")}\n`
            teks += `${teksPetik("• Limit tanpa batas")}\n`
            teks += `${teksPetik("• Bebas spam bot")}\n`
            teks += `${teksPetik("• Premium fitur only")}\n`
            teks += `${teksPetik("• Dan masih banyak lagi")}\n`
            teks += "\n*Keuntungan Owner*\n"
            teks += `${teksPetik("• Dapat akses fitur owner")}\n`
            teks += `${teksPetik("• Limit tanpa batas")}\n`
            teks += `${teksPetik("• Bebas spam bot")}\n`
            teks += `${teksPetik("• Bebas add premium")}\n`
            teks += `${teksPetik("• Owner fitur only")}\n`
            teks += `${teksPetik("• Bebas send apa pun ke group")}\n`
            teks += `${teksPetik("• Full access fiture permanent only")}\n`
            teks += `${teksPetik("• Dan masih banyak lagi")}\n`
            teks += `\n\n${teksPetik("Bot on 24 jam jika minat langsung chat saja owner @" + (db.settings.ownerNumber))}`
            m.reply(teks) 
            cmdSuccess(command, "main menu")
        } catch (error) {
            cmdFailed(command, "main menu", error)
        }
    }
}