module.exports = {
    commands: ["listblockcmd"],
    tags: "storage menu",
    isSewa: true,
    isOwner: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            if (db.blockcmd.length == 0) return m.reply("Masih kosong kak ☺") 
            let teks = "┌──⭓「 *LIST BLOCK COMMAND* 」\n│\n"
            for (let x of db.blockcmd) {
                teks += `│⭔ ${x}\n`
            }
            teks += `│\n└────────────⭓\n\n*Total ada : ${db.blockcmd.length}*`
            m.reply(teks)
            cmdSuccess(command, "storage menu")
        } catch (error) {
            cmdFailed(command, "storage menu", error)
        }
    }
}