const chokidar = require("chokidar") 
const path = require("path") 
const chalk = require("chalk") 
const fs = require("fs") 

const localUpdate = () => {
    chokidar.watch([path.join(process.cwd(), "system")], { persistent: true })
    .on("change", (Path) => {
        console.log(chalk.whiteBright("├"), chalk.red("[ UPDATE ]"), chalk.whiteBright(Path))
        if (Path.includes("cjs")) {
            fs.watchFile(Path, () => {
                fs.unwatchFile(Path)
                delete require.cache[Path]
                require(Path)
            })
        } else {
            fs.watchFile(Path, async () => {
                fs.unwatchFile(Path)
                await import(`${Path}?update=${Date.now()}`)
            })
        }
    })
}


module.exports = { localUpdate }