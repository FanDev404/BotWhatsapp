const fs = require("fs")
const chalk = require("chalk")
const { week, calender, toFirstCase } = require("@libs/function")
const config = require("@config")
const yes = "❌"
const no = ""

const featError = (cmd) => {
return Object.keys(db.listerror).includes(cmd) 
}


const menu = (m, thePrefix) => {
return `*${m.botName}*
${week}, ${calender} 

 ◉ Nama : ${m.pushName}
 ◉ Status : ${db.devoloper == m.senderNumber? "Devoloper" : (m.isCreator || m.key.fromMe)? "Creator" : m.isOwner? "Owner" : m.isPremium? "Premium" : "Users"}
 ◉ Limit : ${db.users[m.sender].limit}
 ◉ Saldo : ${db.users[m.sender].balance}
 ◉ Mode : ${toFirstCase(m.mode)}
 ◉ Prefix : ${thePrefix}
 ◉ Time Wib : ${m.timeWib}
 ◉ Total Feature : ${Object.keys(db.allcommand).length}
 ◉ Total Error : ${Object.keys(db.listerror).length}
 ◉ Total User : ${Object.keys(db.users).length}
 ◉ User Banned : ${Object.keys(db.banned).length}
`}

const ownerMenu = (prefix) => {
return `  ╭─▸ 𝘖𝘸𝘯𝘦𝘳 𝘔𝘦𝘯𝘶
  │
  │⭔ ${prefix}anticall ${featError("anticall")? yes : no }
  │⭔ ${prefix}antispam ${featError("antispam")? yes : no }
  │⭔ ${prefix}auto ${featError("auto")? yes : no }
  │⭔ ${prefix}autobio ${featError("autobio")? yes : no }
  │⭔ ${prefix}autoblockcmd ${featError("autoblockcmd")? yes : no }
  │⭔ ${prefix}autojoin ${featError("autojoin")? yes : no }
  │⭔ ${prefix}autolevel ${featError("autolevel")? yes : no }
  │⭔ ${prefix}autoread ${featError("autoread")? yes : no }
  │⭔ ${prefix}autoreport ${featError("autoreport")? yes : no }
  │⭔ ${prefix}autorespon ${featError("autorespon")? yes : no }
  │⭔ ${prefix}autosticker ${featError("autosticker")? yes : no }
  │⭔ ${prefix}autovn ${featError("autovn")? yes : no }
  │⭔ ${prefix}autobackup ${featError("autobackup")? yes : no }
  │⭔ ${prefix}ban ${featError("ban")? yes : no }
  │⭔ ${prefix}unban ${featError("unban")? yes : no }
  │⭔ ${prefix}block ${featError("block")? yes : no }
  │⭔ ${prefix}unblock ${featError("unblock")? yes : no }
  │⭔ ${prefix}blockcmd ${featError("blockcmd")? yes : no }
  │⭔ ${prefix}unblockcmd ${featError("unblockcmd")? yes : no }
  │⭔ ${prefix}bc ${featError("bc")? yes : no }
  │⭔ ${prefix}bcgc ${featError("bcgc")? yes : no }
  │⭔ ${prefix}bcpc ${featError("bcpc")? yes : no }
  │⭔ ${prefix}bcowner ${featError("bcowner")? yes : no }
  │⭔ ${prefix}bcpremium ${featError("bcpremium")? yes : no }
  │⭔ ${prefix}bcsewa ${featError("bcsewa")? yes : no }
  │⭔ ${prefix}creategc ${featError("creategc")? yes : no }
  │⭔ ${prefix}updatefile ${featError("updatefile")? yes : no }
  │⭔ ${prefix}backup ${featError("backup")? yes : no }
  │⭔ ${prefix}getfile ${featError("getfile")? yes : no }
  │⭔ ${prefix}getfitur ${featError("getfitur")? yes : no }
  │⭔ ${prefix}getfolder ${featError("getfolder")? yes : no }
  │⭔ ${prefix}getsesi ${featError("getsesi")? yes : no }
  │⭔ ${prefix}addfitur ${featError("addfitur")? yes : no }  
  │⭔ ${prefix}restart ${featError("restart")? yes : no }
  │⭔ ${prefix}stopped ${featError("stopped")? yes : no }
  │⭔ ${prefix}join ${featError("join")? yes : no }
  │⭔ ${prefix}leave ${featError("leave")? yes : no }
  │⭔ ${prefix}mode ${featError("mode")? yes : no }
  │⭔ ${prefix}setbio ${featError("setbio")? yes : no }
  │⭔ ${prefix}setmenu ${featError("setmenu")? yes : no }
  │⭔ ${prefix}setnamabot ${featError("setnamabot")? yes : no }
  │⭔ ${prefix}setnamaown ${featError("setnamaown")? yes : no }
  │⭔ ${prefix}setpp ${featError("setpp")? yes : no }
  │⭔ ${prefix}setnoown ${featError("setnoown")? yes : no }
  │⭔ ${prefix}setprefix ${featError("setprefix")? yes : no }
  │⭔ ${prefix}setreply ${featError("setreply")? yes : no }
  │⭔ ${prefix}setbackup ${featError("setbackup")? yes : no }
  │⭔ ${prefix}setkey ${featError("setkey")? yes : no }
  │⭔ ${prefix}delsampah ${featError("delsampah")? yes : no }
  │⭔ ${prefix}delfile ${featError("delfile")? yes : no }
  │
  ╰────────────˧`
}

