import { calender, runtime, toFirstCase } from "../../libs/function.js"
export default {
    commands: ["dashboard"],
    tags: "main menu", 
    isSewa: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            let data = Object.keys(db.dashboard).includes(calender())? Object.keys(db.dashboard[calender()].commands).filter((x) => (db.dashboard[calender()].commands[x].succes > 0 || db.dashboard[calender()].commands[x].failed > 0)) : []
            let succes = 0
            let failed = 0
            for (let x of data) {
                succes += db.dashboard[calender()].commands[x].succes
                failed += db.dashboard[calender()].commands[x].failed
            }
            let teks = "*Dashboard*\n\n"
            teks += `*Runtime* : ${runtime(process.uptime())}\n\n`
            teks += "*Commands Today*\n"
            for (let x of data) {
                teks += `*•* ${toFirstCase(x)} : ${Number(db.dashboard[calender()].commands[x].succes) + Number(db.dashboard[calender()].commands[x].failed)}\n`
            }
            teks += `\n*Total* : ${data.length}\n\n`
            teks += "*Command Status*\n"
            teks += ` *•* Succes : ${succes}\n`
            teks += ` *•* Failed : ${failed}\n\n`
            teks += "*Command Failed*\n"
            for (let x of data) {
                teks += `${db.dashboard[calender()].commands[x].failed > 0? " *•* " + toFirstCase(x) + " : " + Number(db.dashboard[calender()].commands[x].failed) + "\n" : ""}`
            }
            m.reply(teks) 
            cmdSuccess(command, "main menu")
        } catch (error) {
            cmdFailed(command, "main menu", error)
        }
    }
}