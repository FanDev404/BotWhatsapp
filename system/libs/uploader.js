const { default: axios, AxiosRequestConfig, AxiosResponse } = require("axios")
const { basename } = require("path")
const FormData = require("form-data")
const fs = require("fs")
const qs = require("querystring")


const InstagramDL = async (link) => {
    const result = { status: false, data: "", message: "" }
    return await axios({
        "method": "POST",
        "url": "https://downloadgram.org/#downloadhere",
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        }, 
        "data": {
            "url": link,
            "submit": ""
        }
    }).then((response) => {
        result.status = true
        result.data = response
        return result
    }).catch(() => {
        result.message = "Repository not found"
        return result
    })
}

/*
exports.igdl = async (link) => {
    return new Promise((resolve, reject) => {
        const options = {
            method: 'POST',
            url: "https://downloadgram.org/#downloadhere",
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            formData: {
                url: link,
                submit: ''
            }
        };
        request(options, async function(error, response, body) {
            if (error) throw new Error(error);
            const $ = cheerio.load(body)
            const result = [];
            $('#downloadBox > a').each(function(a, b) {
                result.push($(b).attr('href'))
            })
            let jos = {
                status: 200,
                creator: author,
                result: {
                    result
                }
            }
            resolve(jos);
        });
    })
}
*/

const uploadFileApi = async (paths) => {
    const result = { status: false, data: "", message: "" }
    const { githubName, githubRepo, githubTokenClassic } = require("@config")
    return await axios({
        "method": "GET",
        "url": "https://api.github.com/repos/" + githubName + "/" + githubRepo + "/contents",
        "headers": {
            "Authorization": "Bearer " + githubTokenClassic,
            "Content-Type": "application/json"
        }
    }).then(async (response) => {
        if (response.status == 200) {
            const fileId = response.data.filter((x) => (x.type == "file" && basename(paths) == x.name)).length + 1
            const fileName = fileId == 1? basename(paths) : basename(paths).split(".").length == 1? fileId : basename(paths).split(".").length == 2? (fileId + "." + basename(paths).split(".")[1]) : basename(paths).split(".").length == 3? (fileId + "." + basename(paths).split(".")[2]) : basename(paths).split(".").length == 4? (fileId + "." + basename(paths).split(".")[3]) : fileId
            await axios({
                "method": "PUT",
                "url": "https://api.github.com/repos/" + githubName + "/" + githubRepo + "/contents/" + basename(paths),
                "headers": {
                    "Authorization": "Bearer " + githubTokenClassic,
                    "Content-Type": "application/json"
                },
                "data": {
                    "message": "File upload!",
                    "content": fs.readFileSync(paths).toString("base64")
                }
            }).then(({ status, data }) => {
                if (status == 200 || status == 201) {
                    result.status = true
                    result.data = data.content.download_url
                } else {
                    result.message = "Terjadi kesalahan saat upload!!"
                }
                return result
            }).catch(() => {
                result.message = "Terjadi kesalahan saat upload!!"
                return result
            })
        } else {
            result.message = "Repository not found"
        } 
        return result
    }).catch(() => {
        result.message = "Repository not found"
        return result
    })
}
            
            
    

    
    
   
const imageToWm = async (name1 = "", name2 = "", url) => {
    const result = { status: false, base64: "", message: "" }
    if (name1 !== "" && name2 !== "") {
        var teks = encodeURI(name1) + "/" + encodeURI(name2)
    } else if (name1 !== "" && name2 == "") {
        var teks = encodeURI(name1)
    } else if (name1 == "" && name2 !== "") {
        var teks = encodeURI(name2)
    }
    return await axios({ 
        method: "GET", 
        url: "https://api.memegen.link/images/custom/" + teks + ".png?background=" + url, 
        headers: { 
            "DNT": 1, 
            "Upgrade-Insecure-Request": 1 
        }, 
        responseType: "arraybuffer" 
    }).then((response) => {
        if (response.status == 200) {
             result.status = true
             result.base64 = response.data
         } else {
             result.message = "Server sedang error"
         }
         return result
    }).catch(() => {
        result.message = "Server sedang error"
        return result
    })
}


const ChatGPTRequest = async (text) => {
    const result = { status: false, data: "Aku gak tau", message: "" }
    const { openAiKey } = require("@config")
    return await axios({ 
        method: "POST", 
        url: "https://api.openai.com/v1/completions", 
        data: { 
            model: "text-davinci-003", 
            prompt: text, 
            max_tokens: 1000, 
            temperature: 0 
        },
        headers: { 
            "accept": "application/json", 
            "Content-Type": "application/json", 
            "Accept-Language": "in-ID",
            "Authorization": "Bearer " + openAiKey
        }
    }).then((response) => {
        if (response.status == 200) {
            const { choices } = response.data
            if (choices && choices.length) {
                result.status = true
                result.data = choices[0].text
            }
        } else {
            result.message = "Server sedang error"
        }
        return result
    }).catch((error) => {
        if (error.message.includes("401")) {
            result.message = "Key masih kosong"
        } else if (error.message.includes("429")) {
            result.message = "Not access key"
        } else {
            result.message = "Error : " + error.message
        }
        return result
    })
}