const groupMenu = (prefix) => {
return `  
  ╭─▸ 𝘎𝘳𝘰𝘶𝘱 𝘔𝘦𝘯𝘶
  │
  │⭔ ${prefix}antilink ${featError("antilink")? yes : no }
  │⭔ ${prefix}antilinkfb ${featError("antilinkfb")? yes : no }
  │⭔ ${prefix}antilinkig ${featError("antilinkig")? yes : no }
  │⭔ ${prefix}antilinktele ${featError("antilinktele")? yes : no }
  │⭔ ${prefix}antilinktiktok ${featError("antilinktiktok")? yes : no }
  │⭔ ${prefix}antilinktwitter ${featError("antilinktwitter")? yes : no }
  │⭔ ${prefix}antilinkwa ${featError("antilinkwa")? yes : no }
  │⭔ ${prefix}antilinkyt ${featError("antilinkyt")? yes : no }
  │⭔ ${prefix}antiasing ${featError("antiasing")? yes : no }
  │⭔ ${prefix}antidelete ${featError("antidelete")? yes : no }
  │⭔ ${prefix}antisange ${featError("antisange")? yes : no }
  │⭔ ${prefix}antitag ${featError("antitag")? yes : no }
  │⭔ ${prefix}antivo ${featError("antivo")? yes : no }
  │⭔ ${prefix}antivirtex ${featError("antivirtex")? yes : no }
  │⭔ ${prefix}antitoxic ${featError("antitoxic")? yes : no }
  │⭔ ${prefix}antibot ${featError("antibot")? yes : no }
  │⭔ ${prefix}autoreactgc ${featError("autoreactgc")? yes : no }
  │⭔ ${prefix}autorespongc ${featError("autorespongc")? yes : no }
  │⭔ ${prefix}welcome ${featError("welcome")? yes : no }
  │⭔ ${prefix}mute ${featError("mute")? yes : no }
  │⭔ ${prefix}unmute ${featError("unmute")? yes : no }
  │⭔ ${prefix}clearmute ${featError("clearmute")? yes : no }
  │⭔ ${prefix}listmute ${featError("listmute")? yes : no }
  │⭔ ${prefix}infogc ${featError("infogc")? yes : no }
  │⭔ ${prefix}linkgc ${featError("linkgc")? yes : no }
  │⭔ ${prefix}setppgc ${featError("setppgc")? yes : no }
  │⭔ ${prefix}setnamagc ${featError("setnamagc")? yes : no }
  │⭔ ${prefix}setdescgc ${featError("setdescgc")? yes : no }
  │⭔ ${prefix}setwelcome ${featError("setwelcome")? yes : no }
  │⭔ ${prefix}gc ${featError("gc")? yes : no }
  │⭔ ${prefix}rord ${featError("rord")? yes : no }     
  │⭔ ${prefix}revoke ${featError("revoke")? yes : no }
  │⭔ ${prefix}hidetag ${featError("hidetag")? yes : no }
  │⭔ ${prefix}tagall ${featError("tagall")? yes : no }
  │⭔ ${prefix}add ${featError("add")? yes : no }
  │⭔ ${prefix}remove ${featError("remove")? yes : no }
  │⭔ ${prefix}promote ${featError("promote")? yes : no }
  │⭔ ${prefix}demote ${featError("demote")? yes : no }
  │⭔ ${prefix}afk ${featError("afk")? yes : no }
  │⭔ ${prefix}kickme ${featError("kickme")? yes : no }
  │⭔ ${prefix}opentime ${featError("opentime")? yes : no }
  │⭔ ${prefix}closetime ${featError("closetime")? yes : no }
  │⭔ ${prefix}getppgc ${featError("getppgc")? yes : no }
  │⭔ ${prefix}disappearing ${featError("disappearing")? yes : no }
  │⭔ ${prefix}ceksewa ${featError("disappearing")? yes : no }
  │
  ╰────────────˧`
}

