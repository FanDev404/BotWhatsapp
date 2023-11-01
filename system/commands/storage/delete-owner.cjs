module.exports = {
    commands: ["delowner"],
    tags: "storage menu",
    isSewa: true,
    isCreator: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            const listOwner = [...Object.keys(db.vip), ...Object.keys(db.owner)]
            const data = listOwner.filter((x) => (m.input.includes(x) || !isNaN(m.text) && listOwner[Number(m.text) - 1] == x))
            if (data.length > 0) {
                for(const x of data) {
                    if (Object.keys(db.owner).includes(x)) delete db.owner[x]
                    if (Object.keys(db.vip).includes(x)) delete db.vip[x]
                }
                await m.reply("Success delete owner to " + data.map((x) => "@" + x.split("@")[0]).join(" "))
                cmdSuccess(command, "storage menu")
            } else {
                if (listOwner.length == 0) return m.reply("Tidak ada owner kak ☺")
                let teks = "\`\`\`「 DELETE OWNER 」\`\`\`\n\n"
                let teksID = 1
                for (let x of listOwner) {
                    teks += `${teksID++}. ${x.split("@")[0]}\n`
                }
                m.reply(teks)
            }
        } catch (error) {
            cmdFailed(command, "storage menu", error)
        }
    }
}