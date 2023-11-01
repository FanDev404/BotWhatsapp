import { calender, week, toFirstCase } from "../../libs/function.js"
export default {
    commands: ["menu"],
    tags: "main menu", 
    callback: async ({ m, prefix, thePrefix, command, cmdSuccess, cmdFailed }) => {
        try {
            let teks = ""
            let data = Object.keys(db.allcommand).map((x) => { return { tags_menu: db.allcommand[x].tags_menu.toUpperCase(), name: x } }).filter((x) => x.tags_menu !== "").filter((x) => (x.tags_menu.startsWith(m.text.toUpperCase())? true : m.text == ""? true : false ))
            let menu_name = []
            let teksPetik = (text) => {
                 return "```" + text + "```"
            }
            let statusCmd = (cmd) => {
                 return Object.keys(db.listerror).includes(cmd)? " 「 _Error_ 」 ❌" : "" 
            }
            for (let x of data) {
                if (!menu_name.includes(x.tags_menu)) menu_name.push(x.tags_menu) 
            }
            if (data.length == 0) return m.reply("Menu not found") 
            teks += `${teksPetik("Halo, @" + m.senderNumber + " 👋")}\n`
            teks += `${teksPetik("Selamat datang di Mywajs BOT")}\n`
            teks += `${teksPetik("bot ini masih dalam proses pengembangan!!")}\n\n`
            teks += `${teksPetik("𖢖 ═══ MYWAJS BOT ═══ 𖢖")}\n`
            teks += `${teksPetik("✬ Library : MywaJS")}\n`
            teks += `${teksPetik("✬ Mode : " + toFirstCase(db.settings.mode))}\n`
            teks += `${teksPetik("✬ Date : " + week() + ", " + calender())}\n`
            teks += `${teksPetik("✬ Prefix : " + thePrefix)}\n`
            teks += `${teksPetik("✬ Total Feature : " + Object.keys(db.allcommand).length)}\n`
            teks += `${teksPetik("✬ Total Error : " + Object.keys(db.listerror).length)}\n`
            teks += `${teksPetik("✬ Total User : " + Object.keys(db.users).length)}\n`
            teks += `${teksPetik("✬ Total Banned : " + Object.keys(db.banned).length)}\n`
            teks += `${teksPetik("𖢖 ═══ MY ACCOUNT ═══ 𖢖")}\n`
            teks += `${teksPetik("✬ Nama : " + (m.pushName == "No Name"? m.senderNumber : m.pushName))}\n`
            teks += `${teksPetik("✬ Status : " + (db.devoloper == m.senderNumber? "Devoloper" : (m.isCreator(m.sender) || m.key.fromMe)? "Creator" : m.isOwner(m.sender)? "Owner" : m.isPremium(m.sender)? "Premium" : "Users"))}\n`
            teks += `${teksPetik("✬ Limit : " + db.users[m.sender].limit)}\n`
            teks += `${teksPetik("✬ Saldo : " + db.users[m.sender].balance)}\n`
            teks += `${teksPetik("✬ Level : " + db.users[m.sender].level)}\n`
            teks += `${teksPetik("𖢖 ═════════════════ 𖢖")}\n`
            for (let a of menu_name) {
                teks += `\n⦿ *${a}*\n`
                for (let b of data) {
                    teks += `${b.tags_menu == a? (teksPetik("⌬ " + prefix + b.name + statusCmd(b.name)) + "\n") : ""}`
                }
            }
            teks += `\n\n${teksPetik("2023 © 𝑳𝒊𝒈𝒉𝒕𝒘𝒆𝒊𝒈𝒉𝒕 𝒘𝒉𝒂𝒕𝒔𝒂𝒑𝒑 𝒃𝒐𝒕")}\n`
            m.reply(teks, m.chat, "mess6")
            cmdSuccess(command, "main menu")
        } catch (error) {
            cmdFailed(command, "main menu", error)
        }
    }
}