const storeMenu = (prefix) => {
return `  
  ╭─▸ 𝘚𝘵𝘰𝘳𝘦 𝘔𝘦𝘯𝘶
  │
  │⭔ ${prefix}list ${featError("list")? yes : no }
  │⭔ ${prefix}setpay ${featError("setpay")? yes : no }
  │⭔ ${prefix}setlist ${featError("setlist")? yes : no }
  │⭔ ${prefix}setmedia ${featError("setmedia")? yes : no }  
  │⭔ ${prefix}settime ${featError("settime")? yes : no }
  │⭔ ${prefix}setproses ${featError("setproses")? yes : no }
  │⭔ ${prefix}setdone ${featError("setdone")? yes : no }
  │⭔ ${prefix}addlist ${featError("addlist")? yes : no }
  │⭔ ${prefix}dellist ${featError("dellist")? yes : no }
  │⭔ ${prefix}delmedia ${featError("delmedia")? yes : no }
  │⭔ ${prefix}deltime ${featError("deltime")? yes : no }
  │⭔ ${prefix}clearlist ${featError("clearlist")? yes : no }
  │⭔ ${prefix}clearmedia ${featError("clearmedia")? yes : no }
  │⭔ ${prefix}cleartime ${featError("cleartime")? yes : no }
  │⭔ ${prefix}proses ${featError("proses")? yes : no }
  │⭔ ${prefix}done ${featError("done")? yes : no }
  │⭔ ${prefix}payment ${featError("payment")? yes : no }
  │⭔ ${prefix}status ${featError("status")? yes : no }
  │
  ╰────────────˧`
}

const toolsMenu = (prefix) => {
return `  
  ╭─▸ 𝘛𝘰𝘰𝘭𝘴 𝘔𝘦𝘯𝘶
  │
  │⭔ ${prefix}dashboard ${featError("dashboard")? yes : no }
  │⭔ ${prefix}menu ${featError("menu")? yes : no }
  │⭔ ${prefix}owner ${featError("owner")? yes : no }
  │⭔ ${prefix}runtime ${featError("runtime")? yes : no }
  │⭔ ${prefix}speed ${featError("speed")? yes : no }
  │⭔ ${prefix}listgc ${featError("listgc")? yes : no }
  │⭔ ${prefix}listpc ${featError("listpc")? yes : no }
  │⭔ ${prefix}listharga ${featError("listharga")? yes : no }
  │⭔ ${prefix}read ${featError("read")? yes : no }  
  │⭔ ${prefix}del ${featError("del")? yes : no }  
  │⭔ ${prefix}getpp ${featError("getpp")? yes : no }  
  │⭔ ${prefix}getname ${featError("getname")? yes : no }  
  │⭔ ${prefix}getid ${featError("getid")? yes : no }  
  │⭔ ${prefix}script ${featError("script")? yes : no }  
  │⭔ ${prefix}cariteman ${featError("cariteman")? yes : no }  
  │⭔ ${prefix}kontak ${featError("kontak")? yes : no }  
  │⭔ ${prefix}react ${featError("react")? yes : no }  
  │⭔ ${prefix}wame ${featError("wame")? yes : no }  
  │⭔ ${prefix}report ${featError("report")? yes : no }  
  │⭔ ${prefix}infobot ${featError("infobot")? yes : no }  
  │⭔ ${prefix}profile ${featError("profile")? yes : no }
  │⭔ ${prefix}ceksize ${featError("ceksize")? yes : no }
  │⭔ ${prefix}cekpremium ${featError("cekpremium")? yes : featError("cekprem")? yes : no }
  │⭔ ${prefix}cekowner ${featError("cekowner")? yes : no }
  │⭔ ${prefix}ai ${featError("ai")? yes : no }
  │
  ╰────────────˧`
}

