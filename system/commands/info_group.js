const fs = require("fs") 
const chalk = require("chalk")
const moment = require("moment-timezone")
module.exports = {
    commands: ["infogc"],
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    callback: async ({ sock, m, isBotGroupAdmins, groupName, groupMembers, groupAdmins, groupOwner, groupMetadata }) => {
        let teks = "\`\`\`「  INFO GROUP  」\`\`\`\n\n"
        teks += ` *•* Name : ${groupName}\n`
        teks += ` *•* Owner : ${groupOwner !== undefined ? "@" + groupOwner.split("@")[0] : "Tidak diketahui"}\n`
        teks += ` *•* Creation : ${moment(groupMetadata.creation * 1000).tz("Asia/Jakarta").format("DD/MM/YYYY HH:mm:ss")}\n`
        teks += ` *•* Total Admins : ${groupAdmins.length}\n`
        teks += ` *•* Total Members : ${groupMembers.length}\n`
        teks += ` *•* Anti Link : ${db.chats[m.chat]?.antilink? "ON✅" : "OFF❌"}\n`        
        teks += ` *•* Anti Link Youtube : ${db.chats[m.chat]?.antilinkyt? "ON✅" : "OFF❌"}\n`
        teks += ` *•* Anti Link Facebook : ${db.chats[m.chat]?.antilinkfb? "ON✅" : "OFF❌"}\n`
        teks += ` *•* Anti Link Instagram : ${db.chats[m.chat]?.antilinkig? "ON✅" : "OFF❌"}\n`
        teks += ` *•* Anti Link Telegram : ${db.chats[m.chat]?.antilinktele? "ON✅" : "OFF❌"}\n`
        teks += ` *•* Anti Link Whatsapp : ${db.chats[m.chat]?.antilinkwa? "ON✅" : "OFF❌"}\n`
        teks += ` *•* Anti Link Tiktok : ${db.chats[m.chat]?.antilinktiktok? "ON✅" : "OFF❌"}\n`
        teks += ` *•* Anti Link Twitter : ${db.chats[m.chat]?.antilinktwitter? "ON✅" : "OFF❌"}\n`
        teks += ` *•* Anti Tag : ${db.chats[m.chat]?.antitag? "ON✅" : "OFF❌"}\n`
        teks += ` *•* Anti Delete : ${db.chats[m.chat]?.antidelete? "ON✅" : "OFF❌"}\n`
        teks += ` *•* Anti Virtex : ${db.chats[m.chat]?.antivirtex? "ON✅" : "OFF❌"}\n`
        teks += ` *•* Anti Asing : ${db.chats[m.chat]?.antiasing? "ON✅" : "OFF❌"}\n`
        teks += ` *•* Anti Toxic : ${db.chats[m.chat]?.antitoxic? "ON✅" : "OFF❌"}\n`
        teks += ` *•* Anti Sange : ${db.chats[m.chat]?.antisange? "ON✅" : "OFF❌"}\n`
        teks += ` *•* Anti View Once : ${db.chats[m.chat]?.antiviewonce? "ON✅" : "OFF❌"}\n`
        teks += ` *•* Auto React Group : ${db.chats[m.chat]?.autoreactgc? "ON✅" : "OFF❌"}\n`
        teks += ` *•* Auto Respon Group : ${db.chats[m.chat]?.autorespongc? "ON✅" : "OFF❌"}\n`
        teks += ` *•* Mute Group : ${db.chats[m.chat]?.mute? "ON✅" : "OFF❌"}\n`
        teks += ` *•* Welcome Group : ${db.chats[m.chat]?.welcome? "ON✅" : "OFF❌"}`
        await m.reply(teks)
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})