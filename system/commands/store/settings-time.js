import { time } from "../../libs/function.js"
export default {
    commands: ["settime"],
    minArgs: 1,
    expectedArgs: "<teks>",
    example: "{prefix}{command} 5 jam@Diamond ML",
    tags: "store menu", 
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            if (isNaN(parseInt(m.text))) return m.reply("Example not found") 
            if (!m.text.includes("@")) return m.reply("Example not found")
            const data = Object.keys(db.groups[m.chat].store.key).filter((x) => (x.toLowerCase() == m.text.split("@")[1].toLowerCase()))
            if (data.length == 0) return m.reply("Nama tersebut tidak ada dalam list kak")
            if (m.text.includes("detik") || m.text.includes("second")) {
                db.groups[m.chat].store.key[data[0]].time = Date.now() + time(parseInt(m.text) + "second") 
                m.reply(`Success set time ${m.text.split("@")[0]} dengan key ${data[0]}`)
                cmdSuccess(command, "store menu")
            } else if (m.text.includes("menit") || m.text.includes("minute")) {
                db.groups[m.chat].store.key[data[0]].time = Date.now() + time(parseInt(m.text) + "minute") 
                m.reply(`Success set time ${m.text.split("@")[0]} dengan key ${data[0]}`)
                cmdSuccess(command, "store menu")
            } else if (m.text.includes("jam") || m.text.includes("hour")) {
                db.groups[m.chat].store.key[data[0]].time = Date.now() + time(parseInt(m.text) + "hour") 
                m.reply(`Success set time ${m.text.split("@")[0]} dengan key ${data[0]}`)
                cmdSuccess(command, "store menu")
            } else if (m.text.includes("hari") || m.text.includes("day")) {
                db.groups[m.chat].store.key[data[0]].time = Date.now() + time(parseInt(m.text) + "day") 
                m.reply(`Success set time ${m.text.split("@")[0]} dengan key ${data[0]}`)
                cmdSuccess(command, "store menu")
            } else {
                m.reply("Example not found : detik, menit, jam, hari")
            }
        } catch (error) {
            cmdFailed(command, "store menu", error)
        }
    }
}