const funMenu = (prefix) => {
return `  
  ╭─▸ 𝘍𝘶𝘯 𝘔𝘦𝘯𝘶
  │
  │⭔ ${prefix}cekgoblok ${featError("cekgoblok")? yes : no }
  │⭔ ${prefix}cekjelek ${featError("cekjelek")? yes : no }
  │⭔ ${prefix}cekgay ${featError("cekgay")? yes : no }
  │⭔ ${prefix}ceklesbi ${featError("ceklesbi")? yes : no }
  │⭔ ${prefix}cekganteng ${featError("cekganteng")? yes : no }
  │⭔ ${prefix}cekcantik ${featError("cekcantik")? yes : no }
  │⭔ ${prefix}cekbego ${featError("cekbego")? yes : no }
  │⭔ ${prefix}ceksuhu ${featError("ceksuhu")? yes : no }
  │⭔ ${prefix}cekpinter ${featError("cekpinter")? yes : no }
  │⭔ ${prefix}cekjago ${featError("cekjago")? yes : no }
  │⭔ ${prefix}ceknolep ${featError("ceknolep")? yes : no }
  │⭔ ${prefix}cekbabi ${featError("cekbabi")? yes : no }
  │⭔ ${prefix}cekbeban ${featError("cekbeban")? yes : no }
  │⭔ ${prefix}cekbaik ${featError("cekbaik")? yes : no }
  │⭔ ${prefix}cekjahat ${featError("cekjahat")? yes : no }
  │⭔ ${prefix}cekanjing ${featError("cekanjing")? yes : no }
  │⭔ ${prefix}cekharam ${featError("cekharam")? yes : no }
  │⭔ ${prefix}cekpakboy ${featError("cekpakboy")? yes : no }
  │⭔ ${prefix}cekpakgirl ${featError("cekpakgirl")? yes : no }
  │⭔ ${prefix}ceksange ${featError("ceksange")? yes : no }
  │⭔ ${prefix}cekbaper ${featError("cekbaper")? yes : no }
  │⭔ ${prefix}cekfakboy ${featError("cekfakboy")? yes : no }
  │⭔ ${prefix}cekalim ${featError("cekalim")? yes : no }
  │⭔ ${prefix}ceksuhu ${featError("ceksuhu")? yes : no }
  │⭔ ${prefix}cekfakgirl ${featError("cekfakgirl")? yes : no }
  │⭔ ${prefix}cekkeren ${featError("cekkeren")? yes : no }
  │⭔ ${prefix}cekwibu ${featError("cekwibu")? yes : no }
  │⭔ ${prefix}cekpasarkas ${featError("cekpasarkas")? yes : no }
  │⭔ ${prefix}cekkul ${featError("cekkul")? yes : no }
  │
  ╰────────────˧`
}

const tagsMenu = (prefix) => {
return `  
  ╭─▸ 𝘛𝘢𝘨𝘴 𝘔𝘦𝘯𝘶
  │
  │⭔ ${prefix}memek ${featError("memek")? yes : no }
  │⭔ ${prefix}bego ${featError("bego")? yes : no }
  │⭔ ${prefix}goblok ${featError("goblok")? yes : no }
  │⭔ ${prefix}perawan ${featError("perawan")? yes : no }
  │⭔ ${prefix}babi ${featError("babi")? yes : no }
  │⭔ ${prefix}tolol ${featError("tolol")? yes : no }
  │⭔ ${prefix}pintar ${featError("pintar")? yes : no }
  │⭔ ${prefix}asu ${featError("asu")? yes : no }
  │⭔ ${prefix}gay ${featError("gay")? yes : no }
  │⭔ ${prefix}lesby ${featError("lesby")? yes : no }
  │⭔ ${prefix}bajingan ${featError("bajingan")? yes : no }
  │⭔ ${prefix}jancok ${featError("jancok")? yes : no }
  │⭔ ${prefix}anjing ${featError("anjing")? yes : no }
  │⭔ ${prefix}ngentot ${featError("ngentot")? yes : no }
  │⭔ ${prefix}monyet ${featError("monyet")? yes : no }
  │⭔ ${prefix}mastah ${featError("mastah")? yes : no }
  │⭔ ${prefix}newbie ${featError("newbie")? yes : no }
  │⭔ ${prefix}bangsat ${featError("bangsat")? yes : no }
  │⭔ ${prefix}bangke ${featError("bangke")? yes : no }
  │⭔ ${prefix}sange ${featError("sange")? yes : no }
  │⭔ ${prefix}dakjal ${featError("dakjal")? yes : no }
  │⭔ ${prefix}wibu ${featError("wibu")? yes : no }
  │⭔ ${prefix}puki ${featError("puki")? yes : no }
  │⭔ ${prefix}pantek ${featError("pantek")? yes : no }
  │⭔ ${prefix}jadian ${featError("jadian")? yes : no }
  │⭔ ${prefix}jodohku ${featError("jodohku")? yes : no }
  │
  ╰────────────˧`
}


