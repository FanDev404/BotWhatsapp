module.exports = {
    commands: ["delprem"],
    tags: "storage menu",
    isSewa: true,
    isOwner: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            const listPremium = Object.keys(db.premium)
            const data = listPremium.filter((x) => (m.input.includes(x) || !isNaN(m.text) && listPremium[Number(m.text) - 1] == x))
            if (data.length > 0) {
                for(const x of data) {
                    if (Object.keys(db.premium).includes(x)) delete db.premium[x]
                }
                await m.reply("Success delete premium to " + data.map((x) => "@" + x.split("@")[0]).join(" "))
                cmdSuccess(command, "storage menu")
            } else {
                if (listPremium.length == 0) return m.reply("Tidak ada premium kak ☺")
                let teks = "\`\`\`「 DELETE PREMIUM 」\`\`\`\n\n"
                let teksID = 1
                for (let x of listPremium) {
                    teks += `${teksID++}. ${x.split("@")[0]}\n`
                }
                m.reply(teks)
            }
        } catch (error) {
            cmdFailed(command, "storage menu", error)
        }
    }
}