/*
const convertAudioToText = async (paths) => {
     const result = { status: false, data: null, message: "" }
     const form = new FormData
     form.append("providers", "microsoft,amazon")
     form.append("file", fs.createReadStream(paths))
     form.append("language", "en")
     return await axios({ 
         method: "POST", 
         url: "https://api.edenai.run/v2/audio/speech_to_text_async", 
         data: form, 
         headers: { 
            "Authorization": "Bearer " + config.audioToTextKey,
            "Content-Type": "multipart/form-data; boundary=" + form.getBoundary() 
         }
     }).then((response) => {
         if (response.status == 200) {
             result.status = true
             result.base64 = response.data
         } else {
             result.message = "Server sedang error"
         }
         return result
     }).catch((error) => {
         if (error.message.includes("401")) {
             result.message = "Key masih kosong"
         } else if (error.message.includes("403")) {
             result.message = "Not access key"
         } else {
             result.message = "Error : " + error.message
         }
         return result
     })
}
*/


const editBackground = async (paths, bg_color) => {
     const result = { status: false, base64: null, data: "", message: "" }
     const base64 = fs.readFileSync(paths).toString("base64")
     const { removebgKey } = require("@config")
     return await axios({ 
         "method": "POST", 
         "url": "https://api.remove.bg/v1.0/removebg", 
         "data": {
             "image_file_b64": base64,
             "bg_color": bg_color
         },
         "headers": { 
             "accept": "application/json",
             "Content-Type": "application/json",
             "X-Api-Key": removebgKey
         }
     }).then(({ status, data }) => {
         if (status == 200) {
             result.status = true
             result.base64 = data.data.result_b64
             result.data = new Buffer.from(data.data.result_b64, "base64")
         } else {
             result.message = "Server sedang error"
         }
         return result
     }).catch((error) => {
         if (error.message.includes("401")) {
             result.message = "Key masih kosong"
         } else if (error.message.includes("403")) {
             result.message = "Not access key"
         } else {
             result.message = "Error : " + error.message
         }
         return result
     })
}


const removebg = async (buffer) => {
     const result = { status: false, base64: null, message: "" }
     const { removebgKey } = require("@config")
     const form = new FormData
     form.append("size", "auto")
     form.append("image_file", fs.createReadStream(buffer), "ntah.webp")
     return await axios({ 
         method: "POST", 
         url: "https://api.remove.bg/v1.0/removebg", 
         data: form, 
         responseType: "arraybuffer",
         headers: { 
             "X-Api-Key": removebgKey, 
             ...form.getHeaders() 
         }
     }).then((response) => {
         if (response.status == 200) {
             result.status = true
             result.base64 = response.data
         } else {
             result.message = "Server sedang error"
         }
         return result
     }).catch((error) => {
         if (error.message.includes("401")) {
             result.message = "Key masih kosong"
         } else if (error.message.includes("403")) {
             result.message = "Not access key"
         } else {
             result.message = "Error : " + error.message
         }
         return result
     })
}


const chatSimiRequest = async (text) => {
    const result = { status: false, data: "Aku gak tau", message: "" }
    return await axios.get(`https://api.simsimi.net/v2/?text=${encodeURI(text)}&lc=id`).then((response) => {
        if (response.status == 200) {
            result.status = true
            result.data = response.data.success
        } else {
            result.message = "Server sedang error"
        }
        return result
    }).catch(() => {
        result.message = "Server sedang error"
        return result
    })
}


const post = async (url, formdata, options) => {
    const result = { status: false, data: "", message: "Terjadi kesalahan, server sedang bermasalah" }
    if (!(formdata instanceof FormData)) {
        return axios.post(url, qs.stringify(formdata), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            ...options,
        }).then((response) => {
            if (response.status == 200) {
                result.status = true
                result.data = response.data
            } else {
                result.message = "Server sedang error"
            }
            return result
        }).catch(() => {
            result.message = "Server sedang error"
            return result
        })
    } else {
        return axios.post(url, formdata, {
            headers: formdata.getHeaders(),
            ...options,
        }).then((response) => {
            if (response.status == 200) {
                result.status = true
                result.data = response.data
            } else {
                result.message = "Server sedang error"
            }
            return result
        }).catch(() => {
            result.message = "Server sedang error"
            return result
        })
    }
}

        
const githubAccount = async (accountName) => {
    const result = { status: false, data: "", message: "" }
    return await axios.get("https://api.github.com/users/"+ accountName).then((response) => {
        if (response.status == 200 && Object.keys(response.data).length > 2) {
            result.status = true
            result.data = response.data
        } else {
            result.message = "Account not found"
        }
        return result
    }).catch(() => {
        result.message = "Account not found"
        return result
    })
}


