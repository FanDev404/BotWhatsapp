module.exports = {
    commands: ["listblock"],
    tags: "storage menu",
    isSewa: true,
    isOwner: true,
    callback: async ({ mywa, m, command, cmdSuccess, cmdFailed }) => {
        try {
            let data = (await mywa.getBlockedContacts()).map((x) => x.id.user)
            if (data.length == 0) return m.reply("Masih kosong kak ☺") 
            let teks = "┌──⭓「 *LIST BLOCK* 」\n│\n"
            for (let x of data) {
                teks += `│⭔ @${x}\n`
            }
            teks += `│\n└────────────⭓\n\n*Total ada : ${data.length}*`
            m.reply(teks)
            cmdSuccess(command, "storage menu")
        } catch (error) {
            cmdFailed(command, "storage menu", error)
        }
    }
}