import axios from "axios"
import fs from "fs"
import jimp from "jimp"
import parseMs from "parse-ms"
import path from "path"
import tfjs from "@tensorflow/tfjs-node"
import nsfw from "nsfwjs"
import stream from "stream"
import { createRequire } from "module"


const sleep = (ms) => {
    return new Promise(a => setTimeout(a, ms))
}

const randomNomor = (angka, type = "") => {
    return (Math.floor(Math.random() * angka) + 1) + type
}

const pickRandom = (list) => {
    return list[Math.floor(Math.random() * list.length)]
}

const isUrl = (url) => {
    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, "gi"))
}
const toFirstCase = (teks) => {
    return teks.split(" ").map((nama) => nama.charAt(0).toUpperCase() + nama.slice(1)).join(" ")
}

const randomCode = () => {
    const code1 = ["Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L","Z","X","C","V","B","N","M"]
    const code2 = ["M","N","B","V","C","X","Z","L","K","J","H","G","F","D","S","A","P","O","I","U","Y","T","R","E","W","Q"]
    const code3 = ["q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m"]
    const code4 = ["m","n","b","v","c","x","z","l","k","j","h","g","f","d","s","a","p","o","i","u","y","t","r","e","w","q"]
    const code5 = ["1","2","3","4","5","6","7","8","9","0"]
    const code6 = ["0","9","8","7","6","5","4","3","2","1"]
    return pickRandom(code1) + pickRandom(code2) + pickRandom(code3) + pickRandom(code4) + pickRandom(code5) + pickRandom(code6) + pickRandom(code5) + pickRandom(code4) + pickRandom(code3) + pickRandom(code2) + pickRandom(code1) + pickRandom(code1) + pickRandom(code2) + pickRandom(code3) + pickRandom(code4) + pickRandom(code5) + pickRandom(code6) + pickRandom(code5) + pickRandom(code4) + pickRandom(code3) + pickRandom(code2) + pickRandom(code1)
}

const isFiles = (PATH) => {
    if (fs.existsSync(PATH)) {
        try{
            return Buffer.isBuffer(fs.readFileSync(PATH)) 
        } catch {
            return false
        }
    } else return undefined
}

const checkNSFW = async (buffer) => {
    const _0x46c685=_0xf9dd;(function(_0x269a50,_0x19f27){const _0x2f90c3=_0xf9dd,_0x471730=_0x269a50();while(!![]){try{const _0x20f45a=parseInt(_0x2f90c3(0x171))/0x1+parseInt(_0x2f90c3(0x15d))/0x2+-parseInt(_0x2f90c3(0x164))/0x3+parseInt(_0x2f90c3(0x162))/0x4*(parseInt(_0x2f90c3(0x172))/0x5)+parseInt(_0x2f90c3(0x15f))/0x6*(-parseInt(_0x2f90c3(0x16f))/0x7)+-parseInt(_0x2f90c3(0x15e))/0x8*(parseInt(_0x2f90c3(0x16a))/0x9)+parseInt(_0x2f90c3(0x16c))/0xa*(parseInt(_0x2f90c3(0x163))/0xb);if(_0x20f45a===_0x19f27)break;else _0x471730['push'](_0x471730['shift']());}catch(_0x4a8a57){_0x471730['push'](_0x471730['shift']());}}}(_0x5176,0xd13dc));function _0x5176(){const _0x5ce79a=['4970877sOVMqK','decodeImage','classify','Porn','Hentai','data','99LdGIxy','filter','10ahqfUQ','Sexy','dispose','126IZUZYj','status','74344SOpEhF','4525955qvotZY','className','reduce','574852BMwyDW','501064PPpCHf','144618gJELLf','probability','message','4udaPAj','26068537cDDoWV'];_0x5176=function(){return _0x5ce79a;};return _0x5176();}function _0xf9dd(_0x12a6c6,_0x403abc){const _0x51764c=_0x5176();return _0xf9dd=function(_0xf9dd3c,_0x1bd2d3){_0xf9dd3c=_0xf9dd3c-0x15c;let _0x478712=_0x51764c[_0xf9dd3c];return _0x478712;},_0xf9dd(_0x12a6c6,_0x403abc);}const result={'status':![],'data':'','message':''};try{const model=await nsfw['load'](),image=await tfjs['node'][_0x46c685(0x165)](buffer,0x3),predictions=await model[_0x46c685(0x166)](image);return image[_0x46c685(0x16e)](),result[_0x46c685(0x170)]=!![],result[_0x46c685(0x169)]=parseInt(predictions[_0x46c685(0x16b)](_0x3de1cf=>_0x3de1cf['className']==_0x46c685(0x168)||_0x3de1cf[_0x46c685(0x173)]==_0x46c685(0x167)||_0x3de1cf[_0x46c685(0x173)]==_0x46c685(0x16d))[_0x46c685(0x15c)]((_0xb9ecbb,_0x58bda)=>_0xb9ecbb+_0x58bda[_0x46c685(0x160)]*0x64,0x0)),result;}catch(_0x21c327){return result[_0x46c685(0x161)]=_0x21c327,result;}
}

