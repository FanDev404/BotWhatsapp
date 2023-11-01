module.exports = {
    commands: ["add","kick","promote","demote"],
    tags: "group menu", 
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    isBotAdmin: true,
    callback: async ({ mywa, m, command, cmdSuccess, cmdFailed }) => {
        try {
            if (command == "add") {
                if (m.input.length == 0) return m.reply("Reply/Tag/nomer")
                if (m.input[0].startsWith("08")) return m.reply("Gunakan code negara kak")
                if (m.input.includes(m.botNumber)) return m.reply("Itu nomer bot kak") 
                if (m.input.filter((x) => m.groupMembers.includes(x)).length > 0) return m.reply("Participants detect " + m.input.filter((x) => m.groupMembers.includes(x)).map((x) => "@" + x.split("@")[0]).join(" ")) 
                const chat = await mywa.getChatById(m.chat)
                await chat.addParticipants(m.input).then((responses) => {
                    const success = Object.keys(responses).filter((x) => responses[x].code == 200)
                    const failed = Object.keys(responses)
                    if (success.length > 0) return m.reply("Success add " + success.map((x) => "@" + x.split("@")[0]).join(" "))
                    return m.reply("Failed add " + failed.map((x) => "@" + x.split("@")[0]).join(" "))
                })
                cmdSuccess(command, "group menu")
            } else if (command == "kick") {
                if (m.input.length == 0) return m.reply("Reply/Tag/nomer")
                if (m.input[0].startsWith("08")) return m.reply("Gunakan code negara kak")
                if (m.input.includes(m.botNumber)) return m.reply("Itu nomer bot kak") 
                if (m.input.filter((x) => !m.groupMembers.includes(x)).length > 0) return m.reply("No participants detect " + m.input.filter((x) => !m.groupMembers.includes(x)).map((x) => "@" + x.split("@")[0]).join(" ")) 
                const chat = await mywa.getChatById(m.chat)
                await chat.removeParticipants(m.input).then((responses) => {
                    if (Object.keys(responses).includes("status") && responses.status == 200) return m.reply("Success kick " + m.input.map((x) => "@" + x.split("@")[0]).join(" "))
                    const success = Object.keys(responses).filter((x) => responses[x].code == 200)
                    const failed = Object.keys(responses)
                    if (success.length > 0) return m.reply("Success kick " + success.map((x) => "@" + x.split("@")[0]).join(" "))
                    return m.reply("Failed kick " + failed.map((x) => "@" + x.split("@")[0]).join(" "))
                }).catch(() => {
                    return m.reply("Gagal kick kak 🙂")
                }) 
                cmdSuccess(command, "group menu")
            } else if (command == "promote") {
                if (m.input.length == 0) return m.reply("Reply/Tag/nomer")
                if (m.input[0].startsWith("08")) return m.reply("Gunakan code negara kak")
                if (m.input.includes(m.botNumber)) return m.reply("Itu nomer bot kak") 
                if (m.input.filter((x) => !m.groupMembers.includes(x)).length > 0) return m.reply("No participants detect " + m.input.filter((x) => !m.groupMembers.includes(x)).map((x) => "@" + x.split("@")[0]).join(" ")) 
                if (m.input.filter((x) => m.groupAdmins.includes(x)).length > 0) return m.reply("No member detect " + m.input.filter((x) => m.groupAdmins.includes(x)).map((x) => "@" + x.split("@")[0]).join(" ")) 
                const chat = await mywa.getChatById(m.chat)
                await chat.promoteParticipants(m.input).then((responses) => {
                    if (Object.keys(responses).includes("status") && responses.status == 200) return m.reply("Success promote " + m.input.map((x) => "@" + x.split("@")[0]).join(" "))
                    const success = Object.keys(responses).filter((x) => responses[x].code == 200)
                    const failed = Object.keys(responses)
                    if (success.length > 0) return m.reply("Success promote " + success.map((x) => "@" + x.split("@")[0]).join(" "))
                    return m.reply("Failed promote " + failed.map((x) => "@" + x.split("@")[0]).join(" "))
                }).catch(() => {
                    return m.reply("Gagal promote kak 🙂")
                }) 
                cmdSuccess(command, "group menu")
            } else if (command == "demote") {
                if (m.input.length == 0) return m.reply("Reply/Tag/nomer")
                if (m.input[0].startsWith("08")) return m.reply("Gunakan code negara kak")
                if (m.input.includes(m.botNumber)) return m.reply("Itu nomer bot kak") 
                if (m.input.filter((x) => !m.groupMembers.includes(x)).length > 0) return m.reply("No participants detect " + m.input.filter((x) => !m.groupMembers.includes(x)).map((x) => "@" + x.split("@")[0]).join(" ")) 
                if (m.input.filter((x) => !m.groupAdmins.includes(x)).length > 0) return m.reply("No Admin detect " + m.input.filter((x) => !m.groupAdmins.includes(x)).map((x) => "@" + x.split("@")[0]).join(" ")) 
                const chat = await mywa.getChatById(m.chat)
                await chat.demoteParticipants(m.input).then((responses) => {
                    if (Object.keys(responses).includes("status") && responses.status == 200) return m.reply("Success demote " + m.input.map((x) => "@" + x.split("@")[0]).join(" "))
                    const success = Object.keys(responses).filter((x) => responses[x].code == 200)
                    const failed = Object.keys(responses)
                    if (success.length > 0) return m.reply("Success demote " + success.map((x) => "@" + x.split("@")[0]).join(" "))
                    return m.reply("Failed demote " + failed.map((x) => "@" + x.split("@")[0]).join(" "))
                }).catch(() => {
                    return m.reply("Gagal demote kak 🙂")
                }) 
                cmdSuccess(command, "group menu")
            }
        } catch (error) {
            cmdFailed(command, "group menu", error)
        }
    }
}