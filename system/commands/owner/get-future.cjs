const fs = require("fs") 
const util = require("util") 
module.exports = {
    commands: ["getfuture"],
    minArgs: 1,
    expectedArgs: "<command>",
    example: "{prefix}{command} menu",
    tags: "owner menu", 
    isSewa: true,
    isCreator: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed, isQuotedDocument }) => {
        try {
            if (!Object.keys(db.allcommand).includes(m.text)) return m.reply("Commands not found!")
            if (db.allcommand[m.text].type !== "case") {
                let teks = "{\n"
                let cmdOptions = (commands.get(m.text) || {}) 
                if (Array.isArray(cmdOptions.commands)) {
                    teks += "  commands: " + util.format(cmdOptions.commands) + ",\n"
                }
                if (!isNaN(cmdOptions.minArgs)) {
                    teks += "  minArgs: " + cmdOptions.minArgs + ",\n"
                }
                if (!isNaN(cmdOptions.minArgs) && cmdOptions.expectedArgs) {
                    teks += "  expectedArgs: " + `"${cmdOptions.expectedArgs}"` + ",\n"
                }
                if (cmdOptions.example) {
                    teks += "  example: " + `"${cmdOptions.example}"` + ",\n"
                }
                if (cmdOptions.tags) {
                    teks += "  tags: " + `"${cmdOptions.tags}"` + ",\n"
                }
                if (cmdOptions.isSewa) {
                    teks += "  isSewa: true,\n"
                }
                if (cmdOptions.isCreator) {
                    teks += "  isCreator: true,\n"
                }
                if (cmdOptions.isOwner) {
                    teks += "  isOwner: true,\n"
                }
                if (cmdOptions.isPremium) {
                    teks += "  isPremium: true,\n"
                }
                if (cmdOptions.isPrivate) {
                    teks += "  isPrivate: true,\n"
                }
                if (cmdOptions.isGroup) {
                    teks += "  isGroup: true,\n"
                }
                if (cmdOptions.isAdmin) {
                    teks += "  isAdmin: true,\n"
                }
                if (cmdOptions.isBotAdmin) {
                    teks += "  isBotAdmin: true,\n"
                }
                if (cmdOptions?.isMedia?.isImage && cmdOptions?.isMedia?.isDocument && cmdOptions?.isMedia?.isVideo && cmdOptions?.isMedia?.isQuotedMedia?.isQuotedImage && cmdOptions?.isMedia?.isQuotedMedia?.isQuotedVideo && cmdOptions?.isMedia?.isQuotedMedia.isQuotedSticker && cmdOptions?.isMedia?.isQuotedMedia.isQuotedAudio && cmdOptions?.isMedia?.isQuotedMedia.isQuotedDocument) {
                    teks += "  isMedia: {\n"
                    teks += "    isImage: true,\n"
                    teks += "    isVideo: true,\n"
                    teks += "    isDocument: true,\n"
                    teks += "    isQuotedMedia: {\n"
                    teks += "      isQuotedImage: true,\n"
                    teks += "      isQuotedVideo: true,\n"
                    teks += "      isQuotedAudio: true,\n"
                    teks += "      isQuotedSticker: true,\n"
                    teks += "      isQuotedDocument: true\n"
                    teks += "    }\n"
                    teks += "  },\n"
                } else if (cmdOptions?.isMedia?.isImage && cmdOptions?.isMedia?.isVideo && cmdOptions?.isMedia?.isQuotedMedia.isQuotedImage && cmdOptions?.isMedia?.isQuotedMedia.isQuotedVideo && cmdOptions?.isMedia?.isQuotedMedia.isQuotedSticker) {
                    teks += "  isMedia: {\n"
                    teks += "    isImage: true,\n"
                    teks += "    isVideo: true,\n"
                    teks += "    isQuotedMedia: {\n"
                    teks += "      isQuotedImage: true,\n"
                    teks += "      isQuotedVideo: true,\n"
                    teks += "      isQuotedSticker: true\n"
                    teks += "    }\n"
                    teks += "  },\n"
                } else if (cmdOptions?.isMedia?.isImage && cmdOptions?.isMedia?.isDocument && cmdOptions?.isMedia?.isQuotedMedia.isQuotedImage && cmdOptions?.isMedia?.isQuotedMedia.isQuotedDocument) {
                    teks += "  isMedia: {\n"
                    teks += "    isImage: true,\n"
                    teks += "    isDocument: true,\n"
                    teks += "    isQuotedMedia: {\n"
                    teks += "      isQuotedImage: true,\n"
                    teks += "      isQuotedDocument: true\n"
                    teks += "    }\n"
                    teks += "  },\n"
                } else if (cmdOptions?.isMedia?.isVideo && cmdOptions?.isMedia?.isQuotedMedia.isQuotedVideo && cmdOptions?.isMedia?.isQuotedMedia.isQuotedAudio) {
                    teks += "  isMedia: {\n"
                    teks += "    isVideo: true,\n"
                    teks += "    isQuotedMedia: {\n"
                    teks += "      isQuotedVideo: true,\n"
                    teks += "      isQuotedAudio: true\n"
                    teks += "    }\n"
                    teks += "  },\n"
                } else if (cmdOptions?.isMedia?.isVideo && cmdOptions?.isMedia?.isQuotedMedia.isQuotedVideo && cmdOptions?.isMedia?.isQuotedMedia.isQuotedVoice) {
                    teks += "  isMedia: {\n"
                    teks += "    isVideo: true,\n"
                    teks += "    isQuotedMedia: {\n"
                    teks += "      isQuotedVideo: true,\n"
                    teks += "      isQuotedVoice: true\n"
                    teks += "    }\n"
                    teks += "  },\n"
                } else if (cmdOptions?.isMedia?.isImage && cmdOptions?.isMedia?.isVideo && cmdOptions?.isMedia?.isQuotedMedia.isQuotedImage && cmdOptions?.isMedia?.isQuotedMedia.isQuotedVideo) {
                    teks += "  isMedia: {\n"
                    teks += "    isImage: true,\n"
                    teks += "    isVideo: true,\n"
                    teks += "    isQuotedMedia: {\n"
                    teks += "      isQuotedImage: true,\n"
                    teks += "      isQuotedVideo: true\n"
                    teks += "    }\n"
                    teks += "  },\n"
                } else if (cmdOptions?.isMedia?.isImage && cmdOptions?.isMedia?.isQuotedMedia.isQuotedImage && cmdOptions?.isMedia?.isQuotedMedia.isQuotedSticker) {
                    teks += "  isMedia: {\n"
                    teks += "    isImage: true,\n"
                    teks += "    isQuotedMedia: {\n"
                    teks += "      isQuotedImage: true,\n"
                    teks += "      isQuotedSticker: true\n"
                    teks += "    }\n"
                    teks += "  },\n"
                } else if (cmdOptions?.isMedia?.isImage && cmdOptions?.isMedia?.isQuotedMedia.isQuotedImage) {
                    teks += "  isMedia: {\n"
                    teks += "    isImage: true,\n"
                    teks += "    isQuotedMedia: {\n"
                    teks += "      isQuotedImage: true\n"
                    teks += "    }\n"
                    teks += "  },\n"
                } else if (cmdOptions?.isMedia?.isVideo && cmdOptions?.isMedia?.isQuotedMedia.isQuotedVideo) {
                    teks += "  isMedia: {\n"
                    teks += "    isVideo: true,\n"
                    teks += "    isQuotedMedia: {\n"
                    teks += "      isQuotedVideo: true\n"
                    teks += "    }\n"
                    teks += "  },\n"
                } else if (cmdOptions?.isMedia?.isDocument && cmdOptions?.isMedia?.isQuotedMedia.isQuotedDocument) {
                    teks += "  isMedia: {\n"
                    teks += "    isDocument: true,\n"
                    teks += "    isQuotedMedia: {\n"
                    teks += "      isQuotedDocument: true\n"
                    teks += "    }\n"
                    teks += "  },\n"
                } else if (cmdOptions?.isMedia?.isViewOnce && cmdOptions?.isMedia?.isQuotedMedia.isQuotedViewOnce) {
                    teks += "  isMedia: {\n"
                    teks += "    isViewOnce: true,\n"
                    teks += "    isQuotedMedia: {\n"
                    teks += "      isQuotedViewOnce: true\n"
                    teks += "    }\n"
                    teks += "  },\n"
                } else if (cmdOptions?.isMedia?.isImage) {
                    teks += "  isMedia: {\n"
                    teks += "    isImage: true\n"
                    teks += "  },\n"
                } else if (cmdOptions?.isMedia?.isVideo) {
                    teks += "  isMedia: {\n"
                    teks += "    isVideo: true\n"
                    teks += "  },\n"
                } else if (cmdOptions?.isMedia?.isDocument) {
                    teks += "  isMedia: {\n"
                    teks += "    isDocument: true\n"
                    teks += "  },\n"
                } else if (cmdOptions?.isMedia?.isViewOnce) {
                    teks += "  isMedia: {\n"
                    teks += "    isViewOnce: true\n"
                    teks += "  },\n"
                } else if (cmdOptions?.isMedia?.isQuotedMedia.isQuotedImage) {
                    teks += "  isMedia: {\n"
                    teks += "    isQuotedMedia: {\n"
                    teks += "      isQuotedImage: true\n"
                    teks += "    }\n"
                    teks += "  },\n"
                } else if (cmdOptions?.isMedia?.isQuotedMedia.isQuotedVideo) {
                    teks += "  isMedia: {\n"
                    teks += "    isQuotedMedia: {\n"
                    teks += "      isQuotedVideo: true\n"
                    teks += "    }\n"
                    teks += "  },\n"
                } else if (cmdOptions?.isMedia?.isQuotedMedia.isQuotedAudio) {
                    teks += "  isMedia: {\n"
                    teks += "    isQuotedMedia: {\n"
                    teks += "      isQuotedAudio: true\n"
                    teks += "    }\n"
                    teks += "  },\n"
                } else if (cmdOptions?.isMedia?.isQuotedMedia.isQuotedVoice) {
                    teks += "  isMedia: {\n"
                    teks += "    isQuotedMedia: {\n"
                    teks += "      isQuotedVoice: true\n"
                    teks += "    }\n"
                    teks += "  },\n"
                } else if (cmdOptions?.isMedia?.isQuotedMedia.isQuotedSticker) {
                    teks += "  isMedia: {\n"
                    teks += "    isQuotedMedia: {\n"
                    teks += "      isQuotedSticker: true\n"
                    teks += "    }\n"
                    teks += "  },\n"
                } else if (cmdOptions?.isMedia?.isQuotedMedia.isQuotedDocument) {
                    teks += "  isMedia: {\n"
                    teks += "    isQuotedMedia: {\n"
                    teks += "      isQuotedDocument: true\n"
                    teks += "    }\n"
                    teks += "  },\n"
                } else if (cmdOptions?.isMedia?.isQuotedMedia.isQuotedViewOnce) {
                    teks += "  isMedia: {\n"
                    teks += "    isQuotedMedia: {\n"
                    teks += "      isQuotedViewOnce: true\n"
                    teks += "    }\n"
                    teks += "  },\n"
                } else if (cmdOptions?.isMedia?.isQuotedMedia.isQuotedContact) {
                    teks += "  isMedia: {\n"
                    teks += "    isQuotedMedia: {\n"
                    teks += "      isQuotedContact: true\n"
                    teks += "    }\n"
                    teks += "  },\n"
                }
                if (cmdOptions.isLimit) {
                    teks += "  isLimit: true,\n"
                }
                if (cmdOptions.isWait) {
                    teks += "  isWait: true,\n"
                }
                if (cmdOptions.callback) {
                    teks += `  callback: ${cmdOptions.callback+""}\n`
                }
                teks += "}"
                m.reply(teks)
            } else if (db.allcommand[m.text].type == "case") {
                m.reply("case " + `"${m.text}"` + fs.readFileSync("./system/message/msg.cjs").toString().split("case \"" + m.text + "\"")[1].split("break")[0] + "break")
            }
            cmdSuccess(command, "owner menu")
        } catch (error) {
            cmdFailed(command, "owner menu", error)
        }
    }
}