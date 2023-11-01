import fs from "fs"
import { basename } from "path"
import { isFiles } from "../../libs/function.js"
export default {
    commands: ["delfile"],
    tags: "owner menu", 
    minArgs: 1,
    expectedArgs: "<teks>",
    example: "{prefix}{command} package.json",
    isSewa: true,
    isCreator: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
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
            if (m.text.includes("node_modules")) return m.reply("Sizenya gede banget kak 🙂")
            if (m.text.includes(".mywa_auth")) return m.reply("Sizenya gede banget kak 🙂")
            if (!Object.keys(data).includes(basename(m.text))) return m.reply("File not found")
            fs.unlinkSync(data[basename(m.text)].temp)
            m.reply("Success delete file " + m.text) 
            cmdSuccess(command, "owner menu")
        } catch (error) {
            cmdFailed(command, "owner menu", error)
        }
    }
}