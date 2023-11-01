const fs = require("fs") 
const chalk = require("chalk") 
const util = require("util") 
const i18n = require("i18n") 
const moment = require("moment-timezone") 
const { exec } = require("child_process") 


const Message = async (mywa, m, msg) => {
           try{
               const { 
                   timeToEpired, 
                   runtime, 
                   formatSize, 
                   fetchBase64, 
                   fetchBuffer, 
                   fetchJson, 
                   isBase64, 
                   time, 
                   week, 
                   calender, 
                   getRandom, 
                   isFiles, 
                   resizeImage, 
                   toFirstCase, 
                   isUrl, 
                   pickRandom, 
                   randomNomor, 
                   checkNSFW, 
                   sleep, 
                   randomCode
               } = (await import("../libs/function.js"))
//================================================================\\
               const isText = m.type == "chat"
               const isAudio = m.type == "audio"
               const isVoice = m.type == "ptt"
               const isImage = m.type == "image"
               const isVideo = m.type == "video"
               const isDocument = m.type == "document"
               const isSticker = m.type == "sticker"
               const isViewOnce = m?.isViewOnce? ["image","video"].includes(m.type) : false
               const isLocation = m.type == "location"
               const isContact = m.type == "vcard"
               const isContactMulti = m.type == "multi_vcard"
               const isOrder = m.type == "order"
               const isProduct = m.type == "product"
               const isGroupInvite = m.type == "groups_v4_invite"
               const isProtocol = m.type == "protocol"
               const isPollVote = m.type == "poll_vote"
               const isPollCreation = m.type == "poll_creation"
               const isQuotedText = m.quoted? m.quoted.type == "chat" : false
               const isQuotedAudio = m.quoted? m.quoted.type == "audio" : false
               const isQuotedVoice = m.quoted? m.quoted.type == "ptt" : false
               const isQuotedImage = m.quoted? m.quoted.type == "image" : false
               const isQuotedVideo = m.quoted? m.quoted.type == "video" : false
               const isQuotedDocument = m.quoted? m.quoted.type == "document" : false
               const isQuotedSticker = m.quoted? m.quoted.type == "sticker" : false
               const isQuotedViewOnce = (m.quoted && m.quoted?.isViewOnce)? ["image","video"].includes(m.quoted.type) : false
               const isQuotedLocation = m.quoted? m.quoted.type == "location" : false
               const isQuotedContact = m.quoted? m.quoted.type == "vcard" : false
               const isQuotedContactMulti = m.quoted? m.quoted.type == "multi_vcard" : false
               const isQuotedOrder = m.quoted? m.quoted.type == "order" : false
               const isQuotedProduct = m.quoted? m.quoted.type == "product" : false
               const isQuotedGroupInvite = m.quoted? m.quoted.type == "groups_v4_invite" : false
               const isQuotedPollCreation = m.quoted? m.quoted.type == "poll_creation" : false
//================================================================\\
               const isAntiLink = Object.keys(db.groups).includes(m.chat)? db.groups[m.chat].anti_link.status : false
               const isAntiLinkYoutube = Object.keys(db.groups).includes(m.chat)? db.groups[m.chat].anti_link_youtube.status : false
               const isAntiLinkFacebook = Object.keys(db.groups).includes(m.chat)? db.groups[m.chat].anti_link_facebook.status : false
               const isAntiLinkInstagram = Object.keys(db.groups).includes(m.chat)? db.groups[m.chat].anti_link_instagram.status : false
               const isAntiLinkTwitter = Object.keys(db.groups).includes(m.chat)? db.groups[m.chat].anti_link_twitter.status : false
               const isAntiLinkTelegram = Object.keys(db.groups).includes(m.chat)? db.groups[m.chat].anti_link_telegram.status : false
               const isAntiLinkWhatsapp = Object.keys(db.groups).includes(m.chat)? db.groups[m.chat].anti_link_whatsapp.status : false
               const isAntiLinkTiktok = Object.keys(db.groups).includes(m.chat)? db.groups[m.chat].anti_link_tiktok.status : false
               const isAntiVirtex = Object.keys(db.groups).includes(m.chat)? db.groups[m.chat].anti_virtex.status : false
               const isAntiTags = Object.keys(db.groups).includes(m.chat)? db.groups[m.chat].anti_tag.status : false
               const isAntiToxic = Object.keys(db.groups).includes(m.chat)? db.groups[m.chat].anti_toxic.status : false
               const isAntiSange = Object.keys(db.groups).includes(m.chat)? db.groups[m.chat].anti_sange.status : false
               const isAntiNfsw = Object.keys(db.groups).includes(m.chat)? db.groups[m.chat].anti_nfsw.status : false
               const isAntiAsing = Object.keys(db.groups).includes(m.chat)? db.groups[m.chat].anti_asing : false
               const isAntiDelete = Object.keys(db.groups).includes(m.chat)? db.groups[m.chat].anti_delete : false
               const isAntiViewOnce = Object.keys(db.groups).includes(m.chat)? db.groups[m.chat].anti_view_once : false
               const isMuteChats = Object.keys(db.groups).includes(m.chat)? db.groups[m.chat].mute : false
               const localAfkGroup = Object.keys(db.groups).includes(m.chat)? db.groups[m.chat].afk_group : false
//================================================================\\
               if (db.settings.setPrefix == "multi") {
                   var thePrefix = "MULTI-PREFIX"
                   var prefix = m.body.startsWith("#")? "#" : m.body.startsWith("!")? "!" : m.body.startsWith("/")? "/" : m.body.startsWith("?")? "?" : "."
                   var isCmd = m.body.startsWith(prefix)
                   var command = isCmd? m.body.replace(prefix, "").trim().split(/ +/).shift().toLowerCase() : ""
                   var cmdOptions = commands.get(command) || {}
               } else if (db.settings.setPrefix == "no") {
                   var thePrefix = "NO-PREFIX"
                   var prefix = ""
                   var isCmd = m.body.startsWith(prefix)
                   var command = m.body.replace(prefix, "").trim().split(/ +/).shift().toLowerCase()
                   var cmdOptions = commands.get(command) || {}
               } else if (db.settings.setPrefix == "all") {
                   var thePrefix = "ALL-PREFIX"
                   var prefix = m.body.startsWith("#")? "#" : m.body.startsWith("!")? "!" : m.body.startsWith("/")? "/" : m.body.startsWith("?")? "?" : "."
                   var isCmd = m.body.startsWith(prefix)
                   var command = m.body.replace(prefix, "").trim().split(/ +/).shift().toLowerCase()
                   var cmdOptions = commands.get(command) || {}
               } else {
                   var thePrefix = "MULTI-PREFIX"
                   var prefix = m.body.startsWith("#")? "#" : m.body.startsWith("!")? "!" : m.body.startsWith("/")? "/" : m.body.startsWith("?")? "?" : "."
                   var isCmd = m.body.startsWith(prefix)
                   var command = isCmd? m.body.replace(prefix, "").trim().split(/ +/).shift().toLowerCase() : ""
                   var cmdOptions = commands.get(command) || {}
               }
//================================================================\\
               if (m.isBot) return
//================================================================\\
               if (db.settings.autoRead) mywa.sendSeen(m.chat)
//================================================================\\
               const command_log = [chalk.whiteBright("├"), chalk.keyword("aqua")(`[ ${m.isGroup? "GROUP" : "PRIVATE"} ]`), chalk.whiteBright(isAudio? "audio" : isVoice? "voice" : isSticker? "sticker" : isLocation? "location" : (isContact || isContactMulti)? "contact" : isOrder? "order" : isProduct? "product" : isGroupInvite? "invite" : isProtocol? "delete" : m.body.substr(0, 100).replace(/\n/g, "")), chalk.greenBright("from"), chalk.yellow(m.pushName)]
               if (m.isGroup) {
                   command_log.push(chalk.greenBright("in"))
                   command_log.push(chalk.yellow(m.groupName))
               }
               console.log(...command_log)
//================================================================\\
               if (m.groupAnnounce && !m.isBotGroupAdmins) {return}
//================================================================\\
               if (m.isGroup && isText && Object.keys(db.code).filter((x) => x.includes(m.budy)).length > 0) {
                   if (Object.keys(db.sewa).includes(m.chat) && db.sewa[m.chat].expired !== "PERMANEN" && !db.settings.vipSewa.includes(m.chat) || !Object.keys(db.sewa).includes(m.chat) && !db.settings.vipSewa.includes(m.chat)) {
                       const data = Object.keys(db.code).filter((x) => x.includes(m.budy))
                       const expired = (m.isNumber(parseFloat(db.code[data[0]].expired)) && (m.text.toLowerCase().includes("second") || m.text.toLowerCase().includes("detik")))? (Date.now() + time(`${parseFloat(db.code[data[0]].expired)}second`)) : (m.isNumber(parseFloat(db.code[data[0]].expired)) && (m.text.toLowerCase().includes("minute") || m.text.toLowerCase().includes("menit")))? (Date.now() + time(`${parseFloat(db.code[data[0]].expired)}minute`)) : (m.isNumber(parseFloat(db.code[data[0]].expired)) && (m.text.toLowerCase().includes("hour") || m.text.toLowerCase().includes("jam")))? (Date.now() + time(`${parseFloat(db.code[data[0]].expired)}hour`)) : (m.isNumber(parseFloat(db.code[data[0]].expired)) && (m.text.toLowerCase().includes("day") || m.text.toLowerCase().includes("hari")))? (Date.now() + time(`${parseFloat(db.code[data[0]].expired)}day`)) : (m.isNumber(parseFloat(db.code[data[0]].expired)) && (m.text.toLowerCase().includes("week") || m.text.toLowerCase().includes("minggu")))? (Date.now() + time(`${parseFloat(db.code[data[0]].expired)}week`)) : (m.isNumber(parseFloat(db.code[data[0]].expired)) && (m.text.toLowerCase().includes("month") || m.text.toLowerCase().includes("bulan")))? (Date.now() + time(`${parseFloat(db.code[data[0]].expired)}month`)) : (m.isNumber(parseFloat(db.code[data[0]].expired)) && (m.text.toLowerCase().includes("year") || m.text.toLowerCase().includes("tahun")))? (Date.now() + time(`${parseFloat(db.code[data[0]].expired)}year`)) : "PERMANEN"
                       if (Object.keys(db.groups).includes(m.chat) && db.groups[m.chat].sewa.status) db.groups[m.chat].sewa = { status: false, date: calender(), expired: 0 }
                       if (Object.keys(db.sewa).includes(m.chat) && m.isNumber(expired)) db.sewa[m.chat].expired += expired
                       if (Object.keys(db.sewa).includes(m.chat) && expired == "PERMANEN") db.sewa[m.chat].expired = expired
                       if (!Object.keys(db.sewa).includes(m.chat)) db.sewa[m.chat] = { "date": calender(), "expired": expired }
                       m.reply(`Success add sewa ${m.isNumber(expired)? (db.code[data[0]].expired + " ") : ""} ${m.groupName? ("to " + m.groupName) : ""}`)
                       setTimeout(() => {
                           delete db.code[data[0]]
                       }, 3000)
                   }
               }
//=================================================//
               if (Object.keys(db.owner).length > 0) {
                   for(const x of Object.keys(db.owner)) {
                       if (m.isNumber(db.owner[x].expired) && Date.now() >= db.owner[x].expired) {
                          const listBlock = (await mywa.getBlockedContacts()).map((x) => x.id._serialized)
                          delete db.owner[x]
                          if ((await mywa.isRegisteredUser(x)) && !listBlock.includes(x)) m.reply("Waktu menjadi owner kamu telah habis", x, db.settings.replyType, [], x, options = { type: "text" })
                       }
                   }
               }
//=================================================//
               if (Object.keys(db.premium).length > 0) {
                   for(const x of Object.keys(db.premium)) {
                       if (m.isNumber(db.premium[x].expired) && Date.now() >= db.premium[x].expired) {
                          const listBlock = (await mywa.getBlockedContacts()).map((x) => x.id._serialized)
                          delete db.premium[x]
                          if ((await mywa.isRegisteredUser(x)) && !listBlock.includes(x)) m.reply("Waktu menjadi premium kamu telah habis", x, db.settings.replyType, [], x, options = { type: "text" })
                       }
                   }
               }
//=================================================//
               if (Object.keys(db.groups).includes(m.chat) && db.groups[m.chat].sewa.status) {
                   if (Object.keys(db.sewa).includes(m.chat)) {
                       db.groups[m.chat].sewa = { status: false, date: calender(), expired: 0 }
                   } else if (m.isNumber(db.groups[m.chat].sewa.expired) && Date.now() >= db.groups[m.chat].sewa.expired) {
                       db.groups[m.chat].sewa = { status: false, date: calender(), expired: 0 }
                       m.reply("Waktu sewa group ini telah habis", m.chat, db.settings.replyType, m.groupAdmins)
                   }
               } else if (Object.keys(db.sewa).length > 0) {
                   for(const x of Object.keys(db.sewa)) {
                       if (m.isNumber(db.sewa[x].expired) && Date.now() >= db.sewa[x].expired) {
                          const listGroup = (await mywa.getAllGroups()).filter((x) => { return (x.announce && x.participants.map((v) => ((typeof v.id == "object" && v.id !== undefined)? v.id._serialized : v.id)).includes(m.botNumber) && x.participants.filter((v) => (v.isAdmin || v.isSuperAdmin)).map((v) => ((typeof v.id == "object" && v.id !== undefined)? v.id._serialized : v.id)).includes(m.botNumber) || !x.announce && x.participants.map((v) => ((typeof v.id == "object" && v.id !== undefined)? v.id._serialized : v.id)).includes(m.botNumber)) }).map((x) => x.id)
                          const groupMetadata = (await mywa.groupMetadata(x).catch(e => {})) || {}
                          const groupAdmins = Object.keys(groupMetadata).length > 0? groupMetadata.participants.filter((x) => (x.isAdmin || x.isSuperAdmin)).map((x) => ((typeof x.id == "object" && x.id !== undefined)? x.id._serialized : x.id)) : []
                          delete db.sewa[x]
                          if (listGroup.includes(x)) m.reply("Waktu sewa group ini telah habis", x, db.settings.replyType, groupMetadata, x, options = { type: "text" })
                       }
                   }
               }
//================================================================\\
               if (db.settings.mode == "self") {
                   if (!m.isOwner(m.sender) && !m.key.fromMe) return
               } else if (db.settings.mode == "group") {
                   if (!m.isGroup && !m.isOwner(m.sender) && !m.key.fromMe) return
               } else if (db.settings.mode == "private") {
                   if (m.isGroup && !m.isSewa(m.chat)) return
               }
//================================================================\\
               if (isMuteChats) {
                   if (!m.isOwner(m.sender) && !m.key.fromMe && !m.isGroupAdmins) return
               }
//================================================================\\
               const cmdSuccess = async(cmd, tags = "", type = "") => {
                   if (Object.keys(db.listerror).includes(cmd)) delete db.listerror[cmd]
                   if (!Object.keys(db.allcommand).includes(cmd) && type == "case") {
                       db.allcommand[cmd] = { type: "case", tags_menu: tags }
                   }
                   if (Object.keys(db.allcommand).includes(cmd) && tags !== "" && tags !== db.allcommand[cmd].tags_menu) {
                       db.allcommand[cmd].tags_menu = tags
                   }
                   if (Object.keys(db.allcommand).includes(cmd) && type == "" && type !== db.allcommand[cmd].type) {
                       db.allcommand[cmd].type = "file"
                   } else if (Object.keys(db.allcommand).includes(cmd) && type == "case" && type !== db.allcommand[cmd].type) {
                       db.allcommand[cmd].type = "case"
                   }
                   if (Object.keys(db.dashboard).includes(calender()) && Object.keys(db.dashboard[calender()]).includes("commands") && !Object.keys(db.dashboard[calender()].commands).includes(cmd)) {
                       db.dashboard[calender()].commands[cmd] = { succes: 1, failed: 0 }
                   } else if (Object.keys(db.dashboard).includes(calender()) && Object.keys(db.dashboard[calender()]).includes("commands") && Object.keys(db.dashboard[calender()].commands).includes(cmd)) {
                       db.dashboard[calender()].commands[cmd].succes += 1
                   }
                   if (!m.key.fromMe && !m.isPremium(m.sender) && db.settings.autoLevel) {
                       db.users[m.sender].xp += 1
                   }
               }
//================================================================\\
               const cmdFailed = async(cmd, tags = "", errors, type = "") => {
                   if (!Object.keys(db.listerror).includes(cmd)) db.listerror[cmd] = { error: errors.message }
                   if (Object.keys(db.listerror).includes(cmd) && db.listerror[cmd].error !== errors.message) db.listerror[cmd].error = errors.message
                   if (!Object.keys(db.allcommand).includes(cmd) && type == "case") {
                       db.allcommand[cmd] = { type: "case", tags_menu: tags }
                   }
                   if (Object.keys(db.allcommand).includes(cmd) && tags !== "" && tags !== db.allcommand[cmd].tags_menu) {
                       db.allcommand[cmd].tags_menu = tags
                   }
                   if (Object.keys(db.allcommand).includes(cmd) && type == "" && type !== db.allcommand[cmd].type) {
                       db.allcommand[cmd].type = "file"
                   } else if (Object.keys(db.allcommand).includes(cmd) && type == "case" && type !== db.allcommand[cmd].type) {
                       db.allcommand[cmd].type = "case"
                   }
                   if (Object.keys(db.dashboard).includes(calender()) && Object.keys(db.dashboard[calender()]).includes("commands") && !Object.keys(db.dashboard[calender()].commands).includes(cmd)) {
                       db.dashboard[calender()].commands[cmd] = { succes: 0, failed: 1 }
                   } else if (Object.keys(db.dashboard).includes(calender()) && Object.keys(db.dashboard[calender()]).includes("commands") && Object.keys(db.dashboard[calender()].commands).includes(cmd)) {
                       db.dashboard[calender()].commands[cmd].failed += 1
                   }
                   if (db.settings.autoBlockCmd && !db.blockcmd.includes(cmd)) { 
                       db.blockcmd.push(cmd) 
                   }
                   m.reply("\`\`\`「  SYSTEM ERROR  」\`\`\`\n\n" + util.format(errors))
                   if (db.settings.autoReport) {
                       let teks = ""
                       teks += "\`\`\`「  SYSTEM ERROR  」\`\`\`\n\n"
                       teks += `📳 Nomer : @${m.senderNumber}\n`
                       teks += `🔖 Command : ${prefix + command}\n`
                       teks += `📝 Example : ${m.body}\n`
                       teks += `📅 Date : ${week()}, ${calender()}\n`
                       teks += `⌚ Time : ${moment().tz("Asia/Jakarta").format("HH:mm:ss")}\n`
                       teks += `💬 Chatting : ${m.isGroup? "Group chats" : "Private chats"}\n`
                       teks += `📢 Info Laporan : ${util.format(errors)}`
                       if (m.senderNumber !== db.devoloper) m.reply(teks, db.devoloper + "@c.us")
                   }
               }
//================================================================\\
               if (m.isSewa(m.chat) && isAntiViewOnce && isViewOnce && command !== "rvo") {
                   if (!m.isOwner(m.sender) && !m.key.fromMe && !m.isGroupAdmins) {
                       let media = await mywa.downloadMediaMessage(m)
                       let teks = "\`\`\`「  PESAN SEKALI TERBUKA TERDETEKSI  」\`\`\`\n\n"
                       teks += `› Dari : @${m.senderNumber}\n`
                       teks += `› Waktu : ${moment().tz("Asia/Jakarta").format("HH:mm:ss")}\n`
                       teks += `› Tanggal : ${calender()}\n`
                       teks += `› Caption : ${m.body}\n`
                       teks += `› Type : ${isImage? "image" : "video"}`
                       if (isImage) m.reply(media, m.chat, db.settings.replyType, [], m.sender, { type: "image", caption: teks })
                       if (isVideo) m.reply(media, m.chat, db.settings.replyType, [], m.sender, { type: "video", caption: teks })
                   }
               }
//================================================================\\
               if (m.isSewa(m.chat) && isAntiNfsw && isImage) {
                   if (!m.isOwner(m.sender) && !m.key.fromMe && !m.isGroupAdmins) {
                       let media = await mywa.downloadMediaMessage(m)
                       let { status, data, message } = await checkNSFW(media)
                       if (status && data >= 60) {
                           const chat = await mywa.getChatById(m.chat)
                           m.reply("\`\`\`「  NFSW DETECTED  」\`\`\`")
                           if (db.groups[m.chat].anti_nfsw.type == "delete") {
                               setTimeout(() => {
                                   mywa.deleteMessage(m.key._serialized, true)
                               }, 2000) 
                           } else if (db.groups[m.chat].anti_nfsw.type == "remove") {
                               setTimeout(() => {
                                   chat.removeParticipants([m.sender])
                               }, 2000) 
                           } else if (db.groups[m.chat].anti_nfsw.type == "all") {
                               setTimeout(() => {
                               mywa.deleteMessage(m.key._serialized, true)
                                   chat.removeParticipants([m.sender])
                               }, 2000) 
                           }
                       }
                   }
               }
//================================================================\\
               if (m.isSewa(m.chat) && !m.sender.startsWith("62") && isAntiAsing && m.isBotGroupAdmins) {
                   if (!m.isOwner(m.sender) && !m.key.fromMe && !m.isGroupAdmins) {
                       const chat = await mywa.getChatById(m.chat)
                       m.reply("\`\`\`「  NOMER ASING DETECTED  」\`\`\`")
                       setTimeout(() => {
                           chat.removeParticipants([m.sender])
                       }, 2000)
                   }
               }
//================================================================\\
               if (m.isSewa(m.chat) && isAntiVirtex && m.body.length > 20000 && m.isBotGroupAdmins) {
                   if (!m.isOwner(m.sender) && !m.key.fromMe && !m.isGroupAdmins) {
                       const chat = await mywa.getChatById(m.chat)
                       const code = await chat.getInviteCode()
                       if (m.body.includes(code)) return
                       m.reply("\`\`\`「  VIRTEX DETECTED  」\`\`\`")
                       if (db.groups[m.chat].anti_virtex.type == "delete") {
                           setTimeout(() => {
                               mywa.deleteMessage(m.key._serialized, true)
                           }, 2000) 
                       } else if (db.groups[m.chat].anti_virtex.type == "remove") {
                           setTimeout(() => {
                               chat.removeParticipants([m.sender])
                           }, 2000) 
                       } else if (db.groups[m.chat].anti_virtex.type == "all") {
                           setTimeout(() => {
                               mywa.deleteMessage(m.key._serialized, true)
                               chat.removeParticipants([m.sender])
                           }, 2000) 
                       }
                   }
               }
//================================================================\\
               if (m.isSewa(m.chat) && isAntiToxic && i18n.__("kata_toxic").filter((x) => x.includes(m.budy.toLowerCase())).length > 0 && m.isBotGroupAdmins) {
                   if (!m.isOwner(m.sender) && !m.key.fromMe && !m.isGroupAdmins) {
                       const chat = await mywa.getChatById(m.chat)
                       const code = await chat.getInviteCode()
                       if (m.body.includes(code)) return
                       m.reply("\`\`\`「  TOXIC DETECTED  」\`\`\`")
                       if (db.groups[m.chat].anti_toxic.type == "delete") {
                           setTimeout(() => {
                               mywa.deleteMessage(m.key._serialized, true)
                           }, 2000) 
                       } else if (db.groups[m.chat].anti_toxic.type == "remove") {
                           setTimeout(() => {
                               chat.removeParticipants([m.sender])
                           }, 2000) 
                       } else if (db.groups[m.chat].anti_toxic.type == "all") {
                           setTimeout(() => {
                               mywa.deleteMessage(m.key._serialized, true)
                               chat.removeParticipants([m.sender])
                           }, 2000) 
                       }
                   }
               }
//================================================================\\
               if (m.isSewa(m.chat) && isAntiSange && i18n.__("kata_dosa").filter((x) => x.includes(m.budy.toLowerCase())).length > 0 && m.isBotGroupAdmins) {
                   if (!m.isOwner(m.sender) && !m.key.fromMe && !m.isGroupAdmins) {
                       const chat = await mywa.getChatById(m.chat)
                       const code = await chat.getInviteCode()
                       if (m.body.includes(code)) return
                       m.reply("\`\`\`「  SANGE DETECTED  」\`\`\`")
                       if (db.groups[m.chat].anti_sange.type == "delete") {
                           setTimeout(() => {
                               mywa.deleteMessage(m.key._serialized, true)
                           }, 2000) 
                       } else if (db.groups[m.chat].anti_sange.type == "remove") {
                           setTimeout(() => {
                               chat.removeParticipants([m.sender])
                           }, 2000) 
                       } else if (db.groups[m.chat].anti_sange.type == "all") {
                           setTimeout(() => {
                               mywa.deleteMessage(m.key._serialized, true)
                               chat.removeParticipants([m.sender])
                           }, 2000) 
                       }
                   }
               }
//================================================================\\
               if (m.isSewa(m.chat) && isAntiTags && m.isMention && m.isBotGroupAdmins) {
                   if (!m.isOwner(m.sender) && !m.key.fromMe && !m.isGroupAdmins) {
                       const chat = await mywa.getChatById(m.chat)
                       const code = await chat.getInviteCode()
                       if (m.body.includes(code)) return
                       m.reply("\`\`\`「  TAGS MEMBER DETECTED  」\`\`\`")
                       if (db.groups[m.chat].anti_tag.type == "delete") {
                           setTimeout(() => {
                               mywa.deleteMessage(m.key._serialized, true)
                           }, 2000) 
                       } else if (db.groups[m.chat].anti_tag.type == "remove") {
                           setTimeout(() => {
                               chat.removeParticipants([m.sender])
                           }, 2000) 
                       } else if (db.groups[m.chat].anti_tag.type == "all") {
                           setTimeout(() => {
                               mywa.deleteMessage(m.key._serialized, true)
                               chat.removeParticipants([m.sender])
                           }, 2000) 
                       }
                   }
               }
//================================================================\\
               if (m.isSewa(m.chat) && isAntiLink && m.body.includes("chat.whatsapp.com/") && m.body.split("chat.whatsapp.com/")[1] !== "" && m.isBotGroupAdmins) {
                   if (!m.isOwner(m.sender) && !m.key.fromMe && !m.isGroupAdmins) {
                       const chat = await mywa.getChatById(m.chat)
                       const code = await chat.getInviteCode()
                       if (m.body.includes(code)) return
                       m.reply("\`\`\`「  LINK GROUP DETECTED  」\`\`\`")
                       if (db.groups[m.chat].anti_link.type == "delete") {
                           setTimeout(() => {
                               mywa.deleteMessage(m.key._serialized, true)
                           }, 2000) 
                       } else if (db.groups[m.chat].anti_link.type == "remove") {
                           setTimeout(() => {
                               chat.removeParticipants([m.sender])
                           }, 2000) 
                       } else if (db.groups[m.chat].anti_link.type == "all") {
                           setTimeout(() => {
                               mywa.deleteMessage(m.key._serialized, true)
                               chat.removeParticipants([m.sender])
                           }, 2000) 
                       }
                   }
               }
//================================================================\\
               if (m.isSewa(m.chat) && isAntiLinkYoutube && (m.body.includes("youtube.com/") || m.body.includes("https://youtu.be/")) && (m.body.split("youtube.com/")[1] !== "" || m.body.split("https://youtu.be/")[1] !== "") && command !== "yt" && m.isBotGroupAdmins) {
                   if (!m.isOwner(m.sender) && !m.key.fromMe && !m.isGroupAdmins) {
                       const chat = await mywa.getChatById(m.chat)
                       m.reply("\`\`\`「  LINK YOUTUBE DETECTED  」\`\`\`")
                       if (db.groups[m.chat].anti_link_youtube.type == "delete") {
                           setTimeout(() => {
                               mywa.deleteMessage(m.key._serialized, true)
                           }, 2000) 
                       } else if (db.groups[m.chat].anti_link_youtube.type == "remove") {
                           setTimeout(() => {
                               chat.removeParticipants([m.sender])
                           }, 2000) 
                       } else if (db.groups[m.chat].anti_link_youtube.type == "all") {
                           setTimeout(() => {
                               mywa.deleteMessage(m.key._serialized, true)
                               chat.removeParticipants([m.sender])
                           }, 2000) 
                       }
                   }
               }
//================================================================\\
               if (m.isSewa(m.chat) && isAntiLinkFacebook && (m.body.includes("facebook.com/") || m.body.includes("https://fb.watch/")) && (m.body.split("facebook.com/")[1] !== "" || m.body.split("https://fb.watch/")[1] !== "") && command !== "fb" && m.isBotGroupAdmins) {
                   if (!m.isOwner(m.sender) && !m.key.fromMe && !m.isGroupAdmins) {
                       const chat = await mywa.getChatById(m.chat)
                       m.reply("\`\`\`「  LINK FACEBOOK DETECTED  」\`\`\`")
                       if (db.groups[m.chat].anti_link_facebook.type == "delete") {
                           setTimeout(() => {
                               mywa.deleteMessage(m.key._serialized, true)
                           }, 2000) 
                       } else if (db.groups[m.chat].anti_link_facebook.type == "remove") {
                           setTimeout(() => {
                               chat.removeParticipants([m.sender])
                           }, 2000) 
                       } else if (db.groups[m.chat].anti_link_facebook.type == "all") {
                           setTimeout(() => {
                               mywa.deleteMessage(m.key._serialized, true)
                               chat.removeParticipants([m.sender])
                           }, 2000) 
                       }
                   }
               }
//================================================================\\
               if (m.isSewa(m.chat) && isAntiLinkInstagram && m.body.includes("instagram.com/") && m.body.split("instagram.com/")[1] !== "" && command !== "ig" && m.isBotGroupAdmins) {
                   if (!m.isOwner(m.sender) && !m.key.fromMe && !m.isGroupAdmins) {
                       const chat = await mywa.getChatById(m.chat)
                       m.reply("\`\`\`「  LINK INSTAGRAM DETECTED  」\`\`\`")
                       if (db.groups[m.chat].anti_link_instagram.type == "delete") {
                           setTimeout(() => {
                               mywa.deleteMessage(m.key._serialized, true)
                           }, 2000) 
                       } else if (db.groups[m.chat].anti_link_instagram.type == "remove") {
                           setTimeout(() => {
                               chat.removeParticipants([m.sender])
                           }, 2000) 
                       } else if (db.groups[m.chat].anti_link_instagram.type == "all") {
                           setTimeout(() => {
                               mywa.deleteMessage(m.key._serialized, true)
                               chat.removeParticipants([m.sender])
                           }, 2000) 
                       }
                   }
               }
//================================================================\\
               if (m.isSewa(m.chat) && isAntiLinkTwitter && m.body.includes("twitter.com/") && m.body.split("twitter.com/")[1] !== "" && command !== "twitter" && m.isBotGroupAdmins) {
                   if (!m.isOwner(m.sender) && !m.key.fromMe && !m.isGroupAdmins) {
                       const chat = await mywa.getChatById(m.chat)
                       m.reply("\`\`\`「  LINK TWITTER DETECTED  」\`\`\`")
                       if (db.groups[m.chat].anti_link_twitter.type == "delete") {
                           setTimeout(() => {
                               mywa.deleteMessage(m.key._serialized, true)
                           }, 2000) 
                       } else if (db.groups[m.chat].anti_link_twitter.type == "remove") {
                           setTimeout(() => {
                               chat.removeParticipants([m.sender])
                           }, 2000) 
                       } else if (db.groups[m.chat].anti_link_twitter.type == "all") {
                           setTimeout(() => {
                               mywa.deleteMessage(m.key._serialized, true)
                               chat.removeParticipants([m.sender])
                           }, 2000) 
                       }
                   }
               }
//================================================================\\
               if (m.isSewa(m.chat) && isAntiLinkTelegram && m.body.includes("https://t.me/") && m.body.split("https://t.me/")[1] !== "" && m.isBotGroupAdmins) {
                   if (!m.isOwner(m.sender) && !m.key.fromMe && !m.isGroupAdmins) {
                       const chat = await mywa.getChatById(m.chat)
                       m.reply("\`\`\`「  LINK TELEGRAM DETECTED  」\`\`\`")
                       if (db.groups[m.chat].anti_link_telegram.type == "delete") {
                           setTimeout(() => {
                               mywa.deleteMessage(m.key._serialized, true)
                           }, 2000) 
                       } else if (db.groups[m.chat].anti_link_telegram.type == "remove") {
                           setTimeout(() => {
                               chat.removeParticipants([m.sender])
                           }, 2000) 
                       } else if (db.groups[m.chat].anti_link_telegram.type == "all") {
                           setTimeout(() => {
                               mywa.deleteMessage(m.key._serialized, true)
                               chat.removeParticipants([m.sender])
                           }, 2000) 
                       }
                   }
               }
//================================================================\\
               if (m.isSewa(m.chat) && isAntiLinkWhatsapp && (m.body.includes("wa.me/") || m.body.includes("Wa.me/")) && (m.body.split("wa.me/")[1] !== "" || m.body.split("Wa.me/")[1] !== "") && m.isBotGroupAdmins) {
                   if (!m.isOwner(m.sender) && !m.key.fromMe && !m.isGroupAdmins) {
                       const chat = await mywa.getChatById(m.chat)
                       m.reply("\`\`\`「  LINK WHATSAPP DETECTED  」\`\`\`")
                       if (db.groups[m.chat].anti_link_whatsapp.type == "delete") {
                           setTimeout(() => {
                               mywa.deleteMessage(m.key._serialized, true)
                           }, 2000) 
                       } else if (db.groups[m.chat].anti_link_whatsapp.type == "remove") {
                           setTimeout(() => {
                               chat.removeParticipants([m.sender])
                           }, 2000) 
                       } else if (db.groups[m.chat].anti_link_whatsapp.type == "all") {
                           setTimeout(() => {
                               mywa.deleteMessage(m.key._serialized, true)
                               chat.removeParticipants([m.sender])
                           }, 2000) 
                       }
                   }
               }
//================================================================\\
               if (m.isSewa(m.chat) && isAntiLinkTiktok && m.body.includes("tiktok.com/") && m.body.split("tiktok.com/")[1] !== "" && command !== "tiktok" && m.isBotGroupAdmins) {
                   if (!m.isOwner(m.sender) && !m.key.fromMe && !m.isGroupAdmins) {
                       const chat = await mywa.getChatById(m.chat)
                       m.reply("\`\`\`「  LINK TIKTOK DETECTED  」\`\`\`")
                       if (db.groups[m.chat].anti_link_tiktok.type == "delete") {
                           setTimeout(() => {
                               mywa.deleteMessage(m.key._serialized, true)
                           }, 2000) 
                       } else if (db.groups[m.chat].anti_link_tiktok.type == "remove") {
                           setTimeout(() => {
                               chat.removeParticipants([m.sender])
                           }, 2000) 
                       } else if (db.groups[m.chat].anti_link_tiktok.type == "all") {
                           setTimeout(() => {
                               mywa.deleteMessage(m.key._serialized, true)
                               chat.removeParticipants([m.sender])
                           }, 2000) 
                       }
                   }
               }
//================================================================\\
               if (m.isSewa(m.chat) && Object.keys(db.groups).includes(m.chat) && isText) {
                   const data = Object.keys(db.groups[m.chat].store.key).filter((x) => (x.toLowerCase() == m.budy.toLowerCase() || !isNaN(m.budy) && Object.keys(db.groups[m.chat].store.key)[Number(m.budy) - 1] == x))
                   if (data.length == 1 && db.groups[m.chat].store.key[data[0]].image !== "" && db.groups[m.chat].store.key[data[0]].text !== "") {
                       m.reply(db.groups[m.chat].store.key[data[0]].image, m.chat, db.settings.replyType, [], m.sender, { type: "image", caption: db.groups[m.chat].store.key[data[0]].text, quoted: m })
                   } else if (data.length == 1 && db.groups[m.chat].store.key[data[0]].document.url !== "" && db.groups[m.chat].store.key[data[0]].text !== "") {
                       m.reply(db.groups[m.chat].store.key[data[0]].document.url, m.chat, db.settings.replyType, [], m.sender, { type: "document", caption: db.groups[m.chat].store.key[data[0]].text, fileName: db.groups[m.chat].store.key[data[0]].document.fileName, quoted: m })
                   } else if (data.length == 1 && db.groups[m.chat].store.key[data[0]].text !== "") {
                       m.reply(db.groups[m.chat].store.key[data[0]].text) 
                   }
               }
//================================================================\\
               if (Object.keys(cmdOptions).length !== 0) {
                   if (Object.keys(db.banned).includes(m.sender)) {
                       if (!m.isOwner(m.sender) && !m.key.fromMe && !m.isPremium(m.sender)) return m.reply("Maaf kak kamu telah terbanned")
                   }
//================================================================\\
                   if (cmdOptions?.isSewa) {
                       if (m.isGroup && !m.isSewa(m.chat)) return m.reply(i18n.__("message.sewa_only"))
                   }
//================================================================\\
                   if (db.blockcmd.includes(command)) {
                       if (!m.isCreator(m.sender) && !m.key.fromMe) return m.reply("Maaf kak command telah di block")
                   }
//================================================================\\
                   if (cmdOptions?.isPrivate) {
                       if (m.isGroup) return m.reply(i18n.__("message.private_only"))
                   }
//================================================================\\
                   if (cmdOptions?.isGroup) {
                       if (!m.isGroup) return m.reply(i18n.__("message.group_only"))
                   }
//================================================================\\
                   if (cmdOptions?.isAdmin) {
                       if (!m.isGroupAdmins && !m.isOwner(m.sender) && !m.key.fromMe) return m.reply(i18n.__("message.admin_onlyly"))
                   }
//================================================================\\
                   if (cmdOptions?.isBotAdmin) {
                       if (!m.isBotGroupAdmins) return m.reply(i18n.__("message.bot_admin_only"))
                   }
//================================================================\\
                   if (cmdOptions?.isCreator) {
                       if (!m.isCreator(m.sender) && !m.key.fromMe) return m.reply(i18n.__("message.creator_only"))
                   }
//================================================================\\
                   if (cmdOptions?.isOwner) {
                       if (!m.isOwner(m.sender) && !m.key.fromMe) return m.reply(i18n.__("message.owner_only"))
                   }
//================================================================\\
                   if (cmdOptions?.isPremium) {
                       if (!m.isPremium(m.sender) && !m.key.fromMe) return m.reply(i18n.__("message.premium_only"))
                   }
//================================================================\\
                   if (cmdOptions?.isMedia?.isImage && cmdOptions?.isMedia?.isDocument && cmdOptions?.isMedia?.isVideo && cmdOptions?.isMedia?.isQuotedMedia?.isQuotedImage && cmdOptions?.isMedia?.isQuotedMedia?.isQuotedVideo && cmdOptions?.isMedia?.isQuotedMedia.isQuotedSticker && cmdOptions?.isMedia?.isQuotedMedia.isQuotedAudio && cmdOptions?.isMedia?.isQuotedMedia.isQuotedDocument) {
                       if (!isImage && !isVideo && !isDocument && !isQuotedImage && !isQuotedVideo && !isQuotedSticker && !isQuotedAudio && !isQuotedDocument) return m.reply("Use photos/videos/documents or Reply photos/videos/stickers/audios/documents with captions " + prefix + command + (cmdOptions?.example? cmdOptions.example.split("{prefix}{command}")[1] : "")) 
                   } else if (cmdOptions?.isMedia?.isImage && cmdOptions?.isMedia?.isVideo && cmdOptions?.isMedia?.isQuotedMedia.isQuotedImage && cmdOptions?.isMedia?.isQuotedMedia.isQuotedVideo && cmdOptions?.isMedia?.isQuotedMedia.isQuotedSticker) {
                       if (!isImage && !isVideo && !isQuotedImage && !isQuotedVideo && !isQuotedSticker) return m.reply("Use photos/videos or Reply photos/videos/stickers with captions " + prefix + command + (cmdOptions?.example? cmdOptions.example.split("{prefix}{command}")[1] : "")) 
                   } else if (cmdOptions?.isMedia?.isImage && cmdOptions?.isMedia?.isDocument && cmdOptions?.isMedia?.isQuotedMedia.isQuotedImage && cmdOptions?.isMedia?.isQuotedMedia.isQuotedDocument) {
                       if (!isImage && !isDocument && !isQuotedImage && !isQuotedDocument) return m.reply("Use photos/documents or Reply photos/documents with captions " + prefix + command + (cmdOptions?.example? cmdOptions.example.split("{prefix}{command}")[1] : "")) 
                   } else if (cmdOptions?.isMedia?.isVideo && cmdOptions?.isMedia?.isQuotedMedia.isQuotedVideo && cmdOptions?.isMedia?.isQuotedMedia.isQuotedAudio) {
                       if (!isVideo && !isQuotedVideo && !isQuotedAudio) return m.reply("Use videos or Reply audios/videos with captions " + prefix + command + (cmdOptions?.example? cmdOptions.example.split("{prefix}{command}")[1] : "")) 
                   } else if (cmdOptions?.isMedia?.isVideo && cmdOptions?.isMedia?.isQuotedMedia.isQuotedVideo && cmdOptions?.isMedia?.isQuotedMedia.isQuotedVoice) {
                       if (!isVideo && !isQuotedVideo && !isQuotedVoice) return m.reply("Use videos or Reply voices/videos with captions " + prefix + command + (cmdOptions?.example? cmdOptions.example.split("{prefix}{command}")[1] : "")) 
                   } else if (cmdOptions?.isMedia?.isImage && cmdOptions?.isMedia?.isVideo && cmdOptions?.isMedia?.isQuotedMedia.isQuotedImage && cmdOptions?.isMedia?.isQuotedMedia.isQuotedVideo) {
                       if (!isImage && !isVideo && !isQuotedImage && !isQuotedVideo) return m.reply("Use photos/videos or Reply photos/videos with captions " + prefix + command + (cmdOptions?.example? cmdOptions.example.split("{prefix}{command}")[1] : "")) 
                   } else if (cmdOptions?.isMedia?.isImage && cmdOptions?.isMedia?.isQuotedMedia.isQuotedImage && cmdOptions?.isMedia?.isQuotedMedia.isQuotedSticker) {
                       if (!isImage && !isQuotedImage && !isQuotedSticker) return m.reply("Use photos or Reply photos/stickers with captions " + prefix + command + (cmdOptions?.example? cmdOptions.example.split("{prefix}{command}")[1] : "")) 
                   } else if (cmdOptions?.isMedia?.isImage && cmdOptions?.isMedia?.isQuotedMedia.isQuotedImage) {
                       if (!isImage && !isQuotedImage) return m.reply("Use photos or Reply photos with captions " + prefix + command + (cmdOptions?.example? cmdOptions.example.split("{prefix}{command}")[1] : "")) 
                   } else if (cmdOptions?.isMedia?.isVideo && cmdOptions?.isMedia?.isQuotedMedia.isQuotedVideo) {
                       if (!isVideo && !isQuotedVideo) return m.reply("Use videos or Reply videos with captions " + prefix + command + (cmdOptions?.example? cmdOptions.example.split("{prefix}{command}")[1] : "")) 
                   } else if (cmdOptions?.isMedia?.isDocument && cmdOptions?.isMedia?.isQuotedMedia.isQuotedDocument) {
                       if (!isDocument && !isQuotedDocument) return m.reply("Use documents or Reply documents with captions " + prefix + command + (cmdOptions?.example? cmdOptions.example.split("{prefix}{command}")[1] : "")) 
                   } else if (cmdOptions?.isMedia?.isViewOnce && cmdOptions?.isMedia?.isQuotedMedia.isQuotedViewOnce) {
                       if (!isViewOnce && !isQuotedViewOnce) return m.reply("Use view once or Reply view once with captions " + prefix + command + (cmdOptions?.example? cmdOptions.example.split("{prefix}{command}")[1] : "")) 
                   } else if (cmdOptions?.isMedia?.isImage) {
                       if (!isImage) return m.reply("Use photos with captions " + prefix + command + (cmdOptions?.example? cmdOptions.example.split("{prefix}{command}")[1] : "")) 
                   } else if (cmdOptions?.isMedia?.isVideo) {
                       if (!isVideo) return m.reply("Use videos with captions " + prefix + command + (cmdOptions?.example? cmdOptions.example.split("{prefix}{command}")[1] : "")) 
                   } else if (cmdOptions?.isMedia?.isDocument) {
                       if (!isDocument) return m.reply("Use documents with captions " + prefix + command + (cmdOptions?.example? cmdOptions.example.split("{prefix}{command}")[1] : "")) 
                   } else if (cmdOptions?.isMedia?.isViewOnce) {
                       if (!isViewOnce) return m.reply("Use view once with captions " + prefix + command + (cmdOptions?.example? cmdOptions.example.split("{prefix}{command}")[1] : "")) 
                   } else if (cmdOptions?.isMedia?.isQuotedMedia.isQuotedImage) {
                       if (!isQuotedImage) return m.reply("Reply photos with captions " + prefix + command + (cmdOptions?.example? cmdOptions.example.split("{prefix}{command}")[1] : "")) 
                   } else if (cmdOptions?.isMedia?.isQuotedMedia.isQuotedVideo) {
                       if (!isQuotedVideo) return m.reply("Reply videos with captions " + prefix + command + (cmdOptions?.example? cmdOptions.example.split("{prefix}{command}")[1] : "")) 
                   } else if (cmdOptions?.isMedia?.isQuotedMedia.isQuotedAudio) {
                       if (!isQuotedAudio) return m.reply("Reply audios with captions " + prefix + command + (cmdOptions?.example? cmdOptions.example.split("{prefix}{command}")[1] : "")) 
                   } else if (cmdOptions?.isMedia?.isQuotedMedia.isQuotedVoice) {
                       if (!isQuotedVoice) return m.reply("Reply voices with captions " + prefix + command + (cmdOptions?.example? cmdOptions.example.split("{prefix}{command}")[1] : "")) 
                   } else if (cmdOptions?.isMedia?.isQuotedMedia.isQuotedSticker) {
                       if (!isQuotedSticker) return m.reply("Reply stickers with captions " + prefix + command + (cmdOptions?.example? cmdOptions.example.split("{prefix}{command}")[1] : "")) 
                   } else if (cmdOptions?.isMedia?.isQuotedMedia.isQuotedDocument) {
                       if (!isQuotedDocument) return m.reply("Reply documents with captions " + prefix + command + (cmdOptions?.example? cmdOptions.example.split("{prefix}{command}")[1] : "")) 
                   } else if (cmdOptions?.isMedia?.isQuotedMedia.isQuotedViewOnce) {
                       if (!isQuotedViewOnce) return m.reply("Reply view once with captions " + prefix + command + (cmdOptions?.example? cmdOptions.example.split("{prefix}{command}")[1] : "")) 
                   } else if (cmdOptions?.isMedia?.isQuotedMedia.isQuotedContact) {
                       if (!isQuotedContact) return m.reply("Reply contacts with captions " + prefix + command + (cmdOptions?.example? cmdOptions.example.split("{prefix}{command}")[1] : "")) 
                   }
//================================================================\\
                   if (cmdOptions?.minArgs && cmdOptions?.minArgs > m.args.length) {
                       let teks = `*Minimal argument is ${cmdOptions.minArgs}*\n`
                       if (cmdOptions?.expectedArgs) {
                           teks += `*Argument :* ${cmdOptions.expectedArgs}\n`
                           teks += `*Usage :* ${prefix + command} ${cmdOptions.expectedArgs}\n`
                       }
                       if (cmdOptions?.example) {
                           teks += `*Example :* ${prefix + command} ${cmdOptions.example.split("{prefix}{command} ")[1]}`
                       }
                       return m.reply(util.format(teks))
                   }
//================================================================\\
                   if (cmdOptions?.isLimit) {
                       if (Object.keys(db.sewa).includes(m.chat) && db.groups[m.chat].limit > 0) {
                           if (m.isPremium(m.sender) || m.key.fromMe) {
                               m.reply(i18n.__("wait"))
                           } else {
                               db.groups[m.chat].limit -= 1
                               await m.reply(`Satu limit group terpakaiಥ‿ಥ\nSisa Limit group : ${db.groups[m.chat].limit}`) 
                           }
                       } else {
                           if (m.isPremium(m.sender) || m.key.fromMe) {
                               m.reply(i18n.__("wait"))
                           } else {
                               db.users[m.sender].limit -= 1
                               await m.reply(`Satu limit terpakaiಥ‿ಥ\nSisa Limit kamu : ${db.users[m.sender].limit}`) 
                           }
                       }
                   }
//================================================================\\
                   if (!cmdOptions?.isLimit && cmdOptions?.isWait) {
                       m.reply(i18n.__("wait"))
                   }
//================================================================\\
                   if (cmdOptions?.callback) {
                       return cmdOptions.callback({ mywa, m, cmdSuccess, cmdFailed, command, prefix, thePrefix, isQuotedVoice, isQuotedDocument, isQuotedLocation, isQuotedContact, isQuotedAudio, isQuotedSticker, isQuotedVideo, isQuotedImage, isQuotedText, isDocument, isQuotedViewOnce, isLocation, isContact, isAudio, isSticker, isVideo, isImage, isText, isViewOnce }) 
                   }
//================================================================\\
               } else switch (command) {
                   case "restart":
                       try{
                           if (Object.keys(db.banned).includes(m.sender)) {
                               if (!m.isOwner(m.sender) && !m.key.fromMe && !m.isPremium(m.sender)) return m.reply("Maaf kak kamu telah terbanned")
                           }
                           if (m.isGroup && !m.isSewa(m.chat)) return m.reply(i18n.__("message.sewa_only"))
                           if (!m.isCreator(m.sender) && !m.key.fromMe) return m.reply(i18n.__("message.creator_only"))
                           m.reply("Restarting bot.....")
                           setTimeout(() => {
                               process.send("reset")
                           }, 5000)
                           cmdSuccess(command, "owner menu", "case")
                       } catch (err) {
                           cmdFailed(command, "owner menu", err, "case")
                       }
                   break
                   case "logout":
                       try{
                           if (Object.keys(db.banned).includes(m.sender)) {
                               if (!m.isOwner(m.sender) && !m.key.fromMe && !m.isPremium(m.sender)) return m.reply("Maaf kak kamu telah terbanned")
                           }
                           if (m.isGroup && !m.isSewa(m.chat)) return m.reply(i18n.__("message.sewa_only"))
                           if (!m.isCreator(m.sender) && !m.key.fromMe) return m.reply(i18n.__("message.creator_only"))
                           m.reply("Logout whatsapp.....")
                           setTimeout(() => {
                               mywa.logout()
                           }, 5000)
                           cmdSuccess(command, "owner menu", "case")
                       } catch (err) {
                           cmdFailed(command, "owner menu", err, "case")
                       }
                   break
                   case "stopped":
                       try{
                           if (Object.keys(db.banned).includes(m.sender)) {
                               if (!m.isOwner(m.sender) && !m.key.fromMe && !m.isPremium(m.sender)) return m.reply("Maaf kak kamu telah terbanned")
                           }
                           if (m.isGroup && !m.isSewa(m.chat)) return m.reply(i18n.__("message.sewa_only"))
                           if (!m.isCreator(m.sender) && !m.key.fromMe) return m.reply(i18n.__("message.creator_only"))
                           m.reply("Stopped whatsapp bot.....")
                           setTimeout(() => {
                               mywa.destroy()
                           }, 5000)
                           cmdSuccess(command, "owner menu", "case")
                       } catch (err) {
                           cmdFailed(command, "owner menu", err, "case")
                       }
                   break
                   default:
               }
//================================================================\\
               if (m.body.startsWith(">")) {
                   if (!m.isCreator(m.sender) && !m.key.fromMe) return
                   try{
                       let evaled = await eval(m.text)
                       if (evaled == undefined) return
                       if (typeof evaled !== "string") evaled = require("util").inspect(evaled)
                       m.reply(util.format(evaled))
                   } catch (e) {
                       m.reply(util.format(e))
                   }
               }
//================================================================\\
               if (m.body.startsWith("=>")) {
                   if (!m.isCreator(m.sender) && !m.key.fromMe) return
                   try{
                       let evaled = await eval(`(async () => { return ${m.text} })()`)
                       if (evaled == undefined) return
                       if (typeof evaled !== "string") evaled = require("util").inspect(evaled)
                       m.reply(util.format(evaled))
                   } catch (e) {
                       m.reply(util.format(e))
                   }
               }
//================================================================\\
               if (m.budy.startsWith("$")) {
                   if (!m.isCreator(m.sender) && !m.key.fromMe) return
                   exec(m.text, (err, stdout) => {
                       if (err) return m.reply(util.format(err))
                       if (stdout) m.reply(util.format(stdout))
                   })
               }
//================================================================\\
           } catch (e) {
               console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ ERROR ]"), `${e}`)
           }
       }
