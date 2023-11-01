module.exports = {
    commands: ["join"],
    tags: "owner menu",
    isSewa: true,
    isOwner: true,
    callback: async ({ mywa, m, command, cmdSuccess, cmdFailed }) => {
        try {
            if (m.text.includes("https://chat.whatsapp.com/")) {
                if (m.text.split(".com/")[1] == "") return m.reply("Error link")
                const jid = await mywa.acceptInvite(m.text.split(".com/")[1].split("#")[0].split(" ").filter((x) => x !== "")[0]) 
                const groupMetadata = (await mywa.groupMetadata(jid).catch(e => {})) || {}
                const groupName = Object.keys(groupMetadata).length > 0? groupMetadata?.subject : ""
                await m.reply(`Success join group ${groupName? groupName : ""}`)
                cmdSuccess(command, "owner menu")
            } else if (m.quoted && m.quoted.body.includes("https://chat.whatsapp.com/")) {
                if (m.quoted.body.split(".com/")[1] == "") return m.reply("Error link")
                const jid = await mywa.acceptInvite(m.quoted.body.split(".com/")[1].split("#")[0].split(" ").filter((x) => x !== "")[0])
                const groupMetadata = (await mywa.groupMetadata(jid).catch(e => {})) || {}
                const groupName = Object.keys(groupMetadata).length > 0? groupMetadata?.subject : ""
                await m.reply(`Success join group ${groupName? groupName : ""}`)
                cmdSuccess(command, "owner menu")
            } else m.reply("Link group?") 
        } catch (error) {
            cmdFailed(command, "owner menu", error)
        }
    }
}