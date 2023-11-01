module.exports = {
    commands: ["listban"],
    tags: "storage menu",
    isSewa: true,
    isOwner: true,
    callback: async ({ mywa, m, command, cmdSuccess, cmdFailed }) => {
        try {
            let data = Object.keys(db.banned)
            let teks = "\`\`\`「 LIST BANNED 」\`\`\`\n\n"
            for (let x of data) {
                teks += ` *•* Nama : ${(await mywa.getName(x))}\n *•* User : @${x.split("@")[0]}\n *•* Date : ${db.banned[x].date}\n *•* Reason : ${db.banned[x].reason}\n\n────────────────\n\n`
            }
            teks += `\n\n*Total ada : ${data.length}*`
            m.reply(teks)
            cmdSuccess(command, "storage menu")
        } catch (error) {
            cmdFailed(command, "storage menu", error)
        }
    }
}