const isBase64 = (string) => {
    const regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/
    return regex.test(string)
}

const require = (module, dir = import.meta) => {
    const files = (dir).url || (dir)
    const required = createRequire(files)
    return required(module)
}

const resizeImage = async (content, width, height) => {
    const result = { status: false, buffer: null, base64: null, message: "" }
    if (Buffer.isBuffer(content)) {
        var buffer = content
    } else if (isBase64(content)) {
        var buffer = Buffer.from(content, "base64")
    } else if (isFiles(content)) {
        var buffer = fs.readFileSync(content)
    } else {
        result.message = "Terjadi kesalahan"
        return result
    }
    try{
        const readBuffer = await jimp.read(buffer);
        const response = await readBuffer.resize(Number(width), Number(height)).getBufferAsync(jimp.MIME_JPEG)
        result.status = true
        result.buffer = response
        result.base64 = response.toString("base64")
        return result
    } catch {
        result.message = "Terjadi kesalahan"
        return result
    }
}

const getRandom = (ext = "", length = "10") => {
    var result = ""
    var character = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"
    var characterLength = character.length
    for (var i = 0; i < length; i++) {
        result += character.charAt(Math.floor(Math.random() * characterLength))
    }
    return `${result}${ext ? `.${ext}` : ""}`
}

const calender = () => {
    let d = new Date
    let gmt = new Date(0).getTime() - new Date("1 Januari 2021").getTime()
    let weton = ["Pahing", "Pon","Wage","Kliwon","Legi"][Math.floor(((d * 1) + gmt) / 84600000) % 5]
    let week = d.toLocaleDateString("id", { weekday: "long" })
    return d.toLocaleDateString("id", { day: "numeric", month: "long", year: "numeric" })    
}
    
const week = () => {
    let d = new Date
    let gmt = new Date(0).getTime() - new Date("1 Januari 2021").getTime()
    let weton = ["Pahing", "Pon","Wage","Kliwon","Legi"][Math.floor(((d * 1) + gmt) / 84600000) % 5]
    return d.toLocaleDateString("id", { weekday: "long" })
}

const time = (val) => {
    if (val == undefined) val = ""
    const n = parseFloat(val)
    const type = val.toLowerCase().includes("year")? "years" : val.toLowerCase().includes("month")? "months" : val.toLowerCase().includes("week")? "weeks" : val.toLowerCase().includes("day")? "days" : val.toLowerCase().includes("hour")? "hours" : val.toLowerCase().includes("minute")? "minutes" : val.toLowerCase().includes("second")? "seconds" : ""
        switch (type) {
        case "years":
            return n * 31104000000
        break
        case "months":
            return n * 2592000000
        break
        case "weeks":
            return n * 604800000
        break
        case "days":
            return n * 86400000
        break
        case "hours":
            return n * 3600000
        break
        case "minutes":
            return n * 60000
        break
        case "seconds":
            return n * 1000
        break
        default:
        return undefined;
    }
}

const fetchJson = async (link) => {
    const result = { status: false, data: "", message: "" }
    return await axios({
        "method": "GET",
        "headers": {
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
            "origin": link,
            "referer": link
        }, 
        "responseType": "json"
    }).then((response) => {
         if (response.status == 200) {
             result.status = true
             result.data = response.data
         } else {
             result.message = "Server Maitance..."
         }
         return result
    }).catch(() => {
        result.message = "Server Maitance..."
        return result
    })
}
    
