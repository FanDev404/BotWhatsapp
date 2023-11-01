const fs = require("fs") 
const chalk = require("chalk")
const util = require("util") 
const i18n = require("i18n")
module.exports = {
    commands: ["rord"],
    cooldown: 13,
    minArgs: 1,
    expectedArgs: "<teks>",
    example: "{prefix}{command} delete@antilink",
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    isBotAdmin: true,
    callback: async ({ m }) => {
        const data = Object.keys(db.chats[m.chat].rord).map((x) => "@" + x).filter((x) => m.text.includes(x))
        if (data.length == 1 && data[0] == "@antilink") {
        if (db.chats[m.chat].antilink == false) return m.reply("Fiture anti link belum active") 
        if (m.text.includes("delete")) {
        if (db.chats[m.chat].rord.antilink == "delete") return m.reply("Sudah active")
        db.chats[m.chat].rord.antilink = "delete"
        m.reply(util.format(i18n.__("success"))) 
        } else if (m.text.includes("remove")) {
        if (db.chats[m.chat].rord.antilink == "remove") return m.reply("Sudah active")
        db.chats[m.chat].rord.antilink = "remove"
        m.reply(util.format(i18n.__("success"))) 
        } else if (m.text.includes("all")) {
        if (db.chats[m.chat].rord.antilink == "all") return m.reply("Sudah active")
        db.chats[m.chat].rord.antilink = "all"
        m.reply(util.format(i18n.__("success"))) 
        } else m.reply("\`\`\`「 VERSION 」\`\`\`\n\n- delete\n- remove\n- all")
        } else if (data.length == 1 && data[0] == "@antilinkyt") {
        if (db.chats[m.chat].antilinkyt == false) return m.reply("Fiture anti link youtube belum active") 
        if (m.text.includes("delete")) {
        if (db.chats[m.chat].rord.antilinkyt == "delete") return m.reply("Sudah active")
        db.chats[m.chat].rord.antilinkyt = "delete"
        m.reply(util.format(i18n.__("success"))) 
        } else if (m.text.includes("remove")) {
        if (db.chats[m.chat].rord.antilinkyt == "remove") return m.reply("Sudah active")
        db.chats[m.chat].rord.antilinkyt = "remove"
        m.reply(util.format(i18n.__("success"))) 
        } else if (m.text.includes("all")) {
        if (db.chats[m.chat].rord.antilinkyt == "all") return m.reply("Sudah active")
        db.chats[m.chat].rord.antilinkyt = "all"
        m.reply(util.format(i18n.__("success"))) 
        } else m.reply("\`\`\`「 VERSION 」\`\`\`\n\n- delete\n- remove\n- all")
        } else if (data.length == 1 && data[0] == "@antilinkfb") {
        if (db.chats[m.chat].antilinkfb == false) return m.reply("Fiture anti link facebook belum active") 
        if (m.text.includes("delete")) {
        if (db.chats[m.chat].rord.antilinkfb == "delete") return m.reply("Sudah active")
        db.chats[m.chat].rord.antilinkfb = "delete"
        m.reply(util.format(i18n.__("success"))) 
        } else if (m.text.includes("remove")) {
        if (db.chats[m.chat].rord.antilinkfb == "remove") return m.reply("Sudah active")
        db.chats[m.chat].rord.antilinkfb = "remove"
        m.reply(util.format(i18n.__("success"))) 
        } else if (m.text.includes("all")) {
        if (db.chats[m.chat].rord.antilinkfb == "all") return m.reply("Sudah active")
        db.chats[m.chat].rord.antilinkfb = "all"
        m.reply(util.format(i18n.__("success"))) 
        } else m.reply("\`\`\`「 VERSION 」\`\`\`\n\n- delete\n- remove\n- all")
        } else if (data.length == 1 && data[0] == "@antilinkig") {
        if (db.chats[m.chat].antilinkig == false) return m.reply("Fiture anti link instagram belum active") 
        if (m.text.includes("delete")) {
        if (db.chats[m.chat].rord.antilinkig == "delete") return m.reply("Sudah active")
        db.chats[m.chat].rord.antilinkig = "delete"
        m.reply(util.format(i18n.__("success"))) 
        } else if (m.text.includes("remove")) {
        if (db.chats[m.chat].rord.antilinkig == "remove") return m.reply("Sudah active")
        db.chats[m.chat].rord.antilinkig = "remove"
        m.reply(util.format(i18n.__("success"))) 
        } else if (m.text.includes("all")) {
        if (db.chats[m.chat].rord.antilinkig == "all") return m.reply("Sudah active")
        db.chats[m.chat].rord.antilinkig = "all"
        m.reply(util.format(i18n.__("success"))) 
        } else m.reply("\`\`\`「 VERSION 」\`\`\`\n\n- delete\n- remove\n- all")
        } else if (data.length == 1 && data[0] == "@antilinktele") {
        if (db.chats[m.chat].antilinktele == false) return m.reply("Fiture anti link telegram belum active") 
        if (m.text.includes("delete")) {
        if (db.chats[m.chat].rord.antilinktele == "delete") return m.reply("Sudah active")
        db.chats[m.chat].rord.antilinktele = "delete"
        m.reply(util.format(i18n.__("success"))) 
        } else if (m.text.includes("remove")) {
        if (db.chats[m.chat].rord.antilinktele == "remove") return m.reply("Sudah active")
        db.chats[m.chat].rord.antilinktele = "remove"
        m.reply(util.format(i18n.__("success"))) 
        } else if (m.text.includes("all")) {
        if (db.chats[m.chat].rord.antilinktele == "all") return m.reply("Sudah active")
        db.chats[m.chat].rord.antilinktele = "all"
        m.reply(util.format(i18n.__("success"))) 
        } else m.reply("\`\`\`「 VERSION 」\`\`\`\n\n- delete\n- remove\n- all")
        } else if (data.length == 1 && data[0] == "@antilinkwa") {
        if (db.chats[m.chat].antilinkwa == false) return m.reply("Fiture anti link whatsapp belum active") 
        if (m.text.includes("delete")) {
        if (db.chats[m.chat].rord.antilinkwa == "delete") return m.reply("Sudah active")
        db.chats[m.chat].rord.antilinkwa = "delete"
        m.reply(util.format(i18n.__("success"))) 
        } else if (m.text.includes("remove")) {
        if (db.chats[m.chat].rord.antilinkwa == "remove") return m.reply("Sudah active")
        db.chats[m.chat].rord.antilinkwa = "remove"
        m.reply(util.format(i18n.__("success"))) 
        } else if (m.text.includes("all")) {
        if (db.chats[m.chat].rord.antilinkwa == "all") return m.reply("Sudah active")
        db.chats[m.chat].rord.antilinkwa = "all"
        m.reply(util.format(i18n.__("success"))) 
        } else m.reply("\`\`\`「 VERSION 」\`\`\`\n\n- delete\n- remove\n- all")
        } else if (data.length == 1 && data[0] == "@antilinktiktok") {
        if (db.chats[m.chat].antilinktiktok == false) return m.reply("Fiture anti link tiktok belum active") 
        if (m.text.includes("delete")) {
        if (db.chats[m.chat].rord.antilinktiktok == "delete") return m.reply("Sudah active")
        db.chats[m.chat].rord.antilinktiktok = "delete"
        m.reply(util.format(i18n.__("success"))) 
        } else if (m.text.includes("remove")) {
        if (db.chats[m.chat].rord.antilinktiktok == "remove") return m.reply("Sudah active")
        db.chats[m.chat].rord.antilinktiktok = "remove"
        m.reply(util.format(i18n.__("success"))) 
        } else if (m.text.includes("all")) {
        if (db.chats[m.chat].rord.antilinktiktok == "all") return m.reply("Sudah active")
        db.chats[m.chat].rord.antilinktiktok = "all"
        m.reply(util.format(i18n.__("success"))) 
        } else m.reply("\`\`\`「 VERSION 」\`\`\`\n\n- delete\n- remove\n- all")
        } else if (data.length == 1 && data[0] == "@antilinktwitter") {
        if (db.chats[m.chat].antilinktwitter == false) return m.reply("Fiture anti link twitter belum active") 
        if (m.text.includes("delete")) {
        if (db.chats[m.chat].rord.antilinktwitter == "delete") return m.reply("Sudah active")
        db.chats[m.chat].rord.antilinktwitter = "delete"
        m.reply(util.format(i18n.__("success"))) 
        } else if (m.text.includes("remove")) {
        if (db.chats[m.chat].rord.antilinktwitter == "remove") return m.reply("Sudah active")
        db.chats[m.chat].rord.antilinktwitter = "remove"
        m.reply(util.format(i18n.__("success"))) 
        } else if (m.text.includes("all")) {
        if (db.chats[m.chat].rord.antilinktwitter == "all") return m.reply("Sudah active")
        db.chats[m.chat].rord.antilinktwitter = "all"
        m.reply(util.format(i18n.__("success"))) 
        } else m.reply("\`\`\`「 VERSION 」\`\`\`\n\n- delete\n- remove\n- all")
        } else if (data.length == 1 && data[0] == "@antivirtex") {
        if (db.chats[m.chat].antivirtex == false) return m.reply("Fiture anti virtex belum active") 
        if (m.text.includes("delete")) {
        if (db.chats[m.chat].rord.antivirtex == "delete") return m.reply("Sudah active")
        db.chats[m.chat].rord.antivirtex = "delete"
        m.reply(util.format(i18n.__("success"))) 
        } else if (m.text.includes("remove")) {
        if (db.chats[m.chat].rord.antivirtex == "remove") return m.reply("Sudah active")
        db.chats[m.chat].rord.antivirtex = "remove"
        m.reply(util.format(i18n.__("success"))) 
        } else if (m.text.includes("all")) {
        if (db.chats[m.chat].rord.antivirtex == "all") return m.reply("Sudah active")
        db.chats[m.chat].rord.antivirtex = "all"
        m.reply(util.format(i18n.__("success"))) 
        } else m.reply("\`\`\`「 VERSION 」\`\`\`\n\n- delete\n- remove\n- all")
        } else if (data.length == 1 && data[0] == "@antitag") {
        if (db.chats[m.chat].antitag == false) return m.reply("Fiture anti tag belum active") 
        if (m.text.includes("delete")) {
        if (db.chats[m.chat].rord.antitag == "delete") return m.reply("Sudah active")
        db.chats[m.chat].rord.antitag = "delete"
        m.reply(util.format(i18n.__("success"))) 
        } else if (m.text.includes("remove")) {
        if (db.chats[m.chat].rord.antitag == "remove") return m.reply("Sudah active")
        db.chats[m.chat].rord.antitag = "remove"
        m.reply(util.format(i18n.__("success"))) 
        } else if (m.text.includes("all")) {
        if (db.chats[m.chat].rord.antitag == "all") return m.reply("Sudah active")
        db.chats[m.chat].rord.antitag = "all"
        m.reply(util.format(i18n.__("success"))) 
        } else m.reply("\`\`\`「 VERSION 」\`\`\`\n\n- delete\n- remove\n- all")
        } else if (data.length == 1 && data[0] == "@antitoxic") {
        if (db.chats[m.chat].antitoxic == false) return m.reply("Fiture anti toxic belum active") 
        if (m.text.includes("delete")) {
        if (db.chats[m.chat].rord.antitoxic == "delete") return m.reply("Sudah active")
        db.chats[m.chat].rord.antitoxic = "delete"
        m.reply(util.format(i18n.__("success"))) 
        } else if (m.text.includes("remove")) {
        if (db.chats[m.chat].rord.antitoxic == "remove") return m.reply("Sudah active")
        db.chats[m.chat].rord.antitoxic = "remove"
        m.reply(util.format(i18n.__("success"))) 
        } else if (m.text.includes("all")) {
        if (db.chats[m.chat].rord.antitoxic == "all") return m.reply("Sudah active")
        db.chats[m.chat].rord.antitoxic = "all"
        m.reply(util.format(i18n.__("success"))) 
        } else m.reply("\`\`\`「 VERSION 」\`\`\`\n\n- delete\n- remove\n- all")
        } else if (data.length == 1 && data[0] == "@antisange") {
        if (db.chats[m.chat].antisange == false) return m.reply("Fiture anti sange belum active") 
        if (m.text.includes("delete")) {
        if (db.chats[m.chat].rord.antisange == "delete") return m.reply("Sudah active")
        db.chats[m.chat].rord.antisange = "delete"
        m.reply(util.format(i18n.__("success"))) 
        } else if (m.text.includes("remove")) {
        if (db.chats[m.chat].rord.antisange == "remove") return m.reply("Sudah active")
        db.chats[m.chat].rord.antisange = "remove"
        m.reply(util.format(i18n.__("success"))) 
        } else if (m.text.includes("all")) {
        if (db.chats[m.chat].rord.antisange == "all") return m.reply("Sudah active")
        db.chats[m.chat].rord.antisange = "all"
        m.reply(util.format(i18n.__("success"))) 
        } else m.reply("\`\`\`「 VERSION 」\`\`\`\n\n- delete\n- remove\n- all")
        } else {
        m.reply("*TAGS KEYS*\n- @antilink\n- @antilinkyt\n- @antilinkfb\n- @antilinkig\n- @antilinktele\n- @antilinkwa\n- @antilinktiktok\n- @antilinktwitter\n- @antivirtex\n- @antitag\n- @antitoxic\n- @antisange\n\n*VERSION*\n- delete\n- remove\n- all")
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