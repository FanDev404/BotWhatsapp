import fs from "fs"
import { basename } from "path"
import { isFiles } from "../../libs/function.js"
export default {
    commands: ["updatefile"],
    tags: "owner menu", 
    isSewa: true,
    isCreator: true,
    isMedia: {
        isDocument: true, 
        isQuotedMedia: {
            isQuotedDocument: true
        }
    }, 
    callback: async ({ mywa, m, command, cmdSuccess, cmdFailed, isQuotedDocument }) => {
        try {
            const data = {}
            for(let x of fs.readdirSync("./").filter((x) => isFiles(x)).map((x) => "./" + x)) {
                if (!Object.keys(data).includes(basename(x))) data[basename(x)] = { temp: x }
            }
            for(let x of fs.readdirSync("./local-json").filter((x) => isFiles("./local-json/" + x)).map((x) => "./local-json/" + x)) {
                if (!Object.keys(data).includes(basename(x))) data[basename(x)] = { temp: x }
            }
            for(let x of fs.readdirSync("./temp").filter((x) => isFiles("./temp/" + x)).map((x) => "./temp/" + x)) {
                if (!Object.keys(data).includes(basename(x))) data[basename(x)] = { temp: x }
            }
            for(let x of fs.readdirSync("./system").filter((x) => isFiles("./system/" + x)).map((x) => "./system/" + x)) {
                if (!Object.keys(data).includes(basename(x))) data[basename(x)] = { temp: x }
            }
            for(let x of fs.readdirSync("./system/message").filter((x) => isFiles("./system/message/" + x)).map((x) => "./system/message/" + x)) {
                if (!Object.keys(data).includes(basename(x))) data[basename(x)] = { temp: x }
            }
            for(let x of fs.readdirSync("./system/libs").filter((x) => isFiles("./system/libs/" + x)).map((x) => "./system/libs/" + x)) {
                if (!Object.keys(data).includes(basename(x))) data[basename(x)] = { temp: x }
            }
            for(let a of fs.readdirSync("./system/commands")) {
                for(let b of fs.readdirSync("./system/commands/" + a).map((x) => "./system/commands/" + a + "/" + x)) {
                    if (!Object.keys(data).includes(basename(b))) data[basename(b)] = { temp: b }
                }
            }
            const fileName = isQuotedDocument? m.quoted.fileName : m.fileName
            const media = await mywa.downloadMediaMessage(isQuotedDocument? m.quoted : m)
            fs.writeFileSync(data[fileName].temp, media)
            m.reply("Success update file, Restaring bot...")
            setTimeout(() => {
                process.send("reset")
            }, 5000)
            cmdSuccess(command, "owner menu")
        } catch (error) {
            cmdFailed(command, "owner menu", error)
        }
    }
}