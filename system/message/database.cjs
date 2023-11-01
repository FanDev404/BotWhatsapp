const loadDatabase = async (m) => {
    const { time, calender } = (await import("../libs/function.js"))
//================================================================\\
    if (Object.keys(db.dashboard).includes(calender())) {
        if (!("commands" in db.dashboard[calender()])) db.dashboard[calender()].commands = {}
    } else db.dashboard[calender()] = { 
        "commands": {} 
    }
//================================================================\\
    if (m.isGroup && Object.keys(db.groups).includes(m.chat)) {
        if (!("name" in db.groups[m.chat])) db.groups[m.chat].name = m.groupName
        if (!("anti_link" in db.groups[m.chat])) db.groups[m.chat].anti_link = {
            "status": false, 
            "type": "delete"
        }
        if (!("anti_link_youtube" in db.groups[m.chat])) db.groups[m.chat].anti_link_youtube = {
            "status": false, 
            "type": "delete"
        }
        if (!("anti_link_facebook" in db.groups[m.chat])) db.groups[m.chat].anti_link_facebook = {
            "status": false, 
            "type": "delete"
        }
        if (!("anti_link_instagram" in db.groups[m.chat])) db.groups[m.chat].anti_link_instagram = {
            "status": false, 
            "type": "delete"
        }
        if (!("anti_link_telegram" in db.groups[m.chat])) db.groups[m.chat].anti_link_telegram = {
            "status": false, 
            "type": "delete"
        }
        if (!("anti_link_whatsapp" in db.groups[m.chat])) db.groups[m.chat].anti_link_whatsapp = {
            "status": false, 
            "type": "delete"
        }
        if (!("anti_link_tiktok" in db.groups[m.chat])) db.groups[m.chat].anti_link_tiktok = {
            "status": false, 
            "type": "delete"
        }
        if (!("anti_link_twitter" in db.groups[m.chat])) db.groups[m.chat].anti_link_twitter = {
            "status": false, 
            "type": "delete"
        }
        if (!("anti_virtex" in db.groups[m.chat])) db.groups[m.chat].anti_virtex = {
            "status": false, 
            "type": "delete"
        }
        if (!("anti_tag" in db.groups[m.chat])) db.groups[m.chat].anti_tag = {
            "status": false, 
            "type": "delete"
        }
        if (!("anti_toxic" in db.groups[m.chat])) db.groups[m.chat].anti_toxic = {
            "status": false, 
            "type": "delete"
        }
        if (!("anti_sange" in db.groups[m.chat])) db.groups[m.chat].anti_sange = {
            "status": false, 
            "type": "delete"
        }
        if (!("anti_nfsw" in db.groups[m.chat])) db.groups[m.chat].anti_nfsw = {
            "status": false, 
            "type": "delete"
        }
        if (!("anti_asing" in db.groups[m.chat])) db.groups[m.chat].anti_asing = false
        if (!("anti_delete" in db.groups[m.chat])) db.groups[m.chat].anti_delete = false
        if (!("anti_view_once" in db.groups[m.chat])) db.groups[m.chat].anti_view_once = false
        if (!("mute" in db.groups[m.chat])) db.groups[m.chat].mute = false
        if (!("welcome" in db.groups[m.chat])) db.groups[m.chat].welcome = false
        if (!("store" in db.groups[m.chat])) db.groups[m.chat].store = { 
            "payment": { 
                "text": "", 
                "image": "" 
            }, 
            "image": "", 
            "proses": "", 
            "done": "", 
            "key": {} 
        }
        if (!("sewa" in db.groups[m.chat])) db.groups[m.chat].sewa = { 
            "status": (Object.keys(db.sewa).includes(m.chat) || db.settings.vipSewa.includes(m.chat))? false : true, 
            "date": calender(), 
            "expired": (Object.keys(db.sewa).includes(m.chat) || db.settings.vipSewa.includes(m.chat))? 0 : Date.now() + time("1days") 
        }
        if (!("settings_welcome" in db.groups[m.chat])) db.groups[m.chat].settings_welcome = { 
            "add": "BEBAN GROUP NAMBAH LAGI :V", 
            "leave": "BEBAN GROUP KELUAR :V"
        }
        if (!Array.isArray(db.groups[m.chat].afk_group)) db.groups[m.chat].afk_group = []
        if (!m.isNumber(db.groups[m.chat].limit)) db.groups[m.chat].limit = 200
    } else if (m.isGroup) db.groups[m.chat] = {
        "name": m.groupName, 
        "anti_link": {
            "status": false, 
            "type": "delete"
        }, 
        "anti_link_youtube": {
            "status": false, 
            "type": "delete"
        }, 
        "anti_link_facebook": {
            "status": false, 
            "type": "delete"
        }, 
        "anti_link_instagram": {
            "status": false, 
            "type": "delete"
        }, 
        "anti_link_telegram": {
            "status": false, 
            "type": "delete"
        }, 
        "anti_link_whatsapp": {
            "status": false, 
            "type": "delete"
        }, 
        "anti_link_tiktok": {
            "status": false, 
            "type": "delete"
        }, 
        "anti_link_twitter": {
            "status": false, 
            "type": "delete"
        }, 
        "anti_virtex": {
            "status": false, 
            "type": "delete"
        }, 
        "anti_tag": {
            "status": false, 
            "type": "delete"
        }, 
        "anti_toxic": {
            "status": false, 
            "type": "delete"
        }, 
        "anti_sange": {
            "status": false, 
            "type": "delete"
        }, 
        "anti_nfsw": {
            "status": false, 
            "type": "delete"
        }, 
        "anti_asing": false, 
        "anti_delete": false, 
        "anti_view_once": false, 
        "mute": false, 
        "welcome": false, 
        "store": { 
            "payment": { 
                "text": "", 
                "image": "" 
            }, 
            "image": "", 
            "proses": "", 
            "done": "", 
            "key": {} 
        }, 
        "sewa": { 
            "status": (Object.keys(db.sewa).includes(m.chat) || db.settings.vipSewa.includes(m.chat))? false : true, 
            "date": calender(), 
            "expired": (Object.keys(db.sewa).includes(m.chat) || db.settings.vipSewa.includes(m.chat))? 0 : Date.now() + time("1days") 
        },
        "settings_welcome": { 
            "add": "BEBAN GROUP NAMBAH LAGI :V", 
            "leave": "BEBAN GROUP KELUAR :V"
        }, 
        "afk_group": [],
        "limit": 200
    }
//================================================================\\
    if (Object.keys(db.users).includes(m.sender)) {
        if (!("name" in db.users[m.sender])) db.users[m.sender].name = m.pushName
        if (!("level" in db.users[m.sender])) db.users[m.sender].level = m.isPremium(m.sender)? "Primordial Glory" : "Low Tier"
        if (!m.isNumber(db.users[m.sender].xp)) db.users[m.sender].xp = 1
        if (!m.isNumber(db.users[m.sender].balance)) db.users[m.sender].balance = m.isPremium(m.sender)? "Unlimited" : 0
        if (!m.isNumber(db.users[m.sender].limit)) db.users[m.sender].limit = m.isPremium(m.sender)? "Unlimited" : db.settings.limitAwal
        if (Object.keys(db.users[m.sender]).includes("name") && m.pushName !== "No Name" && db.users[m.sender].name !== m.pushName) { 
            db.users[m.sender].name = m.pushName 
        }
        if (Object.keys(db.users[m.sender]).includes("level") && (m.key.fromMe? true : m.isPremium(m.sender)) && db.users[m.sender].level !== "Primordial Glory") { 
            db.users[m.sender].level = "Primordial Glory" 
        }
        if (Object.keys(db.users[m.sender]).includes("limit") && (m.key.fromMe? true : m.isPremium(m.sender)) && !isNaN(db.users[m.sender].limit)) {
            db.users[m.sender].limit = "Unlimited"
        }
        if (Object.keys(db.users[m.sender]).includes("balance") && (m.key.fromMe? true : m.isPremium(m.sender)) && !isNaN(db.users[m.sender].balance)) {
            db.users[m.sender].balance = "Unlimited"
        }
        if (Object.keys(db.users[m.sender]).includes("level") && !m.isPremium(m.sender) && db.users[m.sender].level == "Primordial Glory") {
            db.users[m.sender].level = "Low Tier"
        }
        if (Object.keys(db.users[m.sender]).includes("limit") && !m.isPremium(m.sender) && isNaN(db.users[m.sender].limit)) {
            db.users[m.sender].limit = db.settings.limitAwal
        }
        if (Object.keys(db.users[m.sender]).includes("balance") && !m.isPremium(m.sender) && isNaN(db.users[m.sender].balance)) {
            db.users[m.sender].balance = 0
        }
    } else db.users[m.sender] = {
        "name": m.pushName, 
        "level": m.isPremium(m.sender)? "Primordial Glory" : "Low Tier",
        "xp": 1,
        "balance": m.isPremium(m.sender)? "Unlimited" : 0,
        "limit": m.isPremium(m.sender)? "Unlimited" : db.settings.limitAwal
    }
//================================================================\\
}


module.exports = { loadDatabase }