const fetchBuffer = async (string) => {
    const result = { status: false, buffer: null, message: "" }
    if (isUrl(string)) {
        return await axios({
            "method": "GET",
            "url": string, 
            "headers": {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
                "Referer": string
            }, 
            "responseType": "arraybuffer"
        }).then((response) => {
             if (response.status == 200) {
                result.status = true
                result.buffer = response.data
             } else {
                result.message = "Server Maitance..."
             }
             return result
        }).catch(() => {
             result.message = "Server Maitance..."
             return result
        })
    } else if (Buffer.isBuffer(string)) {
        result.status = true
        result.buffer = string
        return result
    } else if (isBase64(string)) {
        result.status = true
        result.buffer = Buffer.from(string, "base64")
        return result
    } else if (isFiles(string)) {
        result.status = true
        result.buffer = fs.readFileSync(string)
        return result
    } else {
        result.message = "Buffer not accept"
        return result
    }
}

const fetchBase64 = (string) => {
    const result = { status: false, base64: null, message: "" }
    if (Buffer.isBuffer(string)) {
        const buffer = new Buffer(buffer)
        result.status = true
        result.base64 = buffer.toString("base64")
        return result
    } else if (isBase64(string)) {
        result.status = true
        result.base64 = string
        return result
    } else if (isFiles(string)) {
        result.status = true
        result.base64 = fs.readFileSync(string).toString("base64")
        return result
    } else {
        result.message = "Base64 not accept"
        return result
    }
}

const formatSize = (bytes) => {
    if (bytes >= 1000000000) {
        bytes = (bytes / 1000000000).toFixed(2) + " GB"
    } else if (bytes >= 1000000) {
        bytes = (bytes / 1000000).toFixed(2) + " MB"
    } else if (bytes >= 1000) {
        bytes = (bytes / 1000).toFixed(2) + " KB"
    } else if (bytes > 0) {
        bytes = bytes + " bytes"
    } else {
        bytes = "0 bytes"
    }
}

const runtime = (time) => {
    time = Number(time)
    const years = Math.floor(time / (3600 * 8640))
    const months = Math.floor((time % (3600 * 8640)) / 2592000)
    const weeks = Math.floor((time % (3600 * 720)) / 604800)
    const days = Math.floor((time % (3600 * 168)) / 86400)
    const hours = Math.floor((time % (3600 * 24)) / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = Math.floor(time % 60)
    const isYears = years > 0? `${years} years, ` : ""
    const isMonths = months > 0? `${months} months, ` : ""
    const isWeeks = weeks > 0? `${weeks} weeks, ` : ""
    const isDays = days > 0? `${days} days, ` : ""
    const isHours = hours > 0? `${hours} hours, ` : ""
    const isMinutes = minutes > 0? `${minutes} minutes, ` : ""
    const isSeconds = seconds > 0? `${seconds} seconds` : ""
    return isYears + isMonths + isWeeks + isDays + isHours + isMinutes + isSeconds
}

const timeToEpired = (time) => {
    time = Number(time) - Date.now()
    const years = Math.floor(Number(parseMs(time).days) / 360)
    const months = Math.floor((Number(parseMs(time).days) % 360) / 30)
    const weeks = Math.floor((Number(parseMs(time).days) % 30) / 7)
    const days = Math.floor((Number(parseMs(time).days) % 7) / 1)
    const hours = Number(parseMs(time).hours)
    const minutes = Number(parseMs(time).minutes)
    const seconds = Number(parseMs(time).seconds)
    const isYears = years > 0? `${years} years, ` : ""
    const isMonths = months > 0? `${months} months, ` : ""
    const isWeeks = weeks > 0? `${weeks} weeks, ` : ""
    const isDays = days > 0? `${days} days, ` : ""
    const isHours = hours > 0? `${hours} hours, ` : ""
    const isMinutes = minutes > 0? `${minutes} minutes, ` : ""
    const isSeconds = seconds > 0? `${seconds} seconds` : ""
    return isYears + isMonths + isWeeks + isDays + isHours + isMinutes + isSeconds
}

export { randomCode, timeToEpired, runtime, formatSize, fetchBase64, fetchBuffer, fetchJson, isBase64, time, week, calender, getRandom, require, resizeImage, checkNSFW, isFiles, toFirstCase, isUrl, pickRandom, randomNomor, sleep }