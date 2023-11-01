import { calender, time } from "../../libs/function.js"
export default {
    commands: ["addprem"],
    tags: "storage menu",
    isSewa: true,
    isOwner: true,
    callback: async ({ mywa, m, command, cmdSuccess, cmdFailed }) => {
        try {
            if (m.input.length == 0) return m.reply("Reply/Tag/nomer")
            if (m.input[0].startsWith("08")) return m.reply("Gunakan code negara kak")
            if (m.input.includes(m.botNumber)) return m.reply("Itu nomer bot kak") 
            if (m.input.includes(db.devoloper + "@c.us")) return m.reply("Itu nomer dev kak") 
            if (m.input.includes(db.settings.ownerNumber + "@c.us")) return m.reply("User sudah menjadi owner") 
            if (m.input.filter((x) => Object.keys(db.owner).includes(x)).length > 0) return m.reply("isOwner detect " + m.input.filter((x) => Object.keys(db.owner).includes(x)).map((x) => "@" + x.split("@")[0]).join(" "))
            if (m.input.filter((x) => Object.keys(db.vip).includes(x)).length > 0) return m.reply("isCreator detect " + m.input.filter((x) => Object.keys(db.vip).includes(x)).map((x) => "@" + x.split("@")[0]).join(" "))
            if (m.input.filter((x) => (Object.keys(db.premium).includes(x) && db.premium[x].expired == "PERMANEN")).length > 0) return m.reply("isPermanent detect " + m.input.filter((x) => (Object.keys(db.premium).includes(x) && db.premium[x].expired == "PERMANEN")).map((x) => "@" + x.split("@")[0]).join(" "))
            if (m.isNumber(parseFloat(m.text.split("#")[1])) && (m.text.toLowerCase().includes("second") || m.text.toLowerCase().includes("detik"))) {
                let teks = `Success add premium ${m.text.split("#")[1]} to `
                for(let x of m.input) {
                    if (Object.keys(db.premium).includes(x) && (await mywa.isRegisteredUser(x))) db.premium[x].expired += time(`${parseFloat(m.text.split("#")[1])}second`)
                    if (!Object.keys(db.premium).includes(x) && (await mywa.isRegisteredUser(x))) db.premium[x] = { "date": calender(), "expired": Date.now() + time(`${parseFloat(m.text.split("#")[1])}second`) }
                    if ((await mywa.isRegisteredUser(x))) teks += `@${x.split("@")[0]} `
                }
                if (!teks.includes("@")) return m.reply("isRegistered account") 
                await m.reply(teks)
                cmdSuccess(command, "storage menu")
            } else if (m.isNumber(parseFloat(m.text.split("#")[1])) && (m.text.toLowerCase().includes("minute") || m.text.toLowerCase().includes("menit"))) {
                let teks = `Success add premium ${m.text.split("#")[1]} to `
                for(let x of m.input) {
                    if (Object.keys(db.premium).includes(x) && (await mywa.isRegisteredUser(x))) db.premium[x].expired += time(`${parseFloat(m.text.split("#")[1])}minute`)
                    if (!Object.keys(db.premium).includes(x) && (await mywa.isRegisteredUser(x))) db.premium[x] = { "date": calender(), "expired": Date.now() + time(`${parseFloat(m.text.split("#")[1])}minute`) }
                    if ((await mywa.isRegisteredUser(x))) teks += `@${x.split("@")[0]} `
                }
                if (!teks.includes("@")) return m.reply("isRegistered account") 
                await m.reply(teks)
                cmdSuccess(command, "storage menu")
            } else if (m.isNumber(parseFloat(m.text.split("#")[1])) && (m.text.toLowerCase().includes("hour") || m.text.toLowerCase().includes("jam"))) {
                let teks = `Success add premium ${m.text.split("#")[1]} to `
                for(let x of m.input) {
                    if (Object.keys(db.premium).includes(x) && (await mywa.isRegisteredUser(x))) db.premium[x].expired += time(`${parseFloat(m.text.split("#")[1])}hour`)
                    if (!Object.keys(db.premium).includes(x) && (await mywa.isRegisteredUser(x))) db.premium[x] = { "date": calender(), "expired": Date.now() + time(`${parseFloat(m.text.split("#")[1])}hour`) }
                    if ((await mywa.isRegisteredUser(x))) teks += `@${x.split("@")[0]} `
                }
                if (!teks.includes("@")) return m.reply("isRegistered account") 
                await m.reply(teks)
                cmdSuccess(command, "storage menu")
            } else if (m.isNumber(parseFloat(m.text.split("#")[1])) && (m.text.toLowerCase().includes("day") || m.text.toLowerCase().includes("hari"))) {
                let teks = `Success add premium ${m.text.split("#")[1]} to `
                for(let x of m.input) {
                    if (Object.keys(db.premium).includes(x) && (await mywa.isRegisteredUser(x))) db.premium[x].expired += time(`${parseFloat(m.text.split("#")[1])}day`)
                    if (!Object.keys(db.premium).includes(x) && (await mywa.isRegisteredUser(x))) db.premium[x] = { "date": calender(), "expired": Date.now() + time(`${parseFloat(m.text.split("#")[1])}day`) }
                    if ((await mywa.isRegisteredUser(x))) teks += `@${x.split("@")[0]} `
                }
                if (!teks.includes("@")) return m.reply("isRegistered account") 
                await m.reply(teks)
                cmdSuccess(command, "storage menu")
            } else if (m.isNumber(parseFloat(m.text.split("#")[1])) && (m.text.toLowerCase().includes("week") || m.text.toLowerCase().includes("minggu"))) {
                let teks = `Success add premium ${m.text.split("#")[1]} to `
                for(let x of m.input) {
                    if (Object.keys(db.premium).includes(x) && (await mywa.isRegisteredUser(x))) db.premium[x].expired += time(`${parseFloat(m.text.split("#")[1])}week`)
                    if (!Object.keys(db.premium).includes(x) && (await mywa.isRegisteredUser(x))) db.premium[x] = { "date": calender(), "expired": Date.now() + time(`${parseFloat(m.text.split("#")[1])}week`) }
                    if ((await mywa.isRegisteredUser(x))) teks += `@${x.split("@")[0]} `
                }
                if (!teks.includes("@")) return m.reply("isRegistered account") 
                await m.reply(teks)
                cmdSuccess(command, "storage menu")
            } else if (m.isNumber(parseFloat(m.text.split("#")[1])) && (m.text.toLowerCase().includes("month") || m.text.toLowerCase().includes("bulan"))) {
                let teks = `Success add premium ${m.text.split("#")[1]} to `
                for(let x of m.input) {
                    if (Object.keys(db.premium).includes(x) && (await mywa.isRegisteredUser(x))) db.premium[x].expired += time(`${parseFloat(m.text.split("#")[1])}month`)
                    if (!Object.keys(db.premium).includes(x) && (await mywa.isRegisteredUser(x))) db.premium[x] = { "date": calender(), "expired": Date.now() + time(`${parseFloat(m.text.split("#")[1])}month`) }
                    if ((await mywa.isRegisteredUser(x))) teks += `@${x.split("@")[0]} `
                }
                if (!teks.includes("@")) return m.reply("isRegistered account") 
                await m.reply(teks)
                cmdSuccess(command, "storage menu")
            } else if (m.isNumber(parseFloat(m.text.split("#")[1])) && (m.text.toLowerCase().includes("year") || m.text.toLowerCase().includes("tahun"))) {
                let teks = `Success add premium ${m.text.split("#")[1]} to `
                for(let x of m.input) {
                    if (Object.keys(db.premium).includes(x) && (await mywa.isRegisteredUser(x))) db.premium[x].expired += time(`${parseFloat(m.text.split("#")[1])}year`)
                    if (!Object.keys(db.premium).includes(x) && (await mywa.isRegisteredUser(x))) db.premium[x] = { "date": calender(), "expired": Date.now() + time(`${parseFloat(m.text.split("#")[1])}year`) }
                    if ((await mywa.isRegisteredUser(x))) teks += `@${x.split("@")[0]} `
                }
                if (!teks.includes("@")) return m.reply("isRegistered account") 
                await m.reply(teks)
                cmdSuccess(command, "storage menu")
            } else {
                let teks = `Success add premium to `
                for(let x of m.input) {
                    if (Object.keys(db.premium).includes(x) && (await mywa.isRegisteredUser(x))) db.premium[x].expired = "PERMANEN"
                    if (!Object.keys(db.premium).includes(x) && (await mywa.isRegisteredUser(x))) db.premium[x] = { "date": calender(), "expired": "PERMANEN" }
                    if ((await mywa.isRegisteredUser(x))) teks += `@${x.split("@")[0]} `
                }
                if (!teks.includes("@")) return m.reply("isRegistered account") 
                await m.reply(teks)
                cmdSuccess(command, "storage menu")
            }
        } catch (error) {
            cmdFailed(command, "storage menu", error)
        }
    }
}