const chalk = require("chalk")
const groupMessage = async (mywa, msg) => {
    try{
//================================================================\\
        const from = msg?.chatId
        const botNumber = mywa.info? (mywa.info.me._serialized || mywa.info.wid._serialized) : ""
        const sender = msg?.id?.participant?._serialized
        const senderNumber = msg?.id?.participant?.user
        const groupMetadata = (await mywa.groupMetadata(from).catch(e => {})) || {}
        const groupName = Object.keys(groupMetadata).length > 0? groupMetadata?.subject : ""
        const groupDescription = Object.keys(groupMetadata).length > 0? groupMetadata?.desc : ""
        const groupAdmins = Object.keys(groupMetadata).length > 0? groupMetadata?.participants.filter((x) => (x.isAdmin || x.isSuperAdmin)).map((x) => ((typeof x.id == "object" && x.id !== undefined)? x.id._serialized : x.id)) : []
        const isGroupAdmins = Object.keys(groupMetadata).length > 0? groupAdmins.includes(sender) : false
        const isWelcome = Object.keys(db.groups).includes(from)? db.groups[from].welcome : false
        const isSewa = db.settings.vipSewa.includes(from)? true : Object.keys(db.sewa).includes(from)? true : Object.keys(db.groups).includes(from)? db.groups[from].sewa.status : false
        const isMe = sender == botNumber
        const isAdd = msg?.type == "add" 
        const isLeave = msg?.leave == "leave"
//================================================================\\
        if (isSewa && (isAdd || isLeave) && !isMe && !isGroupAdmins && isWelcome && Object.keys(db.groups).includes(from) && db.groups[from].settings_welcome[msg.type] !== "" && db.groups[from].settings_welcome[msg.type].includes("{groupName}") && db.groups[from].settings_welcome[msg.type].includes("{users}") && db.groups[from].settings_welcome[msg.type].includes("{desc}")) {
            const teks1 = db.groups[from].settings_welcome[msg.type].split("{groupName}")
            if (teks1.length == 4) {
                var teks2 = teks1[0] + groupName + teks1[1] + groupName + teks1[2] + groupName + teks1[3]
            } else if (teks1.length == 3) {
                var teks2 = teks1[0] + groupName + teks1[1] + groupName + teks1[2]
            } else {
                var teks2 = teks1[0] + groupName + teks1[1]
            }
            const teks3 = teks2.split("{users}")
            if (teks3.length == 4) {
                var teks4 = teks3[0] + senderNumber + teks3[1] + senderNumber + teks3[2] + senderNumber + teks3[3]
            } else if (teks3.length == 3) {
                var teks4 = teks3[0] + senderNumber + teks3[1] + senderNumber + teks3[2]
            } else {
                var teks4 = teks3[0] + senderNumber + teks3[1]
            }
            const teks5 = teks4.split("{desc}")
            const teksWelcome = teks5[0] + groupDescription + teks5[1]
            mywa.sendMessageV2(from, { text: teksWelcome, mentions: [...teksWelcome.matchAll(/@([0-9]{5,16}|0)/g)].map((x) => x[1]).filter((x) => m.isNumber(parseInt(x))).map((x) => x + "@c.us"), contextInfo: { isForwarded: true, forwardingScore: 999 }})
        } else if (isSewa && (isAdd || isLeave) && !isMe && !isGroupAdmins && isWelcome && Object.keys(db.groups).includes(from) && db.groups[from].settings_welcome[msg.type] !== "" && db.groups[from].settings_welcome[msg.type].includes("{groupName}") && db.groups[from].settings_welcome[msg.type].includes("{users}")) {
            const teks1 = db.groups[from].settings_welcome[msg.type].split("{groupName}")
            if (teks1.length == 4) {
                var teks2 = teks1[0] + groupName + teks1[1] + groupName + teks1[2] + groupName + teks1[3]
            } else if (teks1.length == 3) {
                var teks2 = teks1[0] + groupName + teks1[1] + groupName + teks1[2]
            } else {
                var teks2 = teks1[0] + groupName + teks1[1]
            }
            const teks3 = teks2.split("{users}")
            if (teks3.length == 4) {
                var teks4 = teks3[0] + senderNumber + teks3[1] + senderNumber + teks3[2] + senderNumber + teks3[3]
            } else if (teks3.length == 3) {
                var teks4 = teks3[0] + senderNumber + teks3[1] + senderNumber + teks3[2]
            } else {
                var teks4 = teks3[0] + senderNumber + teks3[1]
            }
            const teksWelcome = teks4
            mywa.sendMessageV2(from, { text: teksWelcome, mentions: [...teksWelcome.matchAll(/@([0-9]{5,16}|0)/g)].map((x) => x[1]).filter((x) => m.isNumber(parseInt(x))).map((x) => x + "@c.us"), contextInfo: { isForwarded: true, forwardingScore: 999 }})
        } else if (isSewa && (isAdd || isLeave) && !isMe && !isGroupAdmins && isWelcome && Object.keys(db.groups).includes(from) && db.groups[from].settings_welcome[msg.type] !== "" && db.groups[from].settings_welcome[msg.type].includes("{groupName}")) {
            const teks1 = db.groups[from].settings_welcome[msg.type].split("{groupName}")
            if (teks1.length == 4) {
                var teks2 = teks1[0] + groupName + teks1[1] + groupName + teks1[2] + groupName + teks1[3]
            } else if (teks1.length == 3) {
                var teks2 = teks1[0] + groupName + teks1[1] + groupName + teks1[2]
            } else {
                var teks2 = teks1[0] + groupName + teks1[1]
            }
            const teksWelcome = teks2
            mywa.sendMessageV2(from, { text: teksWelcome, mentions: [...teksWelcome.matchAll(/@([0-9]{5,16}|0)/g)].map((x) => x[1]).filter((x) => m.isNumber(parseInt(x))).map((x) => x + "@c.us"), contextInfo: { isForwarded: true, forwardingScore: 999 }})
        } else if (isSewa && (isAdd || isLeave) && !isMe && !isGroupAdmins && isWelcome && Object.keys(db.groups).includes(from) && db.groups[from].settings_welcome[msg.type] !== "" && db.groups[from].settings_welcome[msg.type].includes("{users}")) {
            const teks1 = db.groups[from].settings_welcome[msg.type].split("{users}")
            if (teks1.length == 4) {
                var teks2 = teks1[0] + senderNumber + teks1[1] + senderNumber + teks1[2] + senderNumber + teks1[3]
            } else if (teks1.length == 3) {
                var teks2 = teks1[0] + senderNumber + teks1[1] + senderNumber + teks1[2]
            } else {
                var teks2 = teks1[0] + senderNumber + teks1[1]
            }
            const teksWelcome = teks2
            mywa.sendMessageV2(from, { text: teksWelcome, mentions: [...teksWelcome.matchAll(/@([0-9]{5,16}|0)/g)].map((x) => x[1]).filter((x) => m.isNumber(parseInt(x))).map((x) => x + "@c.us"), contextInfo: { isForwarded: true, forwardingScore: 999 }})
        } else if (isSewa && (isAdd || isLeave) && !isMe && !isGroupAdmins && isWelcome && Object.keys(db.groups).includes(from) && db.groups[from].settings_welcome[msg.type] !== "") {
            const teksWelcome = db.groups[from].settings_welcome[msg.type]
            mywa.sendMessageV2(from, { text: teksWelcome, mentions: [...teksWelcome.matchAll(/@([0-9]{5,16}|0)/g)].map((x) => x[1]).filter((x) => m.isNumber(parseInt(x))).map((x) => x + "@c.us"), contextInfo: { isForwarded: true, forwardingScore: 999 }})
        }
//================================================================\\
    } catch (err) {
        console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ ERROR ]"), `${err}`)
    }
}


module.exports = { groupMessage }