const fs = require("fs")
const chalk = require("chalk") 
const axios = require("axios") 
const cheerio = require("cheerio") 
const instagramdl = require("i-downloader")
const Spotify = require("spotifydl-core").default
const spotify = new Spotify({ clientId: "7579589d9a0a42a9bcc7de03798f2884", clientSecret: "cdae1edb68f84bfb8b9b2390062a5e70" })
const { stringify } = require("querystring")
const { youtubedl } = require("@bochilteam/scraper") 




const spotifyDownload = async (link) => {
    const result = { status: false, buffer: "", message: "" }
    return await spotify.downloadTrack(link).then((buffer) => {
        result.status = true
        result.buffer = buffer
        return result
    }).catch(() => {
        result.message = "Server sedang error"
        return result
    })
}


const tiktokDL = async (link) => {
    const result = { status: false, data: "", message: "" }
    const getKey = (page) => {
        const regex = /key=([0-9a-f-]+)/;
        const key = page.text().match(regex);
        return key? key[1] : null;
    }
    return await axios.get("https://ttsave.app").then(async (response) => {
         if (response.status == 200) {
             const $ = cheerio.load(response.data)
             return await axios({ 
                 "method": "POST", 
                 "url": "https://ttsave.app/download?mode=video&key=" + getKey($('script[type="text/javascript"]')), 
                 "data": {
                     "id": link
                 },
                 "headers": { 
                     "User-Agent": "PostmanRuntime/7.31.1"
                 }
             }).then(async ({ status, data }) => {
                 if (status == 200) {
                     const $$ = cheerio.load(data)
                     result.status = true
                     result.data = {
                         author: {
                             name: $$('div div h2').text(),
                             profile: $$('div a').attr('href'),
                             username: $$('div a.font-extrabold.text-blue-400.text-xl.mb-2').text()
                         },
                         video: {
                             thumbnail: $$('a[type="cover"]').attr('href'),
                             views: $$('div.flex.flex-row.items-center.justify-center.gap-2.mt-2 div:nth-child(1) span').text(),
                             loves: $$('div.flex.flex-row.items-center.justify-center.gap-2.mt-2 div:nth-child(2) span').text(),
                             comments: $$('div.flex.flex-row.items-center.justify-center.gap-2.mt-2 div:nth-child(3) span').text(),
                             shares: $$('div.flex.flex-row.items-center.justify-center.gap-2.mt-2 div:nth-child(4) span').text(),
                             url: {
                                 no_wm: $$("a:contains('DOWNLOAD (WITHOUT WATERMARK)')").attr("href"),
                                 wm: $$("a:contains('DOWNLOAD (WITH WATERMARK)')").attr("href"),
                             }
                         },
                         backsound: {
                             name: $$('div.flex.flex-row.items-center.justify-center.gap-1.mt-5 span').text(),
                             url: $$("a:contains('DOWNLOAD AUDIO (MP3)')").attr("href")
                         }
                     }
                 } else {
                     result.message = "Server sedang error 4"
                 }
                 return result
             }).catch(() => {
                 result.message = "Server sedang error 3"
                 return result
             })
         } else {
             result.message = "Server sedang error 2"
         }
         return result
    }).catch(() => {
        result.message = "Server sedang error 1"
        return result
    })
}


const instagramDL = async (url) => {
    const result = { status: false, data: "", message: "" }
    return await instagramdl(url).then(async ({ status, data }) => {
        if (status) {
            const localData = []
            for(let x of data) {
                await axios.get(x.url).then((response) => {
                    if (response.status == 200) {
                        localData.push({ "thumbnail": x.thumbnail, "type": response.headers["content-type"], "url": x.url }) 
                    } else {
                        localData.push({ "thumbnail": x.thumbnail, "type": "", "url": x.url })
                    }
                }).catch(() => {
                    localData.push({ "thumbnail": x.thumbnail, "type": "", "url": x.url })
                }) 
            }
            result.status = true
            result.data = localData
        } else {
            result.message = "Server sedang maitance..."
        }
        return result
    }).catch(() => {
        result.message = "Server sedang maitance..."
        return result
    }) 
}

