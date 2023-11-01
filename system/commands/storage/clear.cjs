const i18n = require("i18n") 
module.exports = {
    commands: ["clear"],
    tags: "storage menu",
    isSewa: true,
    isOwner: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            if (m.text == "owner" || m.text == "1") {
                if (!m.isCreator(m.sender) && !m.key.fromMe) return m.reply(i18n.__("message.creator_only"))
                if ([...Object.keys(db.vip), ...Object.keys(db.owner)].length == 0) return m.reply("Tidak ada owner kak ☺") 
                db.owner = {}
                db.vip = {}
                await m.reply("Success clear owner")
                cmdSuccess(command, "storage menu")
            } else if (m.text == "prem" || m.text == "premium" || m.text == "2") {
                if (Object.keys(db.premium).length == 0) return m.reply("Tidak ada yang bisa di clear kak ☺") 
                db.premium = {}
                await m.reply("Success clear premium")
                cmdSuccess(command, "storage menu")
            } else if (m.text == "sewa" || m.text == "3") {
                if (Object.keys(db.sewa).length == 0) return m.reply("Tidak ada yang bisa di clear kak ☺") 
                db.sewa = {}
                await m.reply("Success clear sewa")
                cmdSuccess(command, "storage menu")
            } else if (m.text == "ban" || m.text == "4") {
                if (Object.keys(db.banned).length == 0) return m.reply("Tidak ada yang bisa di clear kak ☺") 
                db.banned = {}
                await m.reply("Success clear banned users")
                cmdSuccess(command, "storage menu")
            } else if (m.text == "blockcmd" || m.text == "5") {
                if (db.blockcmd.length == 0) return m.reply("Tidak ada yang bisa di clear kak ☺") 
                db.blockcmd = []
                await m.reply("Success clear block command")
                cmdSuccess(command, "storage menu")
            } else if (m.text == "error" || m.text == "6") {
                if (Object.keys(db.listerror).length == 0) return m.reply("Tidak ada yang bisa di clear kak ☺") 
                db.listerror = {}
                await m.reply("Success clear error")
                cmdSuccess(command, "storage menu")
            } else if (m.text == "db" || m.text == "7") {
                if (Object.keys(db.listerror).length == 0) return m.reply("Tidak ada yang bisa di clear kak ☺") 
                db = {}
                await m.reply("Success clear database")
                cmdSuccess(command, "storage menu")
            } else if (m.text == "users" || m.text == "8") {
                if (Object.keys(db.listerror).length == 0) return m.reply("Tidak ada yang bisa di clear kak ☺") 
                db.users = {}
                await m.reply("Success clear users")
                cmdSuccess(command, "storage menu")
            } else {
                m.reply("\`\`\`「 CLEAR STORAGE 」\`\`\`\n\n1. owner\n2. prem\n3. sewa\n4. ban\n5. blockcmd\n6. error\n7. db\n8. users")
            }
        } catch (error) {
            cmdFailed(command, "storage menu", error)
        }
    }
}