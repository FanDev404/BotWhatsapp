const util = require("util") 
const axios = require("axios") 
module.exports = {
    commands: ["gempa"],
    tags: "tools menu", 
    isSewa: true,
    callback: async ({ m, cmdSuccess, cmdFailed, command }) => {
        try {
            let teks = ""
            let { status, data } = await axios.get("https://bmkg-content-inatews.storage.googleapis.com/datagempa.json?t=${Date.now()}")
            if (!status == 200) return m.reply("Server sedang maitance...")
            teks += `‼ ${data?.info?.instruction}\n\n`
            teks += `📅 *Tanggal :* ${data?.info?.timesent}\n`
            teks += `📌 *Koordinat :* ${data?.info?.latitude} - ${data?.info?.longitude}\n`
            teks += `🌊 *Kedalaman :* ${data?.info?.depth}\n`
            teks += `🌋 *Magnitudo :* ${data?.info?.magnitude}\n`
            teks += `📍 *Area :* ${data?.info?.area}\n`
            teks += `📈 *Potensi :* ${data?.info?.potential}\n`
            teks += `📈 *Dirasakan :* ${data?.info?.felt}`
            m.reply(util.format(teks))
            cmdSuccess(command, "tools menu")
        } catch (error) {
            cmdFailed(command, "tools menu", error)
        }
    }
}