const githubRepository = async (accountName, repositoryName) => {
    const result = { status: false, data: "", message: "" }
    return await axios.get("https://api.github.com/users/"+ accountName).then(async (response) => {
        if (response.status == 200 && Object.keys(response.data).length > 2) {
            return await axios.get("https://api.github.com/repos/"+ accountName + "/"  + repositoryName).then((res) => {
                if (res.status == 200 && Object.keys(res.data).length > 2) {
                    result.status = true
                    result.data = res.data
                } else {
                    result.message = "Repository not found"
                }
                return result
            }).catch(() => {
                result.message = "Repository not found"
                return result
            })
        } else {
            result.message = "Account not found"
        }
        return result
    }).catch(() => {
        result.message = "Account not found"
        return result
    })
}


const anime1Request = async (request) => {
    const result = { status: false, data: "", message: "" }
    return await axios.get("https://waifu.pics/api/sfw/" + request).then((response) => {
        if (response.status == 200) {
            result.status = true
            result.data = response.data
        } else {
            result.message = "Server sedang error"
        }
        return result
    }).catch(() => {
        result.message = "Server sedang error"
        return result
    })
}


const anime2Request = async (request) => {
    const result = { status: false, data: "", message: "" }
    return await axios.get("https://anime-api.hisoka17.repl.co/img/" + request).then((response) => {
        if (response.status == 200) {
            result.status = true
            result.data = response.data
        } else {
            result.message = "Server sedang error"
        }
        return result
    }).catch(() => {
        result.message = "Server sedang error"
        return result
    })
}


const anime3Request = async (request) => {
    const result = { status: false, data: "", message: "" }
    return await axios.get("https://waifu.pics/api/nsfw/" + request).then((response) => {
        if (response.status == 200) {
            result.status = true
            result.data = response.data
        } else {
            result.message = "Server sedang error"
        }
        return result
    }).catch(() => {
        result.message = "Server sedang error"
        return result
    })
}


const anime4Request = async (request) => {
    const result = { status: false, data: "", message: "" }
    return await axios.get("https://anime-api.hisoka17.repl.co/img/nsfw/" + request).then((response) => {
        if (response.status == 200) {
            result.status = true
            result.data = response.data
        } else {
            result.message = "Server sedang error"
        }
        return result
    }).catch(() => {
        result.message = "Server sedang error"
        return result
    })
}




const TelegraPh = async (buffer) => {
    const result = { status: false, data: "", message: "" }
    const form = new FormData();
    form.append("file", fs.createReadStream(buffer))
    return await axios({ 
        method: "POST",
        url: "https://telegra.ph/upload", 
        headers: { ...form.getHeaders() },
        data: form
    }).then((response) => {
        if (response.status == 200) {
            result.status = true
            result.data = "https://telegra.ph" + response.data[0].src
        } else {
            result.message = "Server sedang error"
        }
        return result
    }).catch(() => {
        result.message = "Server sedang error"
        return result
    })
}




const UploadFileUgu = async (buffer) => {
    const result = { status: false, data: "", message: "" }
    const form = new FormData();
    form.append("files[]", fs.createReadStream(buffer))
    return await axios({ 
        method: "POST",
        url: "https://uguu.se/upload.php", 
        headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36", ...form.getHeaders() },
        data: form
    }).then((response) => {
        if (response.status == 200) {
            result.status = true
            result.data = response.data.files[0]
        } else {
            result.message = "Server sedang error"
        }
        return result
    }).catch(() => {
        result.message = "Server sedang error"
        return result
    })
}


const quickChatToBuffer = async (name, text, profile) => {
    const result = { status: false, data: "", message: "" }
    return await axios.post("https://bot.lyo.su/quote/generate", { 
        "type": "quote", 
        "format": "png", 
        "backgroundColor": "#FFFFFF", 
        "width": 512, 
        "height": 768, 
        "scale": 2, 
        "messages": [{ 
            "entities": [], 
            "avatar": true, 
            "from": { 
                "id": 1, 
                "name": name, 
                "photo": { 
                    "url": profile 
                }
            }, 
            "text": text, 
            "replyMessage": {} 
        }] 
        }, { 
            headers: { "Content-Type": "application/json" }
            }).then((response) => {
                if (response.status == 200) {
                    result.status = true
                    result.data = response.data.result.image
                } else {
                    result.message = "Server sedang error"
                }
                return result
            }).catch(() => {
                result.message = "Server sedang error"
                return result
            })
}


const tiktokDl = async (link) => {
    const result = { status: false, data: "", message: "" }
    return await axios.get("https://api.tiklydown.me/api/download?url=" + link).then((response) => {
        if (response.status == 200) {
            result.status = true
            result.data = response.data
        } else {
            result.message = "Server sedang error"
        }
        return result
    }).catch(() => {
        result.message = "Server sedang error"
        return result
    })
}







module.exports = { editBackground, uploadFileApi, imageToWm, tiktokDl, quickChatToBuffer, githubAccount, githubRepository, anime4Request, anime3Request, anime2Request, anime1Request, post, chatSimiRequest, removebg, ChatGPTRequest, TelegraPh, UploadFileUgu }
