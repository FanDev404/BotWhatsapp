const moment = require("moment-timezone")
module.exports = {
    commands: ["speed"],
    tags: "main menu", 
    isSewa: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            m.reply(`*_${moment.duration(Date.now() - parseInt(m.timesTamp.toString()) * 1000).asSeconds()} second_*`)
            cmdSuccess(command, "main menu")
        } catch (error) {
            cmdFailed(command, "main menu", error)
        }
    }
}