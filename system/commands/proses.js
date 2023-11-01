const fs = require("fs") 
const chalk = require("chalk")
const { calender } = require("@libs/function")
module.exports = {
    commands: ["proses","prs"],
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    callback: async ({ m }) => {
        if (db.chats[m.chat].store.proses == "") return m.reply("Belum ada proses di group ini") 
        if (Object.keys(db.chats).includes(m.chat) && db.chats[m.chat].store["proses"].includes("{calender}") && db.chats[m.chat].store["proses"].includes("{time}") && db.chats[m.chat].store["proses"].includes("{users}") && db.chats[m.chat].store["proses"].includes("{note}")) {
        const teks1 = db.chats[m.chat].store["proses"].split("{calender}")
        if (teks1.length == 3) {
        var teks2 = teks1[0] + calender + teks1[1] + calender + teks1[2]
        } else {
        var teks2 = teks1[0] + calender + teks1[1]
        }
        const teks3 = teks2.split("{time}") 
        if (teks3.length == 3) {
        var teks4 = teks3[0] + m.timeWib + teks3[1] + m.timeWib + teks3[2]
        } else {
        var teks4 = teks3[0] + m.timeWib + teks3[1]
        }
        const teks5 = teks4.split("{users}") 
        if (teks5.length == 3) {
        var teks6 = teks5[0] + m.input.split("@")[0] + teks5[1] + m.input.split("@")[0] + teks5[2]
        } else {
        var teks6 = teks5[0] + m.input.split("@")[0] + teks5[1]
        }
        const teks7 = teks6.split("{note}") 
        if (teks7.length == 3) {
        var teks8 = teks7[0] + (m.quoted? m.quoted.body : m.isMention? "" : "") + teks7[1] + (m.quoted? m.quoted.body : m.isMention? "" : "") + teks7[2]
        } else {
        var teks8 = teks7[0] + (m.quoted? m.quoted.body : m.isMention? "" : "") + teks7[1]
        }
        m.reply(teks8) 
        } else if (Object.keys(db.chats).includes(m.chat) && db.chats[m.chat].store["proses"].includes("{calender}") && db.chats[m.chat].store["proses"].includes("{time}") && db.chats[m.chat].store["proses"].includes("{users}")) {
        const teks1 = db.chats[m.chat].store["proses"].split("{calender}")
        if (teks1.length == 3) {
        var teks2 = teks1[0] + calender + teks1[1] + calender + teks1[2]
        } else {
        var teks2 = teks1[0] + calender + teks1[1]
        }
        const teks3 = teks2.split("{time}") 
        if (teks3.length == 3) {
        var teks4 = teks3[0] + m.timeWib + teks3[1] + m.timeWib + teks3[2]
        } else {
        var teks4 = teks3[0] + m.timeWib + teks3[1]
        }
        const teks5 = teks4.split("{users}") 
        if (teks5.length == 3) {
        var teks6 = teks5[0] + m.input.split("@")[0] + teks5[1] + m.input.split("@")[0] + teks5[2]
        } else {
        var teks6 = teks5[0] + m.input.split("@")[0] + teks5[1]
        }
        m.reply(teks6) 
        } else if (Object.keys(db.chats).includes(m.chat) && db.chats[m.chat].store["proses"].includes("{calender}") && db.chats[m.chat].store["proses"].includes("{time}") && db.chats[m.chat].store["proses"].includes("{note}")) {
        const teks1 = db.chats[m.chat].store["proses"].split("{calender}")
        if (teks1.length == 3) {
        var teks2 = teks1[0] + calender + teks1[1] + calender + teks1[2]
        } else {
        var teks2 = teks1[0] + calender + teks1[1]
        }
        const teks3 = teks2.split("{time}") 
        if (teks3.length == 3) {
        var teks4 = teks3[0] + m.timeWib + teks3[1] + m.timeWib + teks3[2]
        } else {
        var teks4 = teks3[0] + m.timeWib + teks3[1]
        }
        const teks5 = teks4.split("{note}") 
        if (teks5.length == 3) {
        var teks6 = teks5[0] + (m.quoted? m.quoted.body : m.isMention? "" : "") + teks5[1] + (m.quoted? m.quoted.body : m.isMention? "" : "") + teks5[2]
        } else {
        var teks6 = teks5[0] + (m.quoted? m.quoted.body : m.isMention? "" : "") + teks5[1]
        }
        m.reply(teks6) 
        } else if (Object.keys(db.chats).includes(m.chat) && db.chats[m.chat].store["proses"].includes("{time}") && db.chats[m.chat].store["proses"].includes("{users}") && db.chats[m.chat].store["proses"].includes("{note}")) {
        const teks1 = db.chats[m.chat].store["proses"].split("{time}")
        if (teks1.length == 3) {
        var teks2 = teks1[0] + m.timeWib + teks1[1] + m.timeWib + teks1[2]
        } else {
        var teks2 = teks1[0] + m.timeWib + teks1[1]
        }
        const teks3 = teks2.split("{users}") 
        if (teks3.length == 3) {
        var teks4 = teks3[0] + m.input.split("@")[0] + teks3[1] + m.input.split("@")[0] + teks3[2]
        } else {
        var teks4 = teks3[0] + m.input.split("@")[0] + teks3[1]
        }
        const teks5 = teks4.split("{note}") 
        if (teks5.length == 3) {
        var teks6 = teks5[0] + (m.quoted? m.quoted.body : m.isMention? "" : "") + teks5[1] + (m.quoted? m.quoted.body : m.isMention? "" : "") + teks5[2]
        } else {
        var teks6 = teks5[0] + (m.quoted? m.quoted.body : m.isMention? "" : "") + teks5[1]
        }
        m.reply(teks6) 
        } else if (Object.keys(db.chats).includes(m.chat) && db.chats[m.chat].store["proses"].includes("{calender}") && db.chats[m.chat].store["proses"].includes("{users}") && db.chats[m.chat].store["proses"].includes("{note}")) {
        const teks1 = db.chats[m.chat].store["proses"].split("{calender}")
        if (teks1.length == 3) {
        var teks2 = teks1[0] + calender + teks1[1] + calender + teks1[2]
        } else {
        var teks2 = teks1[0] + calender + teks1[1]
        }
        const teks3 = teks2.split("{users}") 
        if (teks3.length == 3) {
        var teks4 = teks3[0] + m.input.split("@")[0] + teks3[1] + m.input.split("@")[0] + teks3[2]
        } else {
        var teks4 = teks3[0] + m.input.split("@")[0] + teks3[1]
        }
        const teks5 = teks4.split("{note}") 
        if (teks5.length == 3) {
        var teks6 = teks5[0] + (m.quoted? m.quoted.body : m.isMention? "" : "") + teks5[1] + (m.quoted? m.quoted.body : m.isMention? "" : "") + teks5[2]
        } else {
        var teks6 = teks5[0] + (m.quoted? m.quoted.body : m.isMention? "" : "") + teks5[1]
        }
        m.reply(teks6)
        } else if (Object.keys(db.chats).includes(m.chat) && db.chats[m.chat].store["proses"].includes("{calender}") && db.chats[m.chat].store["proses"].includes("{time}")) {
        const teks1 = db.chats[m.chat].store["proses"].split("{calender}")
        if (teks1.length == 3) {
        var teks2 = teks1[0] + calender + teks1[1] + calender + teks1[2]
        } else {
        var teks2 = teks1[0] + calender + teks1[1]
        }
        const teks3 = teks2.split("{time}") 
        if (teks3.length == 3) {
        var teks4 = teks3[0] + m.timeWib + teks3[1] + m.timeWib + teks3[2]
        } else {
        var teks4 = teks3[0] + m.timeWib + teks3[1]
        }
        m.reply(teks4) 
        } else if (Object.keys(db.chats).includes(m.chat) && db.chats[m.chat].store["proses"].includes("{calender}") && db.chats[m.chat].store["proses"].includes("{users}")) {
        const teks1 = db.chats[m.chat].store["proses"].split("{calender}")
        if (teks1.length == 3) {
        var teks2 = teks1[0] + calender + teks1[1] + calender + teks1[2]
        } else {
        var teks2 = teks1[0] + calender + teks1[1]
        }
        const teks3 = teks2.split("{users}") 
        if (teks3.length == 3) {
        var teks4 = teks3[0] + m.input.split("@")[0] + teks3[1] + m.input.split("@")[0] + teks3[2]
        } else {
        var teks4 = teks3[0] + m.input.split("@")[0] + teks3[1]
        }
        m.reply(teks4) 
        } else if (Object.keys(db.chats).includes(m.chat) && db.chats[m.chat].store["proses"].includes("{calender}") && db.chats[m.chat].store["proses"].includes("{note}")) {
        const teks1 = db.chats[m.chat].store["proses"].split("{calender}")
        if (teks1.length == 3) {
        var teks2 = teks1[0] + calender + teks1[1] + calender + teks1[2]
        } else {
        var teks2 = teks1[0] + calender + teks1[1]
        }
        const teks3 = teks2.split("{note}") 
        if (teks3.length == 3) {
        var teks4 = teks3[0] + (m.quoted? m.quoted.body : m.isMention? "" : "") + teks3[1] + (m.quoted? m.quoted.body : m.isMention? "" : "") + teks3[2]
        } else {
        var teks4 = teks3[0] + (m.quoted? m.quoted.body : m.isMention? "" : "") + teks3[1]
        }
        m.reply(teks4) 
        } else if (Object.keys(db.chats).includes(m.chat) && db.chats[m.chat].store["proses"].includes("{time}") && db.chats[m.chat].store["proses"].includes("{users}")) {
        const teks1 = db.chats[m.chat].store["proses"].split("{time}")
        if (teks1.length == 3) {
        var teks2 = teks1[0] + m.timeWib + teks1[1] + m.timeWib + teks1[2]
        } else {
        var teks2 = teks1[0] + m.timeWib + teks1[1]
        }
        const teks3 = teks2.split("{users}") 
        if (teks3.length == 3) {
        var teks4 = teks3[0] + m.input.split("@")[0] + teks3[1] + m.input.split("@")[0] + teks3[2]
        } else {
        var teks4 = teks3[0] + m.input.split("@")[0] + teks3[1]
        }
        m.reply(teks4) 
        } else if (Object.keys(db.chats).includes(m.chat) && db.chats[m.chat].store["proses"].includes("{time}") && db.chats[m.chat].store["proses"].includes("{note}")) {
        const teks1 = db.chats[m.chat].store["proses"].split("{time}")
        if (teks1.length == 3) {
        var teks2 = teks1[0] + m.timeWib + teks1[1] + m.timeWib + teks1[2]
        } else {
        var teks2 = teks1[0] + m.timeWib + teks1[1]
        }
        const teks3 = teks2.split("{note}") 
        if (teks3.length == 3) {
        var teks4 = teks3[0] + (m.quoted? m.quoted.body : m.isMention? "" : "") + teks3[1] + (m.quoted? m.quoted.body : m.isMention? "" : "") + teks3[2]
        } else {
        var teks4 = teks3[0] + (m.quoted? m.quoted.body : m.isMention? "" : "") + teks3[1]
        }
        m.reply(teks4)
        } else if (Object.keys(db.chats).includes(m.chat) && db.chats[m.chat].store["proses"].includes("{users}") && db.chats[m.chat].store["proses"].includes("{note}")) {
        const teks1 = db.chats[m.chat].store["proses"].split("{users}")
        if (teks1.length == 3) {
        var teks2 = teks1[0] + m.input.split("@")[0] + teks1[1] + m.input.split("@")[0] + teks1[2]
        } else {
        var teks2 = teks1[0] + m.input.split("@")[0] + teks1[1]
        }
        const teks3 = teks2.split("{note}") 
        if (teks3.length == 3) {
        var teks4 = teks3[0] + (m.quoted? m.quoted.body : m.isMention? "" : "") + teks3[1] + (m.quoted? m.quoted.body : m.isMention? "" : "") + teks3[2]
        } else {
        var teks4 = teks3[0] + (m.quoted? m.quoted.body : m.isMention? "" : "") + teks3[1]
        }
        m.reply(teks4) 
        } else if (Object.keys(db.chats).includes(m.chat) && db.chats[m.chat].store["proses"].includes("{calender}")) {
        const teks1 = db.chats[m.chat].store["proses"].split("{calender}")
        if (teks1.length == 3) {
        var teks2 = teks1[0] + calender + teks1[1] + calender + teks1[2]
        } else {
        var teks2 = teks1[0] + calender + teks1[1]
        }
        m.reply(teks2) 
        } else if (Object.keys(db.chats).includes(m.chat) && db.chats[m.chat].store["proses"].includes("{time}")) {
        const teks1 = db.chats[m.chat].store["proses"].split("{time}")
        if (teks1.length == 3) {
        var teks2 = teks1[0] + m.timeWib + teks1[1] + m.timeWib + teks1[2]
        } else {
        var teks2 = teks1[0] + m.timeWib + teks1[1]
        }
        m.reply(teks2) 
        } else if (Object.keys(db.chats).includes(m.chat) && db.chats[m.chat].store["proses"].includes("{users}")) {
        const teks1 = db.chats[m.chat].store["proses"].split("{users}")
        if (teks1.length == 3) {
        var teks2 = teks1[0] + m.input.split("@")[0] + teks1[1] + m.input.split("@")[0] + teks1[2]
        } else {
        var teks2 = teks1[0] + m.input.split("@")[0] + teks1[1]
        }
        m.reply(teks2) 
        } else if (Object.keys(db.chats).includes(m.chat) && db.chats[m.chat].store["proses"].includes("{note}")) {
        const teks1 = db.chats[m.chat].store["proses"].split("{note}")
        if (teks1.length == 3) {
        var teks2 = teks1[0] + (m.quoted? m.quoted.body : m.isMention? "" : "") + teks1[1] + (m.quoted? m.quoted.body : m.isMention? "" : "") + teks1[2]
        } else {
        var teks2 = teks1[0] + (m.quoted? m.quoted.body : m.isMention? "" : "") + teks1[1]
        }
        m.reply(teks2) 
        } else if (Object.keys(db.chats).includes(m.chat)) {
        m.reply(db.chats[m.chat].store["proses"])
        }
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})