const downloadMenu = (prefix) => {
return `
  ╭─▸ 𝘋𝘰𝘸𝘯𝘭𝘰𝘢𝘥𝘦𝘳
  │
  │⭔ ${prefix}tiktokmp3 ${featError("tiktokmp3")? yes : featError("ttmp3")? yes : no }
  │⭔ ${prefix}tiktokmp4 ${featError("tiktokmp4")? yes : featError("ttmp4")? yes : no }
  │⭔ ${prefix}ytmp3 ${featError("ytmp3")? yes : no }
  │⭔ ${prefix}ytmp4 ${featError("ytmp4")? yes : no }
  │⭔ ${prefix}gitclone ${featError("gitclone")? yes : no }
  │⭔ ${prefix}spotify ${featError("spotify")? yes : no }
  │⭔ ${prefix}ig ${featError("ig")? yes : no }
  │
  ╰────────────˧`
}

const converterMenu = (prefix) => {
return `
  ╭─▸ 𝘊𝘰𝘯𝘷𝘦𝘳𝘵𝘦𝘳 𝘔𝘦𝘯𝘶
  │
  │⭔ ${prefix}sticker ${featError("sticker")? yes : featError("s")? yes : no }
  │⭔ ${prefix}toimg ${featError("toimg")? yes : no }
  │⭔ ${prefix}editbg ${featError("editbg")? yes : no }
  │⭔ ${prefix}removebg ${featError("removebg")? yes : no }
  │⭔ ${prefix}qc ${featError("qc")? yes : no }
  │⭔ ${prefix}swm ${featError("swm")? yes : no }
  │⭔ ${prefix}smeme ${featError("smeme")? yes : no }
  │⭔ ${prefix}tourl ${featError("tourl")? yes : no }
  │⭔ ${prefix}tomp3 ${featError("tomp3")? yes : no }
  │⭔ ${prefix}tomp4 ${featError("tomp4")? yes : no }
  │⭔ ${prefix}toopus ${featError("toopus")? yes : no }
  │⭔ ${prefix}togif ${featError("togif")? yes : no }
  │
  ╰────────────˧`
}

const searchMenu = (prefix) => {
return `
  ╭─▸ 𝘚𝘦𝘢𝘳𝘤𝘩 𝘔𝘦𝘯𝘶
  │
  │⭔ ${prefix}searchm ${featError("searchm")? yes :no }
  │⭔ ${prefix}yts ${featError("yts")? yes :no }
  │⭔ ${prefix}play ${featError("play")? yes :no }
  │
  ╰────────────˧`
}

const anonymousMenu = (prefix) => {
return `
  ╭─▸ 𝘈𝘯𝘰𝘯𝘺𝘮𝘰𝘶𝘴 𝘔𝘦𝘯𝘶
  │
  │⭔ ${prefix}start ${featError("start")? yes :no }
  │⭔ ${prefix}startchat ${featError("start")? yes :no }
  │⭔ ${prefix}stop ${featError("stop")? yes :no }
  │⭔ ${prefix}next ${featError("next")? yes :no }
  │⭔ ${prefix}getcontact ${featError("getcontact")? yes :no }
  │⭔ ${prefix}delanon ${featError("delanon")? yes :no }
  │⭔ ${prefix}listanon ${featError("listanon")? yes :no }
  │⭔ ${prefix}clearanon ${featError("clearanon")? yes :no }
  │
  ╰────────────˧`
}

const jadibotMenu = (prefix) => {
return `
  ╭─▸ 𝘑𝘢𝘥𝘪 𝘉𝘰𝘵 𝘔𝘦𝘯𝘶
  │
  │⭔ ${prefix}jadibot ${featError("jadibot")? yes :no }
  │⭔ ${prefix}stopjadibot ${featError("stopjadibot")? yes :no }
  │⭔ ${prefix}deljadibot ${featError("deljadibot")? yes :no }
  │⭔ ${prefix}listjadibot ${featError("listjadibot")? yes :no }
  │⭔ ${prefix}clearjadibot ${featError("clearjadibot")? yes :no }
  │
  ╰────────────˧`
}

