const fs = require("fs") 
const util = require("util") 
const i18n = require("i18n") 
const { imageToUrl } = require("../../libs/converter.cjs")
module.exports = {
    commands: ["setpay"],
    tags: "store menu", 
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    callback: async ({ mywa, m, command, cmdSuccess, cmdFailed, isImage, isQuotedImage }) => {
        try {
            if (isQuotedImage || image) {
                const teks = (m.quoted && m.text == "")? m.quoted.body : m.text
                const id = fs.readdirSync("./temp").filter((x) => !x.includes("Zzzzzzzzzz@4.0.4")).length + 1
                const media = await mywa.downloadAndSaveMediaMessage((isQuotedImage? m.quoted : m), "./temp/" + id)
                const { status, data, message } = await imageToUrl(media) 
                if (!status) return m.reply(util.format(message))
                db.groups[m.chat].store.payment.image = data
                if (teks !== "") {
                    db.groups[m.chat].store.payment.text = teks
                }
                m.reply("Success set payment.")
                cmdSuccess(command, "store menu")
            } else if (m.quoted && m.quoted.body !== "" && m.text == "") {
                db.groups[m.chat].store.payment.text = m.quoted.body
                m.reply("Success set payment.")
                cmdSuccess(command, "store menu")
            } else if (m.text !== "") {
                db.groups[m.chat].store.payment.text = m.text
                m.reply("Success set payment.")
                cmdSuccess(command, "store menu")
            } else {
                m.reply("Example not found")
            }
        } catch (error) {
            cmdFailed(command, "store menu", error)
        }
    }
}