import moment from "moment-timezone"
import { calender } from "../../libs/function.js"
export default {
    commands: ["done"],
    tags: "store menu", 
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            if (db.groups[m.chat].store.done == "") return m.reply("Belum ada done di group ini")
            if (Object.keys(db.groups).includes(m.chat) && db.groups[m.chat].store["done"].includes("{calender}") && db.groups[m.chat].store["done"].includes("{time}") && db.groups[m.chat].store["done"].includes("{users}") && db.groups[m.chat].store["done"].includes("{note}")) {
                const text = m.quoted? m.quoted.body : m.isMention? "" : ""
                const teks1 = db.groups[m.chat].store["done"].split("{calender}")
                if (teks1.length == 3) {
                    var teks2 = teks1[0] + calender() + teks1[1] + calender() + teks1[2]
                } else {
                    var teks2 = teks1[0] + calender() + teks1[1]
                }
                const teks3 = teks2.split("{time}") 
                if (teks3.length == 3) {
                    var teks4 = teks3[0] + moment().tz("Asia/Jakarta").format("HH:mm:ss") + teks3[1] + moment().tz("Asia/Jakarta").format("HH:mm:ss") + teks3[2]
                } else {
                    var teks4 = teks3[0] + moment().tz("Asia/Jakarta").format("HH:mm:ss") + teks3[1]
                }
                const teks5 = teks4.split("{users}") 
                if (teks5.length == 3) {
                    var teks6 = teks5[0] + m.input.map((x) => x.split("@")[0]).join(" ") + teks5[1] + m.input.map((x) => x.split("@")[0]).join(" ") + teks5[2]
                } else {
                    var teks6 = teks5[0] + m.input.map((x) => x.split("@")[0]).join(" ") + teks5[1]
                }
                const teks7 = teks6.split("{note}") 
                if (teks7.length == 3) {
                    var teks8 = teks7[0] + text + teks7[1] + text + teks7[2]
                } else {
                    var teks8 = teks7[0] + text + teks7[1]
                }
                m.reply(teks8)
                cmdSuccess(command, "store menu")
            } else if (Object.keys(db.groups).includes(m.chat) && db.groups[m.chat].store["done"].includes("{calender}") && db.groups[m.chat].store["done"].includes("{time}") && db.groups[m.chat].store["done"].includes("{users}")) {
                const teks1 = db.groups[m.chat].store["done"].split("{calender}")
                if (teks1.length == 3) {
                    var teks2 = teks1[0] + calender() + teks1[1] + calender() + teks1[2]
                } else {
                    var teks2 = teks1[0] + calender() + teks1[1]
                }
                const teks3 = teks2.split("{time}") 
                if (teks3.length == 3) {
                    var teks4 = teks3[0] + moment().tz("Asia/Jakarta").format("HH:mm:ss") + teks3[1] + moment().tz("Asia/Jakarta").format("HH:mm:ss") + teks3[2]
                } else {
                    var teks4 = teks3[0] + moment().tz("Asia/Jakarta").format("HH:mm:ss") + teks3[1]
                }
                const teks5 = teks4.split("{users}") 
                if (teks5.length == 3) {
                    var teks6 = teks5[0] + m.input.map((x) => x.split("@")[0]).join(" ") + teks5[1] + m.input.map((x) => x.split("@")[0]).join(" ") + teks5[2]
                } else {
                    var teks6 = teks5[0] + m.input.map((x) => x.split("@")[0]).join(" ") + teks5[1]
                }
                m.reply(teks6)
                cmdSuccess(command, "store menu")
            } else if (Object.keys(db.groups).includes(m.chat) && db.groups[m.chat].store["done"].includes("{calender}") && db.groups[m.chat].store["done"].includes("{time}") && db.groups[m.chat].store["done"].includes("{note}")) {
                const text = m.quoted? m.quoted.body : m.isMention? "" : ""
                const teks1 = db.groups[m.chat].store["done"].split("{calender}")
                if (teks1.length == 3) {
                var teks2 = teks1[0] + calender() + teks1[1] + calender() + teks1[2]
                } else {
                    var teks2 = teks1[0] + calender() + teks1[1]
                }
                const teks3 = teks2.split("{time}") 
                if (teks3.length == 3) {
                    var teks4 = teks3[0] + moment().tz("Asia/Jakarta").format("HH:mm:ss") + teks3[1] + moment().tz("Asia/Jakarta").format("HH:mm:ss") + teks3[2]
                } else {
                    var teks4 = teks3[0] + moment().tz("Asia/Jakarta").format("HH:mm:ss") + teks3[1]
                }
                const teks5 = teks4.split("{note}") 
                if (teks5.length == 3) {
                    var teks6 = teks5[0] + text + teks5[1] + text + teks5[2]
                } else {
                    var teks6 = teks5[0] + text + teks5[1]
                }
                m.reply(teks6) 
                cmdSuccess(command, "store menu")
            } else if (Object.keys(db.groups).includes(m.chat) && db.groups[m.chat].store["done"].includes("{time}") && db.groups[m.chat].store["done"].includes("{users}") && db.groups[m.chat].store["done"].includes("{note}")) {
                const text = m.quoted? m.quoted.body : m.isMention? "" : ""
                const teks1 = db.groups[m.chat].store["done"].split("{time}")
                if (teks1.length == 3) {
                    var teks2 = teks1[0] + moment().tz("Asia/Jakarta").format("HH:mm:ss") + teks1[1] + moment().tz("Asia/Jakarta").format("HH:mm:ss") + teks1[2]
                } else {
                    var teks2 = teks1[0] + moment().tz("Asia/Jakarta").format("HH:mm:ss") + teks1[1]
                }
                const teks3 = teks2.split("{users}") 
                if (teks3.length == 3) {
                    var teks4 = teks3[0] + m.input.map((x) => x.split("@")[0]).join(" ") + teks3[1] + m.input.map((x) => x.split("@")[0]).join(" ") + teks3[2]
                } else {
                    var teks4 = teks3[0] + m.input.map((x) => x.split("@")[0]).join(" ") + teks3[1]
                }
                const teks5 = teks4.split("{note}") 
                if (teks5.length == 3) {
                    var teks6 = teks5[0] + text + teks5[1] + text + teks5[2]
                } else {
                    var teks6 = teks5[0] + text + teks5[1]
                }
                m.reply(teks6) 
                cmdSuccess(command, "store menu")
            } else if (Object.keys(db.groups).includes(m.chat) && db.groups[m.chat].store["done"].includes("{calender}") && db.groups[m.chat].store["done"].includes("{users}") && db.groups[m.chat].store["done"].includes("{note}")) {
                const text = m.quoted? m.quoted.body : m.isMention? "" : ""
                const teks1 = db.groups[m.chat].store["done"].split("{calender}")
                if (teks1.length == 3) {
                    var teks2 = teks1[0] + calender() + teks1[1] + calender() + teks1[2]
                } else {
                    var teks2 = teks1[0] + calender() + teks1[1]
                }
                const teks3 = teks2.split("{users}") 
                if (teks3.length == 3) {
                    var teks4 = teks3[0] + m.input.map((x) => x.split("@")[0]).join(" ") + teks3[1] + m.input.map((x) => x.split("@")[0]).join(" ") + teks3[2]
                } else {
                    var teks4 = teks3[0] + m.input.map((x) => x.split("@")[0]).join(" ") + teks3[1]
                }
                const teks5 = teks4.split("{note}") 
                if (teks5.length == 3) {
                    var teks6 = teks5[0] + text + teks5[1] + text + teks5[2]
                } else {
                    var teks6 = teks5[0] + text + teks5[1]
                }
                m.reply(teks6)
                cmdSuccess(command, "store menu")
            } else if (Object.keys(db.groups).includes(m.chat) && db.groups[m.chat].store["done"].includes("{calender}") && db.groups[m.chat].store["done"].includes("{time}")) {
                const teks1 = db.groups[m.chat].store["done"].split("{calender}")
                if (teks1.length == 3) {
                    var teks2 = teks1[0] + calender() + teks1[1] + calender() + teks1[2]
                } else {
                    var teks2 = teks1[0] + calender() + teks1[1]
                }
                const teks3 = teks2.split("{time}") 
                if (teks3.length == 3) {
                    var teks4 = teks3[0] + moment().tz("Asia/Jakarta").format("HH:mm:ss") + teks3[1] + moment().tz("Asia/Jakarta").format("HH:mm:ss") + teks3[2]
                } else {
                    var teks4 = teks3[0] + moment().tz("Asia/Jakarta").format("HH:mm:ss") + teks3[1]
                }
                m.reply(teks4) 
                cmdSuccess(command, "store menu")
            } else if (Object.keys(db.groups).includes(m.chat) && db.groups[m.chat].store["done"].includes("{calender}") && db.groups[m.chat].store["done"].includes("{users}")) {
                const teks1 = db.groups[m.chat].store["done"].split("{calender}")
                if (teks1.length == 3) {
                    var teks2 = teks1[0] + calender() + teks1[1] + calender() + teks1[2]
                } else {
                    var teks2 = teks1[0] + calender() + teks1[1]
                }
                const teks3 = teks2.split("{users}") 
                if (teks3.length == 3) {
                    var teks4 = teks3[0] + m.input.map((x) => x.split("@")[0]).join(" ") + teks3[1] + m.input.map((x) => x.split("@")[0]).join(" ") + teks3[2]
                } else {
                    var teks4 = teks3[0] + m.input.map((x) => x.split("@")[0]).join(" ") + teks3[1]
                }
                m.reply(teks4) 
                cmdSuccess(command, "store menu")
            } else if (Object.keys(db.groups).includes(m.chat) && db.groups[m.chat].store["done"].includes("{calender}") && db.groups[m.chat].store["done"].includes("{note}")) {
                const text = m.quoted? m.quoted.body : m.isMention? "" : ""
                const teks1 = db.groups[m.chat].store["done"].split("{calender}")
                if (teks1.length == 3) {
                    var teks2 = teks1[0] + calender() + teks1[1] + calender() + teks1[2]
                } else {
                    var teks2 = teks1[0] + calender() + teks1[1]
                }
                const teks3 = teks2.split("{note}") 
                if (teks3.length == 3) {
                    var teks4 = teks3[0] + text + teks3[1] + text + teks3[2]
                } else {
                    var teks4 = teks3[0] + text + teks3[1]
                }
                m.reply(teks4) 
                cmdSuccess(command, "store menu")
            } else if (Object.keys(db.groups).includes(m.chat) && db.groups[m.chat].store["done"].includes("{time}") && db.groups[m.chat].store["done"].includes("{users}")) {
                const teks1 = db.groups[m.chat].store["done"].split("{time}")
                if (teks1.length == 3) {
                    var teks2 = teks1[0] + moment().tz("Asia/Jakarta").format("HH:mm:ss") + teks1[1] + moment().tz("Asia/Jakarta").format("HH:mm:ss") + teks1[2]
                } else {
                    var teks2 = teks1[0] + moment().tz("Asia/Jakarta").format("HH:mm:ss") + teks1[1]
                }
                const teks3 = teks2.split("{users}") 
                if (teks3.length == 3) {
                    var teks4 = teks3[0] + m.input.map((x) => x.split("@")[0]).join(" ") + teks3[1] + m.input.map((x) => x.split("@")[0]).join(" ") + teks3[2]
                } else {
                    var teks4 = teks3[0] + m.input.map((x) => x.split("@")[0]).join(" ") + teks3[1]
                }
                m.reply(teks4) 
                cmdSuccess(command, "store menu")
            } else if (Object.keys(db.groups).includes(m.chat) && db.groups[m.chat].store["done"].includes("{time}") && db.groups[m.chat].store["done"].includes("{note}")) {
                const text = m.quoted? m.quoted.body : m.isMention? "" : ""
                const teks1 = db.groups[m.chat].store["done"].split("{time}")
                if (teks1.length == 3) {
                    var teks2 = teks1[0] + moment().tz("Asia/Jakarta").format("HH:mm:ss") + teks1[1] + moment().tz("Asia/Jakarta").format("HH:mm:ss") + teks1[2]
                } else {
                    var teks2 = teks1[0] + moment().tz("Asia/Jakarta").format("HH:mm:ss") + teks1[1]
                }
                const teks3 = teks2.split("{note}") 
                if (teks3.length == 3) {
                    var teks4 = teks3[0] + text + teks3[1] + text + teks3[2]
                } else {
                    var teks4 = teks3[0] + text + teks3[1]
                }
                m.reply(teks4)
                cmdSuccess(command, "store menu")
            } else if (Object.keys(db.groups).includes(m.chat) && db.groups[m.chat].store["done"].includes("{users}") && db.groups[m.chat].store["done"].includes("{note}")) {
                const text = m.quoted? m.quoted.body : m.isMention? "" : ""
                const teks1 = db.groups[m.chat].store["done"].split("{users}")
                if (teks1.length == 3) {
                    var teks2 = teks1[0] + m.input.map((x) => x.split("@")[0]).join(" ") + teks1[1] + m.input.map((x) => x.split("@")[0]).join(" ") + teks1[2]
                } else {
                    var teks2 = teks1[0] + m.input.map((x) => x.split("@")[0]).join(" ") + teks1[1]
                }
                const teks3 = teks2.split("{note}") 
                if (teks3.length == 3) {
                    var teks4 = teks3[0] + text + teks3[1] + text + teks3[2]
                } else {
                    var teks4 = teks3[0] + text + teks3[1]
                }
                m.reply(teks4) 
                cmdSuccess(command, "store menu")
            } else if (Object.keys(db.groups).includes(m.chat) && db.groups[m.chat].store["done"].includes("{calender}")) {
                const teks1 = db.groups[m.chat].store["done"].split("{calender}")
                if (teks1.length == 3) {
                    var teks2 = teks1[0] + calender() + teks1[1] + calender() + teks1[2]
                } else {
                    var teks2 = teks1[0] + calender() + teks1[1]
                }
                m.reply(teks2) 
                cmdSuccess(command, "store menu")
            } else if (Object.keys(db.groups).includes(m.chat) && db.groups[m.chat].store["done"].includes("{time}")) {
                const text = m.quoted? m.quoted.body : m.isMention? "" : ""
                const teks1 = db.groups[m.chat].store["done"].split("{time}")
                if (teks1.length == 3) {
                    var teks2 = teks1[0] + moment().tz("Asia/Jakarta").format("HH:mm:ss") + teks1[1] + moment().tz("Asia/Jakarta").format("HH:mm:ss") + teks1[2]
                } else {
                    var teks2 = teks1[0] + moment().tz("Asia/Jakarta").format("HH:mm:ss") + teks1[1]
                }
                m.reply(teks2) 
                cmdSuccess(command, "store menu")
            } else if (Object.keys(db.groups).includes(m.chat) && db.groups[m.chat].store["done"].includes("{users}")) {
                const teks1 = db.groups[m.chat].store["done"].split("{users}")
                if (teks1.length == 3) {
                    var teks2 = teks1[0] + m.input.map((x) => x.split("@")[0]).join(" ") + teks1[1] + m.input.map((x) => x.split("@")[0]).join(" ") + teks1[2]
                } else {
                    var teks2 = teks1[0] + m.input.map((x) => x.split("@")[0]).join(" ") + teks1[1]
                }
                m.reply(teks2) 
                cmdSuccess(command, "store menu")
            } else if (Object.keys(db.groups).includes(m.chat) && db.groups[m.chat].store["done"].includes("{note}")) {
                const text = m.quoted? m.quoted.body : m.isMention? "" : ""
                const teks1 = db.groups[m.chat].store["done"].split("{note}")
                if (teks1.length == 3) {
                    var teks2 = teks1[0] + text + teks1[1] + text + teks1[2]
                } else {
                    var teks2 = teks1[0] + text + teks1[1]
                }
                m.reply(teks2) 
                cmdSuccess(command, "store menu")
            } else if (Object.keys(db.groups).includes(m.chat)) {
                m.reply(db.groups[m.chat].store["done"])
                cmdSuccess(command, "store menu")
            }
        } catch (error) {
            cmdFailed(command, "store menu", error)
        }
    }
}