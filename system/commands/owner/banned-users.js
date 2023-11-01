import { calender } from "../../libs/function.js"
export default {
    commands: ["ban"],
    tags: "owner menu", 
    isSewa: true,
    isOwner: true,
    callback: async ({ mywa, m, command, cmdSuccess, cmdFailed }) => {
        try {
            if (m.input.length == 0) return m.reply("Reply/Tag/nomer")
            if (m.input[0].startsWith("08")) return m.reply("Gunakan code negara kak")
            if (m.input.includes(m.botNumber)) return m.reply("Itu nomer bot kak") 
            if (m.input.includes(db.devoloper + "@c.us")) return m.reply("Itu nomer dev kak") 
            if (m.input.includes(db.settings.ownerNumber + "@c.us")) return m.reply("Itu nomer owner kak") 
            if (m.input.filter((x) => Object.keys(db.banned).includes(x)).length > 0) return m.reply("Banned detect to list " + m.input.filter((x) => Object.keys(db.banned).includes(x)).map((x) => "@" + x.split("@")[0]).join(" ")) 
            let teks = "Success banned "
            for(let x of m.input) {
                if ((await mywa.isRegisteredUser(x))) db.banned[x] = { "date": calender(), "reason": "Not found" }
                if ((await mywa.isRegisteredUser(x))) teks += `@${x.split("@")[0]} `
            }
            if (!teks.includes("@")) return m.reply("isRegistered account") 
            await m.reply(teks)
            cmdSuccess(command, "owner menu")
        } catch (error) {
            cmdFailed(command, "owner menu", error)
        }
    }
}