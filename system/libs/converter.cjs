const fs = require("fs") 
const axios = require("axios") 
const FormData = require("form-data")
const { basename } = require("path")



const imageToUrl = async (paths) => {
    const result = { status: false, data: "", message: "" }
    const form = new FormData();
    form.append("file", fs.createReadStream(paths))
    return await axios({ 
        "method": "POST",
        "url": "https://telegra.ph/upload", 
        "headers": { 
            ...form.getHeaders() 
        },
        "data": form
    }).then(({ status, data }) => {
        if (status == 200) {
            result.status = true
            result.data = "https://telegra.ph" + data[0].src
        } else {
            result.message = "Server sedang maitance..."
        }
        return result
    }).catch(() => {
        result.message = "Server sedang maitance..."
        return result
    })
}


const uploadFileApi = async (paths) => {
    const result = { status: false, data: "", message: "" }
    const { name, repository, token } = db.settings.local_github
    return await axios({
        "method": "GET",
        "url": "https://api.github.com/repos/" + name + "/" + repository + "/contents",
        "headers": {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        }
    }).then(async (response) => {
        if (response.status == 200) {
            const fileId = response.data.filter((x) => (x.type == "file" && basename(paths) == x.name)).length + 1
            const fileName = fileId == 1? basename(paths) : basename(paths).split(".").length == 1? fileId : basename(paths).split(".").length == 2? (fileId + "." + basename(paths).split(".")[1]) : basename(paths).split(".").length == 3? (fileId + "." + basename(paths).split(".")[2]) : basename(paths).split(".").length == 4? (fileId + "." + basename(paths).split(".")[3]) : fileId
            await axios({
                "method": "PUT",
                "url": "https://api.github.com/repos/" + name + "/" + repository + "/contents/" + basename(paths),
                "headers": {
                    "Authorization": "Bearer " + token,
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
            result.message = "Server sedang maitance..."
        } 
        return result
    }).catch(() => {
        result.message = "Server sedang maitance..."
        return result
    })
}


const editBackground = async (base64, bg_color = "") => {
     const result = { status: false, base64: null, buffer: null, message: "" }
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
             "X-Api-Key": db.settings.local_key.remove_background
         }
     }).then(({ status, data }) => {
         if (status == 200) {
             result.status = true
             result.base64 = data.data.result_b64
             result.buffer = new Buffer.from(data.data.result_b64, "base64")
         } else {
             result.message = "Server sedang error"
         }
         return result
     }).catch((error) => {
         if (error.message.includes("401")) {
             result.message = "key kosong ka minta sama owner buat isi"
         } else if (error.message.includes("403")) {
             result.message = "Not access key"
         } else {
             result.message = "Error : " + error.message
         }
         return result
     })
}




module.exports = { editBackground, imageToUrl, uploadFileApi } 