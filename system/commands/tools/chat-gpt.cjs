const util = require("util") 
const { ChatGPTRequest } = require("../../libs/scrapper.cjs") 
module.exports = {
    commands: ["ai"],
    minArgs: 2,
    expectedArgs: "<teks>",
    example: "{prefix}{command} siapa presiden Indonesia",
    tags: "tools menu", 
    isSewa: true,
    isPremium: true,
    callback: async ({ m, cmdSuccess, cmdFailed, command }) => {
        try {
            const { status, data, message } = await ChatGPTRequest(m.text)
            if (!status) return m.reply(util.format(message))        
            m.reply(util.format(data))
            cmdSuccess(command, "tools menu")
        } catch (error) {
            cmdFailed(command, "tools menu", error)
        }
    }
}