const fs = require("fs") 
const util = require("util") 
const path = require("path") 
const chalk = require("chalk") 
const stable = require("json-stable-stringify") 
const qrcode = require("qrcode-terminal") 
const archiver = require("archiver") 
const moment = require("moment-timezone") 
const { exec } = require("child_process") 
const { platform } = require("os") 
const { chromium } = require("playwright-chromium") 
const { localUpdate } = require("./libs/localUpdate.cjs") 
const { loadDatabase } = require("./message/database.cjs") 
const { groupMessage } = require("./message/welcome-group.cjs")
const { Message, readCommands } = require("./message/msg.cjs")
//=================================================//
const settings = JSON.parse(fs.readFileSync("settings.json")) 
const database = JSON.parse(fs.readFileSync("local-json/db.json"))
const port = process.env.PORT || 3000   
//=================================================//
global.db = {
    "allcommand": {},
    "anonymous": [],
    "antispam": {},
    "banned": {},
    "blockcmd": [],
    "code": {},
    "dashboard": {}, 
    "devoloper": "6289674310267",
    "groups": {},
    "listerror": {},
    "owner": {},
    "premium": {},
    "users": {},
    "settings": settings,
    "sewa": {},
    "vip": {},
    ...(database || {})
}
//=================================================//
const connectToWhatsApp = async () => {
//=================================================//
process.on("uncaughtException", (err) => console.log(chalk.whiteBright("├"), chalk.red("[ ERROR ]"), `${err}`))
process.on("unhandledRejection", (err) => console.log(chalk.whiteBright("├"), chalk.red("[ ERROR ]"), `${err}`))
//=================================================//
    const { time, calender } = (await import("./libs/function.js")) 
    const { LinkingMethod } = (await import("mywajs")).default
    const { Client, serialize } = (await import("./libs/serialize.js"))
//=================================================//
    global.commands = new (await import(`./libs/collection.js?v=${Date.now()}`)).default()
//=================================================//
    const mywa = new Client({
        "linkingMethod": settings.local_session.status_scan == false? new LinkingMethod({ "phone": { "number": settings.local_session.phone }}) : undefined,
        "playwright": {
            "headless": true,
            "devtools": false,
            "args": ["--no-sandbox"],
            "executablePath": platform() == "win32"? chromium.executablePath() : (platform() == "linux" && process?.env?.HOME == "/home/container")? "/usr/bin/chromium" : platform() == "linux"? "/usr/bin/google-chrome-stable" : ""
        },
        "markOnlineAvailable": true,
        "authTimeoutMs": 60000,
    })
//=================================================//
    mywa.initialize()
//=================================================//
    if (settings.local_session.status_scan) {
        mywa.on("qr", (qr) => {
            qrcode.generate(qr, { small: true })
        })
    } else {
        mywa.on("code", (code) => {
            console.log(code) 
        })
    }
//=================================================//
    mywa.on("authenticated", () => {
        localUpdate()
        readCommands() 
        console.log(chalk.whiteBright("├"), chalk.keyword("aqua")("[ CONNECT ]"), "Connecting to the WhatsApp bot....")
    })
//=================================================//
    mywa.on("ready", m => {
        mywa.sendMessage(db.settings.ownerNumber + "@c.us", "WhatsApp bot is redy....")
        setInterval(async () => {
            if (db.settings.local_backup.status) {
                //await fs.writeFileSync("temp/db.json", stable({ "allcommand": db.allcommand, "anonymous": db.anonymous, "antispam": db.antispam, "banned": db.banned, "blockcmd": db.blockcmd, "code": db.code, "dashboard": db.dashboard, "devoloper": db.devoloper, "groups": db.groups, "listerror": db.listerror, "owner": db.owner, "premium": db.premium, "users": db.users, "sewa": db.sewa, "vip": db.vip }, { "space": "  "}))
                const timeWib = moment().locale("id").tz("Asia/Jakarta").format("dddd, DD MMMM YYYY HH:mm:ss")
                const files = fs.readdirSync(".").filter((x) => ["local-json","system","temp","index.js","main.cjs","package.json","settings.json"].includes(x))
                const output = fs.createWriteStream(path.join(process.cwd(), "temp", "BotWhatsapp.zip"))
                const archive = archiver("zip")
                archive.pipe(output)
                for (let x of files) {
                    const lockFile = path.join(process.cwd(), x)
                    if ((fs.lstatSync(lockFile)).isDirectory()) {
                        archive.directory(lockFile, x)
                    } else {
                        archive.file(lockFile, { name: x })
                    }
                }
                await archive.finalize()
                await mywa.sendMessageV2(db.settings.ownerNumber + "@c.us", { document: fs.readFileSync("temp/BotWhatsapp.zip"), fileName: "BotWhatsapp.zip", caption: timeWib })
                //await mywa.sendMessageV2(db.settings.ownerNumber + "@c.us", { document: fs.readFileSync("temp/db.json"), fileName: "db.json", caption: timeWib })
                await fs.unlinkSync("temp/BotWhatsapp.zip")
                //await fs.unlinkSync("temp/db.json")
            }
        }, Number(time(db.settings.local_backup.time)))
        setInterval(() => {
            if (db.settings.local_restart.status) process.send("reset")
        }, Number(time(db.settings.local_restart.time)))
    })
//=================================================//
    mywa.on("disconnected", (msg) => {
        console.log(chalk.whiteBright("├"), chalk.red("[ ERROR ]"), chalk.whiteBright(msg))
        process.send("reset")
    })
//=================================================//
    mywa.on("message_create", async (msg) => {
        if (!msg) return 
        const m = await (await serialize(mywa, msg)) 
        await (await loadDatabase(m)) 
        await (await Message(mywa, m, msg)) 
    })
//=================================================//
    mywa.on("group_join", async (msg) => {
        await (await groupMessage(mywa, msg))
    })
//=================================================//
    mywa.on("group_leave", async (msg) => {
        await (await groupMessage(mywa, msg)) 
    })
//=================================================//
    setInterval(async () => {
        await fs.writeFileSync("local-json/db.json", stable({ "allcommand": db.allcommand, "anonymous": db.anonymous, "antispam": db.antispam, "banned": db.banned, "blockcmd": db.blockcmd, "code": db.code, "dashboard": db.dashboard, "devoloper": db.devoloper, "groups": db.groups, "listerror": db.listerror, "owner": db.owner, "premium": db.premium, "users": db.users, "sewa": db.sewa, "vip": db.vip }, { "space": "  "}))
        await fs.writeFileSync("settings.json", stable(global.db.settings, { "space": "  "}))
        for (let x of Object.keys(db.dashboard).filter((x) => !x.includes(calender()))) {
            delete db.dashboard[x]
        }
        for(let x of fs.readdirSync("./").filter((x) => ![".mywa_auth","local-json","node_modules","system","temp","index.js","main.cjs","package.json","settings.json"].includes(x))) {
            exec("rm -rf " + x)
        }
        for (let x of Object.keys(db.allcommand).filter((x) => db.allcommand[x].type !== "case")) {
            if (Object.keys((commands.get(x) || {})).length == 0) delete db.allcommand[x]
        }
    }, 3000)
//=================================================//
    return mywa
}



module.exports = { connectToWhatsApp } 