//================================================================\\
const readCommands = () => {
    fs.readdirSync("./system/commands").filter((x) => (!x.includes(".js") && !x.includes(".js.bak") && !x.includes(".cjs") && !x.includes(".cjs.bak"))).forEach(async (res) => {
        const command = fs.readdirSync("./system/commands/" + res).filter((file) => (file.endsWith(".js") && !file.endsWith(".js.bak") || file.endsWith(".cjs") && !file.endsWith(".cjs.bak")))
        for (let file of command) {
            if (file.endsWith(".cjs")) {
                var cmdObject = require("../commands/" + res + "/" + file)
            } else if (file.endsWith(".js")) {
                var cmdObject = await import("../commands/" + res + "/" + file)
            }
            const cmdOptions = {
                commands: Array.isArray(cmdObject?.default?.commands)? cmdObject.default.commands : Array.isArray(cmdObject?.commands)? cmdObject.commands : [], 
                minArgs: !isNaN(cmdObject?.default?.minArgs)? cmdObject.default.minArgs : !isNaN(cmdObject?.minArgs)? cmdObject.minArgs : 0,
                expectedArgs: (!isNaN(cmdObject?.default?.minArgs) && cmdObject?.default?.expectedArgs)? cmdObject.default.expectedArgs : (!isNaN(cmdObject?.minArgs) && cmdObject?.expectedArgs)? cmdObject.expectedArgs : null, 
                example: cmdObject?.default?.example? cmdObject.default.example : cmdObject?.example? cmdObject.example : null, 
                tags: cmdObject?.default?.tags? cmdObject.default.tags : cmdObject?.tags? cmdObject.tags : "", 
                isSewa: cmdObject?.default?.isSewa? cmdObject.default.isSewa : cmdObject?.isSewa? cmdObject.isSewa : false, 
                isCreator: cmdObject?.default?.isCreator? cmdObject.default.isCreator : cmdObject?.isCreator? cmdObject.isCreator : false, 
                isOwner: cmdObject?.default?.isOwner? cmdObject.default.isOwner : cmdObject?.isOwner? cmdObject.isOwner : false, 
                isPremium: cmdObject?.default?.isPremium? cmdObject.default.isPremium : cmdObject?.isPremium? cmdObject.isPremium : false, 
                isPrivate: cmdObject?.default?.isPrivate? cmdObject.default.isPrivate : cmdObject?.isPrivate? cmdObject.isPrivate : false, 
                isGroup: cmdObject?.default?.isGroup? cmdObject.default.isGroup : cmdObject?.isGroup? cmdObject.isGroup : false, 
                isAdmin: cmdObject?.default?.isAdmin? cmdObject.default.isAdmin : cmdObject?.isAdmin? cmdObject.isAdmin : false, 
                isBotAdmin: cmdObject?.default?.isBotAdmin? cmdObject.default.isBotAdmin : cmdObject?.isBotAdmin? cmdObject.isBotAdmin : false, 
                isMedia: {
                    isImage: cmdObject?.default?.isMedia?.isImage? cmdObject.default.isMedia.isImage : cmdObject?.isMedia?.isImage? cmdObject.isMedia.isImage : false, 
                    isVideo: cmdObject?.default?.isMedia?.isVideo? cmdObject.default.isMedia.isVideo : cmdObject?.isMedia?.isVideo? cmdObject.isMedia.isVideo : false, 
                    isDocument: cmdObject?.default?.isMedia?.isDocument? cmdObject.default.isMedia.isDocument : cmdObject?.isMedia?.isDocument? cmdObject.isMedia.isDocument : false, 
                    isViewOnce: cmdObject?.default?.isMedia?.isViewOnce? cmdObject.default.isMedia.isViewOnce : cmdObject?.isMedia?.isViewOnce? cmdObject.isMedia.isViewOnce : false, 
                    isQuotedMedia: {
                        isQuotedImage: cmdObject?.default?.isMedia?.isQuotedMedia?.isQuotedImage? cmdObject.default.isMedia.isQuotedMedia.isQuotedImage : cmdObject?.isMedia?.isQuotedMedia?.isQuotedImage? cmdObject.isMedia.isQuotedMedia.isQuotedImage : false, 
                        isQuotedVideo: cmdObject?.default?.isMedia?.isQuotedMedia?.isQuotedVideo? cmdObject.default.isMedia.isQuotedMedia.isQuotedVideo : cmdObject?.isMedia?.isQuotedMedia?.isQuotedVideo? cmdObject.isMedia.isQuotedMedia.isQuotedVideo : false, 
                        isQuotedAudio: cmdObject?.default?.isMedia?.isQuotedMedia?.isQuotedAudio? cmdObject.default.isMedia.isQuotedMedia.isQuotedAudio : cmdObject?.isMedia?.isQuotedMedia?.isQuotedAudio? cmdObject.isMedia.isQuotedMedia.isQuotedAudio : false, 
                        isQuotedVoice: cmdObject?.default?.isMedia?.isQuotedMedia?.isQuotedVoice? cmdObject.default.isMedia.isQuotedMedia.isQuotedVoice : cmdObject?.isMedia?.isQuotedMedia?.isQuotedVoice? cmdObject.isMedia.isQuotedMedia.isQuotedVoice : false, 
                        isQuotedSticker: cmdObject?.default?.isMedia?.isQuotedMedia?.isQuotedSticker? cmdObject.default.isMedia.isQuotedMedia.isQuotedSticker : cmdObject?.isMedia?.isQuotedMedia?.isQuotedSticker? cmdObject.isMedia.isQuotedMedia.isQuotedSticker : false, 
                        isQuotedDocument: cmdObject?.default?.isMedia?.isQuotedMedia?.isQuotedDocument? cmdObject.default.isMedia.isQuotedMedia.isQuotedDocument : cmdObject?.isMedia?.isQuotedMedia?.isQuotedDocument? cmdObject.isMedia.isQuotedMedia.isQuotedDocument : false, 
                        isQuotedViewOnce: cmdObject?.default?.isMedia?.isQuotedMedia?.isQuotedViewOnce? cmdObject.default.isMedia.isQuotedMedia.isQuotedViewOnce : cmdObject?.isMedia?.isQuotedMedia?.isQuotedViewOnce? cmdObject.isMedia.isQuotedMedia.isQuotedViewOnce : false, 
                        isQuotedContact: cmdObject?.default?.isMedia?.isQuotedMedia?.isQuotedContact? cmdObject.default.isMedia.isQuotedMedia.isQuotedContact : cmdObject?.isMedia?.isQuotedMedia?.isQuotedContact? cmdObject.isMedia.isQuotedMedia.isQuotedContact : false
                    }
                },
                isLimit: cmdObject?.default?.isLimit? cmdObject.default.isLimit : cmdObject?.isLimit? cmdObject.isLimit : false, 
                isWait: cmdObject?.default?.isWait? cmdObject.default.isWait : cmdObject?.isWait? cmdObject.isWait : false, 
                callback: cmdObject?.default?.callback? cmdObject.default.callback : cmdObject?.callback? cmdObject.callback : null
            }
            if (Array.isArray(cmdObject?.default?.commands)) {
                cmdObject.default.commands.forEach((x) => {
                    commands.set(x, cmdOptions)
                    if (!Object.keys(db.allcommand).includes(x)) db.allcommand[x] = { type: "file", tags_menu: cmdObject?.default?.tags? cmdObject.default.tags : "" }
                })
            } else if (Array.isArray(cmdObject?.commands)) {
                cmdObject.commands.forEach((x) => {
                    commands.set(x, cmdOptions)
                    if (!Object.keys(db.allcommand).includes(x)) db.allcommand[x] = { type: "file", tags_menu: cmdObject?.tags? cmdObject.tags : "" }
                })
            }
        }
    })
}
//================================================================\\



module.exports = { readCommands, Message }