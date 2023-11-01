const path = require("path") 
const { spawn } = require("child_process")
const { platform } = require("os") 
const { watchFile, unwatchFile } = require("fs") 

var isRunning = false

function start(file) {
    if (isRunning) return
    isRunning = true
    let args = [path.join(__dirname, file), ...process.argv.slice(2)];
    let p = spawn(process.argv[0], args, {
        stdio: ["inherit", "inherit", "inherit", "ipc"]
    })
        .on("message", data => {
            switch (data) {
            case "reset":
                platform() == "win32"? p.kill("SIGINT") : p.kill()
                isRunning = false
                start.apply(this, arguments)
            break
            }
        })
        .on("exit", (code) => {
            isRunning = false
            if (code == 0) return
            watchFile(args[0], () => {
                unwatchFile(args[0])
                start(file)
            })
        })
}

start("main.js")