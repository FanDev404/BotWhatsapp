module.exports = {
    commands: ["listerror"],
    tags: "storage menu",
    isSewa: true,
    isOwner: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            if (Object.keys(db.listerror).length == 0) return m.reply("Tidak ada error kak ☺") 
            let data = Object.keys(db.listerror)
            let teks = "\`\`\`「 LIST ERROR 」\`\`\`\n\n"
            for (let x of data) {
                teks += ` *•* Command : ${x}\n *•* Error : ${db.listerror[x].error}\n\n────────────────\n\n`
            }
            teks += `\n\n*Total ada : ${data.length}*`
            m.reply(teks)
            cmdSuccess(command, "storage menu")
        } catch (error) {
            cmdFailed(command, "storage menu", error)
        }
    }
}