const randomMenu = (prefix) => {
return `
  ╭─▸ 𝘙𝘢𝘯𝘥𝘰𝘮 𝘔𝘦𝘯𝘶
  │
  │⭔ ${prefix}awoo ${featError("awoo")? yes : no }
  │⭔ ${prefix}bite ${featError("bite")? yes : no }
  │⭔ ${prefix}blowjob ${featError("blowjob")? yes : no }
  │⭔ ${prefix}blush ${featError("blush")? yes : no }
  │⭔ ${prefix}bonk ${featError("bonk")? yes : no }
  │⭔ ${prefix}boobs ${featError("boobs")? yes : no }
  │⭔ ${prefix}bully ${featError("bully")? yes : no }
  │⭔ ${prefix}cringe ${featError("cringe")? yes : no }
  │⭔ ${prefix}cry ${featError("cry")? yes : no }
  │⭔ ${prefix}cuddle ${featError("cuddle")? yes : no }
  │⭔ ${prefix}cuddle2 ${featError("cuddle2")? yes : no }
  │⭔ ${prefix}dance ${featError("dance")? yes : no }
  │⭔ ${prefix}glomp ${featError("glomp")? yes : no }
  │⭔ ${prefix}handhold ${featError("handhold")? yes : no }
  │⭔ ${prefix}happy ${featError("happy")? yes : no }
  │⭔ ${prefix}hentai ${featError("hentai")? yes : no }
  │⭔ ${prefix}highfive ${featError("highfive")? yes : no }
  │⭔ ${prefix}hug ${featError("hug")? yes : no }
  │⭔ ${prefix}hug2 ${featError("hug2")? yes : no }
  │⭔ ${prefix}kick ${featError("kick")? yes : no }
  │⭔ ${prefix}kill ${featError("kill")? yes : no }
  │⭔ ${prefix}kill2 ${featError("kill2")? yes : no }
  │⭔ ${prefix}kiss ${featError("kiss")? yes : no }
  │⭔ ${prefix}kiss2 ${featError("kiss2")? yes : no }
  │⭔ ${prefix}lesbian ${featError("lesbian")? yes : no }
  │⭔ ${prefix}lick ${featError("lick")? yes : no }
  │⭔ ${prefix}megumin ${featError("megumin")? yes : no }
  │⭔ ${prefix}neko ${featError("neko")? yes : no }
  │⭔ ${prefix}neko2 ${featError("neko2")? yes : no }
  │⭔ ${prefix}nom ${featError("nom")? yes : no }
  │⭔ ${prefix}pat ${featError("pat")? yes : no }
  │⭔ ${prefix}pat2 ${featError("pat2")? yes : no }
  │⭔ ${prefix}poke ${featError("poke")? yes : no }
  │⭔ ${prefix}punch ${featError("punch")? yes : no }
  │⭔ ${prefix}shinobu ${featError("shinobu")? yes : no }
  │⭔ ${prefix}slap ${featError("slap")? yes : no }
  │⭔ ${prefix}slap2 ${featError("slap2")? yes : no }
  │⭔ ${prefix}smile ${featError("smile")? yes : no }
  │⭔ ${prefix}smug ${featError("smug")? yes : no }
  │⭔ ${prefix}trap ${featError("trap")? yes : no }
  │⭔ ${prefix}waifu ${featError("waifu")? yes : no }
  │⭔ ${prefix}waifu2 ${featError("waifu2")? yes : no }
  │⭔ ${prefix}waifu3 ${featError("waifu3")? yes : no }
  │⭔ ${prefix}wave ${featError("wave")? yes : no }
  │⭔ ${prefix}wink ${featError("wink")? yes : no }
  │⭔ ${prefix}wink2 ${featError("wink2")? yes : no }
  │⭔ ${prefix}yeet ${featError("yeet")? yes : no }
  │
  ╰────────────˧`
}

