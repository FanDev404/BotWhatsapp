const fs = require("fs") 
const chalk = require("chalk")
const { pickRandom } = require("@libs/function")
module.exports = {
    commands: ["cariteman"],
    cooldown: 13,
    isSewa: true,
    isPremium: true, 
    callback: async ({ sock, m }) => {
        const results = pickRandom(Object.keys(db.users).filter((x) => !x.includes(m.sender)))
        setTimeout(() => {
        m.reply("Mulai mencari.......")
        }, 1000)
        setTimeout(() => {
        m.reply("Berhasil mendapatkan 1 orang")
        }, 5000)
        setTimeout(() => {
        sock.sendContact(m.chat, results.split("@")[0], db.users[results].name, m)
        }, 9000)
    }
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})