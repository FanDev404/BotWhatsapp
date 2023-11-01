import { timeToEpired } from "../../libs/function.js"
export default {
    commands: ["listprem"],
    tags: "storage menu",
    isSewa: true,
    isOwner: true,
    callback: async ({ mywa, m, command, cmdSuccess, cmdFailed }) => {
        try {
            if (Object.keys(db.premium).length == 0) return m.reply("Tidak ada premium kak ☺") 
            let data = Object.keys(db.premium)
            let teks = "\`\`\`「 LIST PREMIUM 」\`\`\`\n\n"
            for (let x of data) {
                teks += ` *•* Nama : ${(await mywa.getName(x))}\n *•* User : @${x.split("@")[0]}\n *•* Date : ${db.premium[x].date}\n *•* Expired : ${m.isNumber(db.premium[x].expired)? timeToEpired(db.premium[x].expired) : "PERMANENT"}\n\n────────────────\n\n`
            }
            teks += `\n\n*Total ada : ${data.length}*`
            m.reply(teks)
            cmdSuccess(command, "storage menu")
        } catch (error) {
            cmdFailed(command, "storage menu", error)
        }
    }
}