const storageMenu = (prefix) => {
return `
  ╭─▸ 𝘚𝘵𝘰𝘳𝘢𝘨𝘦 𝘔𝘦𝘯𝘶
  │
  │⭔ ${prefix}addowner ${featError("addowner")? yes : no }
  │⭔ ${prefix}addpremium ${featError("addpremium")? yes : no }
  │⭔ ${prefix}addsewa ${featError("addsewa")? yes : no }
  │⭔ ${prefix}addstick ${featError("addstick")? yes : no }
  │⭔ ${prefix}addvn ${featError("addvn")? yes : no }
  │⭔ ${prefix}addread ${featError("addread")? yes : no }
  │⭔ ${prefix}addlimit ${featError("addlimit")? yes : no }
  │⭔ ${prefix}addbalance ${featError("addbalance")? yes : no }
  │⭔ ${prefix}setcmd ${featError("setcmd")? yes : no }
  │⭔ ${prefix}delowner ${featError("delowner")? yes : no }
  │⭔ ${prefix}depremium ${featError("depremium")? yes : no }
  │⭔ ${prefix}delsewa ${featError("delsewa")? yes : no }
  │⭔ ${prefix}delstick ${featError("delstick")? yes : no }
  │⭔ ${prefix}delvn ${featError("delvn")? yes : no }
  │⭔ ${prefix}delread ${featError("delread")? yes : no }
  │⭔ ${prefix}kuranglimit ${featError("kuranglimit")? yes : no }
  │⭔ ${prefix}kurangbalance ${featError("kurangbalance")? yes : no }
  │⭔ ${prefix}delcmd ${featError("delcmd")? yes : no }
  │⭔ ${prefix}listowner ${featError("listowner")? yes : no }
  │⭔ ${prefix}listpremium ${featError("listpremium")? yes : no }
  │⭔ ${prefix}listsewa ${featError("listsewa")? yes : no }
  │⭔ ${prefix}liststick ${featError("liststick")? yes : no }
  │⭔ ${prefix}listvn ${featError("listvn")? yes : no }
  │⭔ ${prefix}listread ${featError("listread")? yes : no }
  │⭔ ${prefix}listunread ${featError("listunread")? yes : no }
  │⭔ ${prefix}listblock ${featError("listblock")? yes : no }  
  │⭔ ${prefix}listban ${featError("listban")? yes : no }  
  │⭔ ${prefix}listblockcmd ${featError("listblockcmd")? yes : no }  
  │⭔ ${prefix}listerror ${featError("listerror")? yes : no }  
  │⭔ ${prefix}clearowner ${featError("clearowner")? yes : no }  
  │⭔ ${prefix}clearpremium ${featError("clearpremium")? yes : no }  
  │⭔ ${prefix}clearsewa ${featError("clearsewa")? yes : no }  
  │⭔ ${prefix}clearstick ${featError("clearstick")? yes : no }  
  │⭔ ${prefix}clearvn ${featError("clearvn")? yes : no }  
  │⭔ ${prefix}clearread ${featError("clearread")? yes : no }
  │⭔ ${prefix}clearban ${featError("clearban")? yes : no }  
  │⭔ ${prefix}clearblock ${featError("clearblock")? yes : no }  
  │⭔ ${prefix}clearblockcmd ${featError("clearblockcmd")? yes : no }  
  │⭔ ${prefix}clearerror ${featError("clearerror")? yes : no }  
  │⭔ ${prefix}clearusers ${featError("clearusers")? yes : no }  
  │⭔ ${prefix}clearmess ${featError("clearmess")? yes : featError("clearstore")? yes : no }  
  │⭔ ${prefix}cleardash ${featError("cleardash")? yes : no } 
  │⭔ ${prefix}cleardb ${featError("cleardb")? yes : no } 
  │
  ╰────────────˧`
}

const fitur = (prefix) => {
return `
${ownerMenu(prefix)}
${groupMenu(prefix)}
${storeMenu(prefix)}
${toolsMenu(prefix)}
${funMenu(prefix)}
${tagsMenu(prefix)}
${downloadMenu(prefix)}
${converterMenu(prefix)}
${searchMenu(prefix)}
${anonymousMenu(prefix)}
${jadibotMenu(prefix)}
${randomMenu(prefix)}
${storageMenu(prefix)}
  
`}

module.exports = {
ownerMenu, 
groupMenu, 
storeMenu, 
toolsMenu, 
funMenu, 
tagsMenu, 
downloadMenu, 
converterMenu, 
searchMenu, 
anonymousMenu, 
jadibotMenu, 
randomMenu, 
storageMenu, 
menu, 
fitur
}



let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})