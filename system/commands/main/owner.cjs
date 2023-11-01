module.exports = {
    commands: ["owner"],
    tags: "main menu", 
    callback: async ({ mywa, m, command, cmdSuccess, cmdFailed }) => {
        try {
            let contact = []
            if (m.isOwner(m.sender) && db.devoloper == db.settings.ownerNumber) {
                var data = [db.settings.ownerNumber + "@c.us", ...Object.keys(db.owner), ...Object.keys(db.vip)]
            } else if (db.devoloper == db.settings.ownerNumber) {
                var data = [db.settings.ownerNumber + "@c.us", ...Object.keys(db.vip)]
            } else if (m.isOwner(m.sender)) {
                var data = [db.devoloper + "@c.us", db.settings.ownerNumber + "@c.us", ...Object.keys(db.owner), ...Object.keys(db.vip)]
            } else {
                var data = [db.devoloper + "@c.us", db.settings.ownerNumber + "@c.us", ...Object.keys(db.vip)]
            }
            for (let x of data) {
                contact.push((await mywa.getContactById(x)))
            }
            m.reply(contact.length == 1? contact[0] : contact, m.chat, db.settings.replyType, [], m.sender, { type: "contact", quoted: m })
            cmdSuccess(command, "main menu")
        } catch (error) {
            cmdFailed(command, "main menu", error)
        }
    }
}
