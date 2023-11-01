import { runtime } from "../../libs/function.js"
export default {
    commands: ["runtime"],
    tags: "main menu", 
    isSewa: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            m.reply(`${runtime(process.uptime())}`)
            cmdSuccess(command, "main menu")
        } catch (error) {
            cmdFailed(command, "main menu", error)
        }
    }
}