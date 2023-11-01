import { time } from "../../libs/function.js"
export default {
    commands: ["setbackup"],
    minArgs: 1,
    expectedArgs: "<teks>",
    example: "{prefix}{command} 30 minute",
    tags: "owner menu", 
    isSewa: true,
    isCreator: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            if (!db.settings.local_backup.status) return m.reply("Future auto backup belum aktif kak") 
            if (!isNaN(parseFloat(m.text)) && m.text.includes("minute") && time(m.text) < time("10minute")) {
                return m.reply("Minimal 10 menit ka")            
            } else if (!isNaN(parseFloat(m.text)) && m.text.includes("minute") && time(m.text) > time("1days")) {
                return m.reply("Hanya sampai 1440 minutes")
            } else if (!isNaN(parseFloat(m.text)) && m.text.includes("hour") && time(m.text) > time("1days")) {
                return m.reply("Hanya sampai 24 hours")
            } else if (!isNaN(parseFloat(m.text)) && m.text.includes("day") && time(m.text) > time("1days")) {
                return m.reply("Hanya sampai 1 days")
            } else if (!m.text.includes("minute") && !m.text.includes("hour") && !m.text.includes("day")) {
                return m.reply("Invalid example!!")
            }
            m.reply(`Success set backup ${m.text}, Restaring bot...`)
            db.settings.local_backup.time = m.text
            setTimeout(() => {
                process.send("reset")
            }, 5000)
            cmdSuccess(command, "owner menu")
        } catch (error) {
            cmdFailed(command, "owner menu", error)
        }
    }
}