const youtubeDL = async (url, type, quality = "") => {
    const result = { status: false, data: "", message: "" }
    return await youtubedl(url).then(async (response) => {
        if (type == "mp4" && quality == "144p" && Object.keys(response.video).includes("144p") || type == "mp4" && Object.keys(response.video).includes("144p") && quality == "") {
            result.status = true
            result.data = {
                title: response.title, 
                thumbnail: response.thumbnail, 
                size: response.video["144p"].fileSizeH,
                quality: response.video["144p"].quality, 
                link: await response.video["144p"].download()
            }
        } else if (type == "mp4" && quality == "240p" && Object.keys(response.video).includes("240p") || type == "mp4" && Object.keys(response.video).includes("240p") && quality == "") {
            result.status = true
            result.data = {
                title: response.title, 
                thumbnail: response.thumbnail, 
                size: response.video["240p"].fileSizeH,
                quality: response.video["240p"].quality, 
                link: await response.video["240p"].download()
            }
        } else if (type == "mp4" && quality == "360p" && Object.keys(response.video).includes("360p") || type == "mp4" && Object.keys(response.video).includes("360p") && quality == "") {
            result.status = true
            result.data = {
                title: response.title, 
                thumbnail: response.thumbnail, 
                size: response.video["360p"].fileSizeH,
                quality: response.video["360p"].quality, 
                link: await response.video["360p"].download()
            }
        } else if (type == "mp4" && quality == "480p" && Object.keys(response.video).includes("480p") || type == "mp4" && Object.keys(response.video).includes("480p") && quality == "") {
            result.status = true
            result.data = {
                title: response.title, 
                thumbnail: response.thumbnail, 
                size: response.video["480p"].fileSizeH,
                quality: response.video["480p"].quality, 
                link: await response.video["480p"].download()
            }
        } else if (type == "mp4" && quality == "720p" && Object.keys(response.video).includes("720p") || type == "mp4" && Object.keys(response.video).includes("720p") && quality == "") {
            result.status = true
            result.data = {
                title: response.title, 
                thumbnail: response.thumbnail, 
                size: response.video["720p"].fileSizeH,
                quality: response.video["720p"].quality, 
                link: await response.video["720p"].download()
            }
        } else if (type == "mp4" && quality == "1080p" && Object.keys(response.video).includes("1080p") || type == "mp4" && Object.keys(response.video).includes("1080p") && quality == "") {
            result.status = true
            result.data = {
                title: response.title, 
                thumbnail: response.thumbnail, 
                size: response.video["1080p"].fileSizeH,
                quality: response.video["1080p"].quality, 
                link: await response.video["1080p"].download()
            }
        } else if (type == "mp4" && quality == "auto" && Object.keys(response.video).includes("auto") || type == "mp4" && Object.keys(response.video).includes("auto")) {
            result.status = true
            result.data = {
                title: response.title, 
                thumbnail: response.thumbnail, 
                size: response.video["auto"].fileSizeH,
                quality: response.video["auto"].quality, 
                link: await response.video["auto"].download()
            }
        } else if (type == "mp3") {
            const localQuality = Object.keys(response.audio)[0]
            result.status = true
            result.data = {
                title: response.title, 
                thumbnail: response.thumbnail, 
                size: response.audio[localQuality].fileSizeH,
                quality: response.audio[localQuality].quality, 
                link: await response.audio[localQuality].download()
            }
        }
        return result
    }).catch(() => {
        result.message = "Server sedang maitance..."
        return result
    }) 
}


module.exports = { tiktokDL, youtubeDL, instagramDL, spotifyDownload }


let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
    console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ UPDATE ]"), `${__filename}`)
	delete require.cache[file]
	require(file)
})