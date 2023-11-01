const moment = require("moment-timezone")
module.exports = {
    commands: ["listgc"],
    tags: "storage menu",
    isSewa: true,
    isOwner: true,
    callback: async ({ mywa, m, command, cmdSuccess, cmdFailed }) => {
        try {
            let data = (await mywa.getAllGroups()).filter((x) => {
                return x.participants.map((v) => ((typeof v.id == "object" && v.id !== undefined)? v.id._serialized : v.id)).includes(m.botNumber) 
            })
            let teks = "\`\`\`「 LIST GROUP CHAT 」\`\`\`\n\n"
            for (let x of data) {
                teks += ` *•* ID : ${x.id}\n *•* Name : ${x.subject}\n *•* Owner : ${x.owner !== undefined? "@" + x.owner.split("@")[0] : "Tidak diketahui"}\n *•* Creation : ${moment(x.creation * 1000).tz("Asia/Jakarta").format("DD/MM/YYYY HH:mm:ss")}\n *•* Total Admin : ${x.participants.filter((x) => (x.isAdmin || x.isSuperAdmin)).map((x) => ((typeof x.id == "object" && x.id !== undefined)? x.id._serialized : x.id)).length}\n *•* Total Member : ${x.participants.map((x) => ((typeof x.id == "object" && x.id !== undefined)? x.id._serialized : x.id)).length}\n\n────────────────\n\n`
            }
            teks += `\n\n*Total ada : ${data.length}*`
            m.reply(teks)
            cmdSuccess(command, "storage menu")
        } catch (error) {
            cmdFailed(command, "storage menu", error)
        }
    }
}