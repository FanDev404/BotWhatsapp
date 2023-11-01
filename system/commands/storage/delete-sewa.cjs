module.exports = {
    commands: ["delsewa"],
    tags: "storage menu",
    isSewa: true,
    isOwner: true,
    callback: async ({ mywa, m, command, cmdSuccess, cmdFailed }) => {
        try {
            const listGroup = (await mywa.getAllGroups()).filter((x) => { return x.participants.map((v) => ((typeof v.id == "object" && v.id !== undefined)? v.id._serialized : v.id)).includes(m.botNumber) })
            const listSewa = Object.keys(db.sewa).filter((x) => listGroup.map((v) => v.id).includes(x))
            const listDelete = Object.keys(db.sewa).filter((x) => !listGroup.map((v) => v.id).includes(x))
            const data = listSewa.filter((x) => (m.quoted && m.text !== "" && m.quoted.body == x || m.quoted && m.text !== "" && m.quoted.text == x || listGroup.map((v) => v.subject).includes(m.text) || m.text == x || !isNaN(m.text) && Object.keys(listSewa)[Number(m.text) -1] == x)) 
            for(const x of listDelete) {
                delete db.sewa[x]
            }
            if (m.text.includes("https://chat.whatsapp.com/")) {
                if (m.text.split(".com/")[1] == "") return m.reply("Error link")
                const gorupID = await mywa.acceptInvite(m.text.split(".com/")[1].split("#")[0].split(" ").filter((x) => x !== "")[0]) 
                if (!Object.keys(db.sewa).includes(gorupID)) return m.reply("Kakak masukin apa itu, ko ada di list sewa ka")
                if (Object.keys(db.sewa).includes(gorupID)) delete db.sewa[gorupID]
                const groupMetadata = (await mywa.groupMetadata(gorupID).catch(e => {})) || {}
                const groupName = Object.keys(groupMetadata).length > 0? groupMetadata?.subject : ""
                m.reply(`Success delete sewa ${groupName? ("to " + groupName) : ""}`)
                cmdSuccess(command, "storage menu")
            } else if (m.quoted && m.quoted.body.includes("https://chat.whatsapp.com/")) {
                if (m.quoted.body.split(".com/")[1] == "") return m.reply("Error link")
                const gorupID = await mywa.acceptInvite(m.quoted.body.split(".com/")[1].split("#")[0].split(" ").filter((x) => x !== "")[0])
                if (!Object.keys(db.sewa).includes(gorupID)) return m.reply("Kakak masukin apa itu, ko ada di list sewa ka")
                if (Object.keys(db.sewa).includes(gorupID)) delete db.sewa[gorupID]
                const groupMetadata = (await mywa.groupMetadata(gorupID).catch(e => {})) || {}
                const groupName = Object.keys(groupMetadata).length > 0? groupMetadata?.subject : ""
                m.reply(`Success delete sewa ${groupName? ("to " + groupName) : ""}`)
                cmdSuccess(command, "storage menu")
            } else if (m.isNumber(parseFloat(m.text)) && m.text.includes("@g.us")) {
                const gorupID = m.text.split("#")[0].split(" ").filter((x) => x !== "")[0]
                if (!Object.keys(db.sewa).includes(gorupID)) return m.reply("Kakak masukin apa itu, ko ada di list sewa ka")
                if (Object.keys(db.sewa).includes(gorupID)) delete db.sewa[gorupID]
                const groupMetadata = (await mywa.groupMetadata(gorupID).catch(e => {})) || {}
                const groupName = Object.keys(groupMetadata).length > 0? groupMetadata?.subject : ""
                m.reply(`Success delete sewa ${groupName? ("to " + groupName) : ""}`)
                cmdSuccess(command, "storage menu")
            } else if (data.length > 0) {
                for(const x of data) {
                    if (Object.keys(db.sewa).includes(x)) delete db.sewa[x]
                }
                await m.reply("Success delete sewa to " + listGroup.filter((x) => data.includes(x.id)).map((x) => x.subject).join(" "))
                cmdSuccess(command, "storage menu")          
            } else if (m.isGroup) {
                if (!Object.keys(db.sewa).includes(m.chat)) return m.reply("Kakak masukin apa itu, ko ada di list sewa ka")
                if (Object.keys(db.sewa).includes(m.chat)) delete db.sewa[m.chat]
                m.reply(`Success delete sewa ${m.groupName? ("to " + m.groupName) : ""}`)
                cmdSuccess(command, "storage menu")
            } else {
                if (listSewa.length == 0) return m.reply("Tidak ada sewa kak ☺")
                let teks = "\`\`\`「 DELETE SEWA 」\`\`\`\n\n"
                let teksID = 1
                for (let x of listGroup) {
                    teks += listSewa.includes(x.id)? `${teksID++}. ${x.subject}\n` : ""
                }
                m.reply(teks)
            }
        } catch (error) {
            cmdFailed(command, "storage menu", error)
        }
    }
}