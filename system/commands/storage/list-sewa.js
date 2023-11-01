import { timeToEpired } from "../../libs/function.js"
export default {
    commands: ["listsewa"],
    tags: "storage menu",
    isSewa: true,
    isOwner: true,
    callback: async ({ mywa, m, command, cmdSuccess, cmdFailed }) => {
        try {
            if (Object.keys(db.sewa).length == 0) return m.reply("Masih kosong kak ☺") 
            let data = Object.keys(db.sewa)
            let teks = "\`\`\`「 LIST SEWA 」\`\`\`\n\n"
            for (let x of data) {
                const groupMetadata = (await mywa.groupMetadata(x).catch(e => {})) || {}
                const subject = Object.keys(groupMetadata).length > 0? groupMetadata.subject : "Tidak diketahui"
                teks += ` *•* ID : ${x}\n *•* Name : ${subject}\n *•* Date : ${db.sewa[x].date}\n *•* Expired : ${m.isNumber(db.sewa[x].expired)? timeToEpired(db.sewa[x].expired) : "PERMANENT"}\n\n────────────────\n\n`
            }
            teks += `\n\n*Total ada : ${data.length}*`
            m.reply(teks)
            cmdSuccess(command, "storage menu")
        } catch (error) {
            cmdFailed(command, "storage menu", error)
        }
    }
}