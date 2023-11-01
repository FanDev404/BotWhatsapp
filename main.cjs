const path = require("path") 
const i18n = require("i18n") 
const chalk = require("chalk") 
const { connectToWhatsApp } = require("./system/connect.cjs") 


i18n.configure({
    locales: ["mess"],
    defaultLocale: "mess",
    autoReload: true,
    directory: path.join(__dirname, "local-json"),
    objectNotation: true,
})




connectToWhatsApp()