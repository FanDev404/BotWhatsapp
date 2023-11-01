module.exports = {
    commands: ["listpc"],
    tags: "storage menu",
    isSewa: true,
    isOwner: true,
    callback: async ({ mywa, m, command, cmdSuccess, cmdFailed }) => {
        try {
            let data = (await mywa.getChats()).filter((x) => x.id.server == "c.us")
            let teks = "\`\`\`「 LIST PRIVATE CHAT 」\`\`\`\n\n"
            for (let x of data) {
                teks += ` *•* Nama : ${(await mywa.getName(x.id._serialized))}\n *•* User : @${x.id.user}\n *•* Chat : https://wa.me/${x.id.user}\n\n────────────────\n\n`
            }
            teks += `\n\n*Total ada : ${data.length}*`
            m.reply(teks)
            cmdSuccess(command, "storage menu")
        } catch (error) {
            cmdFailed(command, "storage menu", error)
        }
    }
}