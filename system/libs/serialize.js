import fs from "fs"
import { Client as _Client } from "mywajs"
import { calender, fetchBuffer, getRandom, isUrl, resizeImage } from "./function.js"
import { extension } from "mime-types"
import { join } from "path"
import mywa from "mywajs"
import Util from "mywajs/src/util/Util.js"
const { Message } = mywa





class Client extends _Client {
    constructor(...args) {
        super(...args)
    }


    /**
     * Send a message to a specific chatId
     * @param {string} chatId
     * @param {string|MessageMedia|Location|Contact|Array<Contact>|Buttons|List} content
     * @param {MessageSendOptions} [options] - Options used when sending the message
     * 
     * @returns {Promise<Message>} Message that was just sent
     */


    async sendMessageV2(chatId, content = {}, options = {}) {
        if (Object.keys(content).includes("text")) {
            const media = content?.text? content.text : content
            const mentions = Array.isArray(content.mentions)? content.mentions.map((x) => x?.id? x.id?._serialized : x) : Array.isArray(options.mentions)? options.mentions.map((x) => x?.id? x.id?._serialized : x) : []
            const quoted = options?.quoted? options.quoted.key : options.quoted
            const contextInfo = content?.contextInfo? content.contextInfo : options?.contextInfo? options.contextInfo : options.contextInfo
            return this.sendMessage(chatId, media, { mentions, quoted, extra: contextInfo })
        } else if (Object.keys(content).includes("image")) {
            const media = content?.image? content.image : content
            const mentions = Array.isArray(content.mentions)? content.mentions.map((x) => x?.id? x.id?._serialized : x) : Array.isArray(options.mentions)? options.mentions.map((x) => x?.id? x.id?._serialized : x) : []
            const quoted = options?.quoted? options.quoted.key : options.quoted
            const contextInfo = content?.contextInfo? content.contextInfo : options?.contextInfo? options.contextInfo : options.contextInfo
            const caption = content?.caption? content.caption : options?.caption? options.caption : options.caption
            const mimetype = content?.mimetype? content.mimetype : options?.mimetype? options.mimetype : options.mimetype
            const isViewOnce = content?.isViewOnce? content.isViewOnce : options?.isViewOnce? options.isViewOnce : false
            return this.sendMessage(chatId, media, { mentions, caption, mimetype, quoted, isViewOnce, extra: contextInfo })
        } else if (Object.keys(content).includes("video")) {
            const media = content?.video? content.video : content
            const mentions = Array.isArray(content.mentions)? content.mentions.map((x) => x?.id? x.id?._serialized : x) : Array.isArray(options.mentions)? options.mentions.map((x) => x?.id? x.id?._serialized : x) : []
            const quoted = options?.quoted? options.quoted.key : options.quoted
            const contextInfo = content?.contextInfo? content.contextInfo : options?.contextInfo? options.contextInfo : options.contextInfo
            const caption = content?.caption? content.caption : options?.caption? options.caption : options.caption
            const mimetype = content?.mimetype? content.mimetype : options?.mimetype? options.mimetype : options.mimetype
            const gifPlayBack = content?.gifPlayBack? content.gifPlayBack : options?.gifPlayBack? options.gifPlayBack : options.gifPlayBack
            const isViewOnce = content?.isViewOnce? content.isViewOnce : options?.isViewOnce? options.isViewOnce : false
            return this.sendMessage(chatId, media, { mentions, caption, mimetype, isViewOnce, gifPlayBack, quoted, extra: contextInfo })
        } else if (Object.keys(content).includes("document")) {
            const media = content?.document? content.document : content
            const mentions = Array.isArray(content.mentions)? content.mentions.map((x) => x?.id? x.id?._serialized : x) : Array.isArray(options.mentions)? options.mentions.map((x) => x?.id? x.id?._serialized : x) : []
            const quoted = options?.quoted? options.quoted.key : options.quoted
            const contextInfo = content?.contextInfo? content.contextInfo : options?.contextInfo? options.contextInfo : options.contextInfo
            const caption = content?.caption? content.caption : options?.caption? options.caption : options.caption
            const fileName = content?.fileName? content.fileName : options?.fileName? options.fileName : options.fileName
            const mimetype = content?.mimetype? content.mimetype : options?.mimetype? options.mimetype : options.mimetype
            return this.sendMessage(chatId, media, { mentions, caption, fileName, mimetype, asDocument: true, quoted, extra: contextInfo })
        } else if (Object.keys(content).includes("audio")) {
            const media = content?.audio? content.audio : content
            const mentions = Array.isArray(content.mentions)? content.mentions.map((x) => x?.id? x.id?._serialized : x) : Array.isArray(options.mentions)? options.mentions.map((x) => x?.id? x.id?._serialized : x) : []
            const quoted = options?.quoted? options.quoted.key : options.quoted
            const contextInfo = content?.contextInfo? content.contextInfo : options?.contextInfo? options.contextInfo : options.contextInfo
            const mimetype = content?.mimetype? content.mimetype : options?.mimetype? options.mimetype : options.mimetype
            const ptt = content?.ptt? content.ptt : options?.ptt? options.ptt : options.ptt
            return this.sendMessage(chatId, media, { mentions, mimetype, ptt, quoted, extra: contextInfo })
        } else if (Object.keys(content).includes("sticker")) {
            const media = content?.sticker? content.sticker : content
            const mentions = Array.isArray(content.mentions)? content.mentions.map((x) => x?.id? x.id?._serialized : x) : Array.isArray(options.mentions)? options.mentions.map((x) => x?.id? x.id?._serialized : x) : []
            const quoted = options?.quoted? options.quoted.key : options.quoted
            const packId = content?.packId? content.packId : options?.packId? options.packId : "https://instagram.com/cak_haho"
            const packName = content?.packName? content.packName : options?.packName? options.packName : "FanDev"
            const packPublish = content?.packPublish? content.packPublish : options?.packPublish? options.packPublish : calender()
            const packEmail = content?.packEmail? content.packEmail : options?.packEmail? options.packEmail : "fandev404@gmail.com"
            const packWebsite = content?.packWebsite? content.packWebsite : options?.packWebsite? options.packWebsite : "https://github.com/FanDev404"
            const androidApp = content?.androidApp? content.androidApp : options?.androidApp? options.androidApp : "https://play.google.com/store/apps/details?id=com.bitsmedia.android.muslimpro"
            const iOSApp = content?.iOSApp? content.iOSApp : options?.iOSApp? options.iOSApp : "https://apps.apple.com/id/app/muslim-pro-al-quran-adzan/id388389451?|=id"
            const categories = content?.categories? content.categories : options?.categories? options.categories : ["?¤£", "??", "?¤¨"]
            const isAvatar = content?.isAvatar? content.isAvatar : options?.isAvatar? options.isAvatar : 0
            return this.sendMessage(chatId, media, { packId, packName, packPublish, packEmail, packWebsite, androidApp, iOSApp, isAvatar, categories, mentions, quoted, asSticker: true })
        } else if (Object.keys(content).includes("location")) {
            const media = content?.location? content.location : content
            const mentions = Array.isArray(content.mentions)? content.mentions.map((x) => x?.id? x.id?._serialized : x) : Array.isArray(options.mentions)? options.mentions.map((x) => x?.id? x.id?._serialized : x) : []
            const quoted = options?.quoted? options.quoted.key : options.quoted
            const contextInfo = content?.contextInfo? content.contextInfo : options?.contextInfo? options.contextInfo : options.contextInfo
            return this.sendMessage(chatId, media, { mentions, quoted, extra: contextInfo })
        } else if (Object.keys(content).includes("contact")) {
            const media = content?.contact? content.contact : content
            const mentions = Array.isArray(content.mentions)? content.mentions.map((x) => x?.id? x.id?._serialized : x) : Array.isArray(options.mentions)? options.mentions.map((x) => x?.id? x.id?._serialized : x) : []
            const quoted = options?.quoted? options.quoted.key : options.quoted
            const contextInfo = content?.contextInfo? content.contextInfo : options?.contextInfo? options.contextInfo : options.contextInfo
            return this.sendMessage(chatId, media, { mentions, quoted, extra: contextInfo })
        } else if (Object.keys(content).includes("poll")) {
            const media = content?.poll?.name? content.poll.name : content
            const values = Array.isArray(content?.poll?.values)? content.poll.values : []
            const selectableCount = !isNaN(content?.poll?.selectableCount)? content.poll.selectableCount : 0
            return this.sendPoll(chatId, media, values, { selectableCount }) 
        }
    }

/**
 * 
 * @param {*} msgId 
 * @returns 
 */

    async loadMessage(message) {
        const msg = await this.mPage.evaluate(async messageId => {
            let msg = window.Store.Msg.get(messageId)
            if (msg) return window.WWebJS.getMessageModel(msg)
            const params = messageId.split("_")
            if (params.length !== 3) throw new Error("Invalid serialized message id specified")
            const [fromMe, chatId, id] = params
            const chatWid = window.Store.WidFactory.createWid(chatId)
            const fullMsgId = {
                fromMe: Boolean(fromMe),
                remote: chatWid,
                id
            }
            const msgKey = new window.Store.MsgKey(fullMsgId)
            const chat = await window.Store.Chat.find(msgKey.remote)
            const ctx = await chat.getSearchContext(msgKey)
            if (ctx.collection && ctx.collection.loadAroundPromise) {
                await ctx.collection.loadAroundPromise
            }
            msg = window.Store.Msg.get(messageId)
            if (msg) return window.WWebJS.getMessageModel(msg)
            }, message?._serialized? message._serialized : message)
        if (msg) {
            let messages = new Message(this, msg)
            return await (await serialize(this, messages))
        }
        return null
    }
    
/**
 * 
 * @param {*} message ID 
 * @returns 
 */

    async infoMessage(m) {
        if (!m) return
        const info = await this.mPage.evaluate(async (msgId) => {
            const msg = window.Store.Msg.get(msgId)
            if (!msg) return null
            return await window.Store.MessageInfo.sendQueryMsgInfo(msg.id)
            }, m.id ? m.id._serialized : m)
        return info
    }
    
    /**
     * Downloads and returns the attatched message media
     * @returns {Promise<MessageMedia>}
     */
     
    async downloadMediaMessage(msg) {
        if (!Boolean(msg.mediaKey && msg.directPath)) throw new Error("Not Media Message")
        const result = await this.mPage.evaluate(async ({ directPath, encFilehash, filehash, mediaKey, type, mediaKeyTimestamp, mimetype, filename, size,  _serialized }) => {
            try {
                const decryptedMedia = await (window.Store.DownloadManager?.downloadAndMaybeDecrypt || window.Store.DownloadManager?.downloadAndDecrypt)({
                    directPath,
                    encFilehash,
                    filehash,
                    mediaKey,
                    mediaKeyTimestamp,
                    type: (type === "chat") ? (mimetype.split("/")[0] || type) : type,
                    signal: (new AbortController).signal
                })
                const data = await window.WWebJS.arrayBufferToBase64(decryptedMedia)
                return { data, mimetype: mimetype, filename: filename, filesize: size }
            } catch (e) {
                const blob = await window.WWebJS.chat.downloadMedia(_serialized)
                return { data: await window.WWebJS.util.blobToBase64(blob), mimetype: mimetype, filename: filename, filesize: size }
            }
        }, { directPath: msg.directPath, encFilehash: msg.encFilehash, filehash: msg.filehash, mediaKey: msg.mediaKey, type: msg.type, mediaKeyTimestamp: msg.mediaKeyTimestamp, mimetype: msg.mime, filename: msg.filename, size: msg.fileSize,  _serialized: msg.key._serialized })
        if (!result) return undefined;
        return Buffer.from(result?.data, "base64")
    }
    
    
    /**
     * Downloads and returns the attatched message media
     * @returns {Promise<MessageMedia>}
     */


    async downloadMediaMessageV2(msg) {
        if (!Boolean(msg.mediaKey && msg.directPath)) throw new Error("Not Media Message")
        const result = await this.mPage.evaluate(async ({ directPath, encFilehash, filehash, mediaKey, type, mediaKeyTimestamp, mimetype, filename, size,  _serialized }) => {
            try {
                const decryptedMedia = await (window.Store.DownloadManager?.downloadAndMaybeDecrypt || window.Store.DownloadManager?.downloadAndDecrypt)({
                    directPath,
                    encFilehash,
                    filehash,
                    mediaKey,
                    mediaKeyTimestamp,
                    type: (type === "chat") ? (mimetype.split("/")[0] || type) : type,
                    signal: (new AbortController).signal
                })
                const data = await window.WWebJS.arrayBufferToBase64(decryptedMedia)
                return { data, mimetype: mimetype, filename: filename, filesize: size }
            } catch (e) {
                const blob = await window.WWebJS.chat.downloadMedia(_serialized)
                return { data: await window.WWebJS.util.blobToBase64(blob), mimetype: mimetype, filename: filename, filesize: size }
            }
        }, { directPath: msg.directPath, encFilehash: msg.encFilehash, filehash: msg.filehash, mediaKey: msg.mediaKey, type: msg.type, mediaKeyTimestamp: msg.mediaKeyTimestamp, mimetype: msg.mime, filename: msg.filename, size: msg.fileSize,  _serialized: msg.key._serialized })
        if (!result) return undefined;
        return result?.data
    }


    /**
     * 
     * @param {*} message 
     * @param {*} filename 
     * @returns 
     */
    async downloadAndSaveMediaMessage(message, filename) {
        if (!message.isMedia) return
        filename = filename ? filename : getRandom(extension(message?.mime || message._data.mimetype || message.mimetype))
        const buffer = await this.downloadMediaMessage(message)
        const filePath = join("temp", filename)
        await fs.promises.writeFile(filePath, buffer)
        return filePath
    }


/**
 * Get All Metadata Groups
 */

    async getAllGroups() {
        const chats = []
        let groups = await this.mPage.evaluate(() => {
            return window.mR.findModule("queryAllGroups")[0].queryAllGroups()
        })
        for (const group of groups) {
            const groupMetadata = await this.groupMetadata(group?.id ? group.id._serialized : group)
            chats.push({
                id: groupMetadata?.id?._serialized, 
                creation: groupMetadata?.creation, 
                owner: groupMetadata?.owner?._serialized,
                subject: groupMetadata?.subject,
                subjectTime: groupMetadata?.subjectTime,
                desc: groupMetadata?.desc,
                descId: groupMetadata?.descId,
                descTime: groupMetadata?.descTime,
                descOwner: groupMetadata?.descOwner?._serialized,
                restrict: groupMetadata?.restrict,
                announce: groupMetadata?.announce,
                noFrequentlyForwarded: groupMetadata?.noFrequentlyForwarded,
                ephemeralDuration: groupMetadata?.ephemeralDuration,
                membershipApprovalMode: groupMetadata?.membershipApprovalMode,
                memberAddMode: groupMetadata?.memberAddMode,
                growthLockExpiration: groupMetadata?.growthLockExpiration,
                growthLockType: groupMetadata?.growthLockType,
                reportToAdminMode: groupMetadata?.reportToAdminMode,
                size: groupMetadata?.size,
                numSubgroups: groupMetadata?.numSubgroups,
                support: groupMetadata?.support,
                suspended: groupMetadata?.suspended,
                terminated: groupMetadata?.terminated,
                uniqueShortNameMap: groupMetadata?.uniqueShortNameMap,
                isLidAddressingMode: groupMetadata?.isLidAddressingMode,
                isParentGroup: groupMetadata?.isParentGroup,
                isParentGroupClosed: groupMetadata?.isParentGroupClosed,
                parentGroup: groupMetadata?.parentGroup,
                defaultSubgroup: groupMetadata?.defaultSubgroup,
                generalSubgroup: groupMetadata?.generalSubgroup,
                generalChatAutoAddDisabled: groupMetadata?.generalChatAutoAddDisabled,
                allowNonAdminSubGroupCreation: groupMetadata?.allowNonAdminSubGroupCreation,
                lastActivityTimestamp: groupMetadata?.lastActivityTimestamp,
                lastSeenActivityTimestamp: groupMetadata?.lastSeenActivityTimestamp,
                lastReportToAdminTimestamp: groupMetadata?.lastReportToAdminTimestamp,
                incognito: groupMetadata?.incognito,
                participants: groupMetadata?.participants,
                pendingParticipants: groupMetadata?.pendingParticipants,
                pastParticipants: groupMetadata?.pastParticipants,
                membershipApprovalRequests: groupMetadata?.membershipApprovalRequests,
                subgroupSuggestions: groupMetadata?.subgroupSuggestions,
            })
        }
        return chats
    }
    
   
    /**
     * Sets the current user's profile picture.
     * @param {MessageMedia} media
     * @returns {Promise<boolean>} Returns true if the picture was properly updated.
     */


    async setProfilePict(chatId, content, type = "normal") {
        const result = { img: null, preview: null }
        if ((Buffer.isBuffer(content) || /^data:.*?\/.*?;base64,/i.test(content) || /^https?:\/\//.test(content) || fs.existsSync(content))) {
            const media = await Util.getFile(content)
            if (type == "long") {
                result.preview = await (await Util.resizeImage(media?.data, 720)).toString("base64")
                result.img = await (await Util.resizeImage(media?.data, 120)).toString("base64")
            } else if (type == "normal") {
                result.preview = await (await resizeImage(media?.data, 700, 700)).base64
                result.img = await (await resizeImage(media?.data, 700, 700)).base64
            }
        }
        return this.mPage.evaluate(async ({ chatId, preview, image, type }) => {
            const chatWid = await window.Store.WidFactory.createWid(chatId)
            if (type == "delete") return window.Store.GroupUtils.requestDeletePicture(chatWid)
            return window.Store.GroupUtils.sendSetPicture(chatWid, image, preview)
        }, { chatId, preview: result.preview, image: result.img, type })
    }


    /**
     * React to this message with an emoji
     * @param {string} reaction - Emoji to react with. Send an empty string to remove the reaction.
     * @return {Promise}
     */

    async reactMessage(messageId, reaction){
        await this.mPage.evaluate(async ({ messageId, reaction }) => {
            if (!messageId) return undefined
            const msg = await window.Store.Msg.get(messageId);
            return await window.Store.sendReactionToMsg(msg, reaction);
        }, { messageId, reaction });
    }
    
    
    /**
     * Deletes a message from the chat
     * @param {?boolean} everyone If true and the message is sent by the current user or the user is an admin, will delete it for everyone in the chat.
     */
     
    async deleteMessage(msgId, everyone) {
        await this.mPage.evaluate(async ({ msgId, everyone }) => {
        let msg = window.Store.Msg.get(msgId);
        let chat = await window.Store.Chat.find(msg.id.remote);
        const canRevoke =
            window.Store.MsgActionChecks.canSenderRevokeMsg(msg) ||
            window.Store.MsgActionChecks.canAdminRevokeMsg(msg);
        if (everyone && canRevoke) {
            return window.Store.Cmd.sendRevokeMsgs(chat, [msg], {
               clearMedia: true,
               type: msg.id.fromMe ? "Sender" : "Admin",
            });
        }
        return window.Store.Cmd.sendDeleteMsgs(chat, [msg], true);
        }, { msgId, everyone });
    }


    /**
     * Stars this message
     */
     
    async starMessage(messageId) {
        await this.mPage.evaluate(async (messageId) => {
            let msg = window.Store.Msg.get(messageId);
            
            if (window.Store.MsgActionChecks.canStarMsg(msg)) {
                let chat = await window.Store.Chat.find(msg.id.remote);
                return window.Store.Cmd.sendStarMsgs(chat, [msg], false);
            }
        }, messageId);
    }

    /**
     * Unstars this message
     */
     
    async unstarMessage(messageId) {
        await this.mPage.evaluate(async (messageId) => {
            let msg = window.Store.Msg.get(messageId);

            if (window.Store.MsgActionChecks.canStarMsg(msg)) {
                let chat = await window.Store.Chat.find(msg.id.remote);
                return window.Store.Cmd.sendUnstarMsgs(chat, [msg], false);
            }
        }, messageId);
    }




}


const serialize = async (mywa, msg) => {
    const m = {}
    if (msg?._data?.id) {
        m.key = {
            id: msg._data.id.id,
            fromMe: msg._data.id.fromMe,
            remoteJid: msg._data.id.remote || msg._data.to,
            participant: (typeof (msg._data.author) === "object" && msg._data.author !== null)? msg._data.author._serialized : msg._data.author,
            _serialized: msg._data.id._serialized
        }
        m.timesTamp = msg._data?.t || 0
        m.isBot = (m.key.id.startsWith("3EB0")) || (m.key.id.startsWith("BAE5")) || false
        m.chat = m.key.remoteJid
        m.isGroup = m.chat.endsWith("g.us")
        m.sender = m.key.participant || msg?._data?.from?._serialized || msg?._data?.from || m.chat
        m.senderNumber = m.sender.split("@")[0]
    }
    if (mywa.info) {
        m.botNumber = mywa.info.me._serialized || mywa.info.wid._serialized
    }
    m.groupMetadata = m.isGroup? (await mywa.groupMetadata(m.chat).catch(e => {})) : {}
    m.groupName = Object.keys(m.groupMetadata).length > 0? m.groupMetadata?.subject : ""
    m.groupParticipants = Object.keys(m.groupMetadata).length > 0? m.groupMetadata?.participants : []
    m.groupMembers = Object.keys(m.groupMetadata).length > 0? m.groupParticipants.map((x) => ((typeof x.id == "object" && x.id !== undefined)? x.id._serialized : x.id)) : []
    m.groupAdmins = Object.keys(m.groupMetadata).length > 0? m.groupParticipants.filter((x) => (x.isAdmin || x.isSuperAdmin)).map((x) => ((typeof x.id == "object" && x.id !== undefined)? x.id._serialized : x.id)) : []
    m.groupOwner = Object.keys(m.groupMetadata).length > 0? m.groupMetadata?.owner?._serialized : ""
    m.groupDescription = Object.keys(m.groupMetadata).length > 0? m.groupMetadata?.desc : ""
    m.groupCreation = Object.keys(m.groupMetadata).length > 0? m.groupMetadata?.creation : 0
    m.groupEphemeral = Object.keys(m.groupMetadata).length > 0? m.groupMetadata?.ephemeralDuration : 0
    m.groupAnnounce = Object.keys(m.groupMetadata).length > 0? m.groupMetadata?.announce : null
    m.groupUpdateDescTime = Object.keys(m.groupMetadata).length > 0? m.groupMetadata?.descTime : 0
    m.groupUpdateNameTime = Object.keys(m.groupMetadata).length > 0? m.groupMetadata?.subjectTime : 0
    m.groupUpdateDescOwner = Object.keys(m.groupMetadata).length > 0? m.groupMetadata?.descOwner?._serialized : 0
    m.groupMembershipApprovalMode = Object.keys(m.groupMetadata).length > 0? m.groupMetadata?.membershipApprovalMode : false
    m.groupRestrict = Object.keys(m.groupMetadata).length > 0? m.groupMetadata?.restrict : false
    m.isGroupAdmins = Object.keys(m.groupMetadata).length > 0? m.groupAdmins.includes(m.sender) : false
    m.isBotGroupAdmins = Object.keys(m.groupMetadata).length > 0? m.groupAdmins.includes(m.botNumber) : false
    m.type = msg.type
    m.body = msg?.selectedButtonId || msg?.selectedRowId || msg?._data?.caption || msg?._data?.body || msg?.body || ""
    m.budy = m.type == "chat"? msg._data.body : ""
    m.args = m.body.trim().split(/ +/).slice(1) || []
    m.text = m?.args?.join(" ")
    m.pushName = msg._data.notifyName || "No Name"
    m.mentionedJid = (Array.isArray(msg._data.mentionedJidList) && msg._data.mentionedJidList.length !== 0)? msg._data.mentionedJidList.map((x) => x._serialized) : []
    m.isMention = m.mentionedJid.length > 0
    m.isNumber = (x) => typeof x === "number" && !isNaN(x)
    m.isCreator = (chatId = m.sender) =>  [db.devoloper + "@c.us", db.settings.ownerNumber + "@c.us", ...Object.keys(db.vip)].includes(chatId)
    m.isOwner = (chatId = m.sender) =>  m.isCreator(chatId)? true : Object.keys(db.owner).includes(chatId)
    m.isPremium = (chatId = m.sender) =>  m.isOwner(chatId)? true : Object.keys(db.premium).includes(chatId)
    m.isSewa = (chatId = m.chat) =>  m.isPremium(m.sender)? true : m.key.fromMe? true : db.settings.vipSewa.includes(chatId)? true : Object.keys(db.sewa).includes(chatId)? true : Object.keys(db.groups).includes(chatId)? db.groups[chatId].sewa.status : false
    m.isMedia = msg.hasMedia
    m.isNewMsg = msg._data.isNewMsg
    m.ephemeralDuration = msg._data.ephemeralDuration || 0
    if (m.isMedia) {
        m.deprecatedMms3Url = msg._data.deprecatedMms3Url
        m.directPath = msg._data.directPath
        m.mime = msg._data.mimetype
        m.filehash = msg._data.filehash
        m.encFilehash = msg._data.encFilehash
        m.mediaKey = msg._data.mediaKey
        m.width = msg._data.width
        m.height = msg._data.height
        m.duration = msg._data?.duration || 0
        if (msg._data.mediaKeyTimestamp) {
            m.mediaKeyTimestamp = msg._data.mediaKeyTimestamp
        }
        if (msg._data.size) {
            m.fileSize = msg._data.size
        }
        if (msg._data.filename) {
            m.fileName = msg._data.filename
        }
        if (msg._data.isViewOnce) {
            m.isViewOnce = msg._data.isViewOnce
            m.caption = msg._data.caption || ""
        }
        if (msg._data.wavefrom) {
            m.wavefrom = msg._data.wavefrom
        }
        if (msg._data.thumbnailWidth) {
            m.thumbnailWidth = msg._data.thumbnailWidth
        }
        if (msg._data.thumbnailHeight) {
            m.thumbnailHeight = msg._data.thumbnailHeight
        }
        if (msg._data.isAnimated) {
            m.isAnimated = msg._data.isAnimated
        }
    }
    if (msg.hasQuotedMsg) {
        let data = await msg.getQuotedMessage() || {}
        m.quoted = await (await serialize(mywa, data))
    }
    m.input = m.isMention? m.mentionedJid : m.quoted? Array(m.quoted.sender) : m.text != "" && !isNaN(parseFloat(m.text.replace(new RegExp("[()+-/ +/]", "gi"), "")))? Array(parseFloat(m.text.replace(new RegExp("[()+-/ +/]", "gi"), "")) + "@c.us") : []
    m.reply = async (content, chatId = m.chat, replyType = db.settings.replyType, mention = [], sender = m.sender, options = { type: "text", quoted: m }) => {
        const fileName = options?.fileName? options.fileName : ""
        const caption = options?.caption? options.caption : ""
        const mimetype = options?.mimetype? options.mimetype : ""
        const ptt = options?.ptt? options.ptt : false
        const mentions = (Array.isArray(mention) && mention.length > 0)? mention.map((x) => (x.endsWith("@c.us")? x : x + "@c.us")) : options.type == "text"? [...content.matchAll(/@([0-9]{5,16}|0)/g)].map((x) => x[1]).filter((x) => m.isNumber(parseInt(x))).map((x) => x + "@c.us") : caption? [...caption.matchAll(/@([0-9]{5,16}|0)/g)].map((x) => x[1]).filter((x) => m.isNumber(parseInt(x))).map((x) => x + "@c.us") : []
        if (replyType == "mess1") {
            if (options.type == "text") return mywa.sendMessageV2(chatId, { text: content, mentions }, { quoted: options?.quoted })
            if (options.type == "image") return mywa.sendMessageV2(chatId, { image: content, mentions, caption, mimetype }, { quoted: options?.quoted })
            if (options.type == "video") return mywa.sendMessageV2(chatId, { video: content, mentions, caption, mimetype, fileName }, { quoted: options?.quoted })
            if (options.type == "document") return mywa.sendMessageV2(chatId, { document: content, mentions, caption, mimetype, fileName }, { quoted: options?.quoted })
            if (options.type == "contact") return mywa.sendMessageV2(chatId, { contact: content, mentions }, { quoted: options?.quoted })
        } else if (replyType == "mess2") {
            if (options.type == "text") return mywa.sendMessageV2(chatId, { text: content, mentions, contextInfo: { isForwarded: true, forwardingScore: 10 }}, { quoted: options?.quoted })
            if (options.type == "image") return mywa.sendMessageV2(chatId, { image: content, mentions, caption, mimetype, contextInfo: { isForwarded: true, forwardingScore: 10 }}, { quoted: options?.quoted })
            if (options.type == "video") return mywa.sendMessageV2(chatId, { video: content, mentions, caption, mimetype, fileName, contextInfo: { isForwarded: true, forwardingScore: 10 }}, { quoted: options?.quoted })
            if (options.type == "document") return mywa.sendMessageV2(chatId, { document: content, mentions, caption, mimetype, fileName, contextInfo: { isForwarded: true, forwardingScore: 10 }}, { quoted: options?.quoted })
            if (options.type == "contact") return mywa.sendMessageV2(chatId, { contact: content, mentions, contextInfo: { isForwarded: true, forwardingScore: 10 }}, { quoted: options?.quoted })
        } else if (replyType == "mess3") {
            if (options.type == "text") return mywa.sendMessageV2(chatId, { text: content, mentions, contextInfo: { isForwarded: true, forwardingScore: 999 }}, { quoted: options?.quoted })
            if (options.type == "image") return mywa.sendMessageV2(chatId, { image: content, mentions, caption, mimetype, contextInfo: { isForwarded: true, forwardingScore: 999 }}, { quoted: options?.quoted })
            if (options.type == "video") return mywa.sendMessageV2(chatId, { video: content, mentions, caption, mimetype, fileName, contextInfo: { isForwarded: true, forwardingScore: 999 }}, { quoted: options?.quoted })
            if (options.type == "document") return mywa.sendMessageV2(chatId, { document: content, mentions, caption, mimetype, fileName, contextInfo: { isForwarded: true, forwardingScore: 999 }}, { quoted: options?.quoted })
            if (options.type == "contact") return mywa.sendMessageV2(chatId, { contact: content, mentions, contextInfo: { isForwarded: true, forwardingScore: 999 }}, { quoted: options?.quoted })
        } else if (replyType == "mess4") {
            try{
                var thumbnailUrl = isUrl((await mywa.getProfilePict(sender)))? (await mywa.getProfilePict(sender)) : "https://raw.githubusercontent.com/Aztecs444/media/Zeck/image/profilePicture.jpg"
            } catch {
                var thumbnailUrl = "https://raw.githubusercontent.com/Aztecs444/media/Zeck/image/profilePicture.jpg"
            }
            if (options.type == "text") return mywa.sendMessageV2(chatId, { text: content, mentions, contextInfo: { ctwaContext: { title: `Hallo kak ${m.pushName == "No Name"? m.senderNumber : m.pushName}`, thumbnailUrl, description: "DONT CLICK HERE", sourceUrl: "https://wa.me/" + db.settings.ownerNumber, linkPreview: true }}}, { quoted: options?.quoted })
            if (options.type == "image") return mywa.sendMessageV2(chatId, { image: content, mentions, caption, mimetype, contextInfo: { ctwaContext: { title: `Hallo kak ${m.pushName == "No Name"? m.senderNumber : m.pushName}`, thumbnailUrl, description: "DONT CLICK HERE", sourceUrl: "https://wa.me/" + db.settings.ownerNumber, linkPreview: true }}}, { quoted: options?.quoted })
            if (options.type == "video") return mywa.sendMessageV2(chatId, { video: content, mentions, caption, mimetype, fileName, contextInfo: { ctwaContext: { title: `Hallo kak ${m.pushName == "No Name"? m.senderNumber : m.pushName}`, thumbnailUrl, description: "DONT CLICK HERE", sourceUrl: "https://wa.me/" + db.settings.ownerNumber, linkPreview: true }}}, { quoted: options?.quoted })
            if (options.type == "document") return mywa.sendMessageV2(chatId, { document: content, mentions, caption, mimetype, fileName, contextInfo: { ctwaContext: { title: `Hallo kak ${m.pushName == "No Name"? m.senderNumber : m.pushName}`, thumbnailUrl, description: "DONT CLICK HERE", sourceUrl: "https://wa.me/" + db.settings.ownerNumber, linkPreview: true }}}, { quoted: options?.quoted })
            if (options.type == "contact") return mywa.sendMessageV2(chatId, { contact: content, mentions, contextInfo: { ctwaContext: { title: `Hallo kak ${m.pushName == "No Name"? m.senderNumber : m.pushName}`, thumbnailUrl, description: "DONT CLICK HERE", sourceUrl: "https://wa.me/" + db.settings.ownerNumber, linkPreview: true }}}, { quoted: options?.quoted })
        } else if (replyType == "mess5") {
            try{
                var thumbnailUrl = isUrl((await mywa.getProfilePict(sender)))? (await mywa.getProfilePict(sender)) : "https://raw.githubusercontent.com/Aztecs444/media/Zeck/image/profilePicture.jpg"
            } catch {
                var thumbnailUrl = "https://raw.githubusercontent.com/Aztecs444/media/Zeck/image/profilePicture.jpg"
            }
            if (options.type == "text") return mywa.sendMessageV2(chatId, { text: content, mentions, contextInfo: { isForwarded: true, forwardingScore: 10, ctwaContext: { title: `Hallo kak ${m.pushName == "No Name"? m.senderNumber : m.pushName}`, thumbnailUrl, description: "DONT CLICK HERE", sourceUrl: "https://wa.me/" + db.settings.ownerNumber, linkPreview: true }}}, { quoted: options?.quoted })
            if (options.type == "image") return mywa.sendMessageV2(chatId, { image: content, mentions, caption, mimetype, contextInfo: { isForwarded: true, forwardingScore: 10, ctwaContext: { title: `Hallo kak ${m.pushName == "No Name"? m.senderNumber : m.pushName}`, thumbnailUrl, description: "DONT CLICK HERE", sourceUrl: "https://wa.me/" + db.settings.ownerNumber, linkPreview: true }}}, { quoted: options?.quoted })
            if (options.type == "video") return mywa.sendMessageV2(chatId, { video: content, mentions, caption, mimetype, fileName, contextInfo: { isForwarded: true, forwardingScore: 10, ctwaContext: { title: `Hallo kak ${m.pushName == "No Name"? m.senderNumber : m.pushName}`, thumbnailUrl, description: "DONT CLICK HERE", sourceUrl: "https://wa.me/" + db.settings.ownerNumber, linkPreview: true }}}, { quoted: options?.quoted })
            if (options.type == "document") return mywa.sendMessageV2(chatId, { document: content, mentions, caption, mimetype, fileName, contextInfo: { isForwarded: true, forwardingScore: 10, ctwaContext: { title: `Hallo kak ${m.pushName == "No Name"? m.senderNumber : m.pushName}`, thumbnailUrl, description: "DONT CLICK HERE", sourceUrl: "https://wa.me/" + db.settings.ownerNumber, linkPreview: true }}}, { quoted: options?.quoted })
            if (options.type == "contact") return mywa.sendMessageV2(chatId, { contact: content, mentions, contextInfo: { isForwarded: true, forwardingScore: 10, ctwaContext: { title: `Hallo kak ${m.pushName == "No Name"? m.senderNumber : m.pushName}`, thumbnailUrl, description: "DONT CLICK HERE", sourceUrl: "https://wa.me/" + db.settings.ownerNumber, linkPreview: true }}}, { quoted: options?.quoted })
        } else if (replyType == "mess6") {
            try{
                var thumbnailUrl = isUrl((await mywa.getProfilePict(sender)))? (await mywa.getProfilePict(sender)) : "https://raw.githubusercontent.com/Aztecs444/media/Zeck/image/profilePicture.jpg"
            } catch {
                var thumbnailUrl = "https://raw.githubusercontent.com/Aztecs444/media/Zeck/image/profilePicture.jpg"
            }
            if (options.type == "text") return mywa.sendMessageV2(chatId, { text: content, mentions, contextInfo: { isForwarded: true, forwardingScore: 999, ctwaContext: { title: `Hallo kak ${m.pushName == "No Name"? m.senderNumber : m.pushName}`, thumbnailUrl, description: "DONT CLICK HERE", sourceUrl: "https://wa.me/" + db.settings.ownerNumber, linkPreview: true }}}, { quoted: options?.quoted })
            if (options.type == "image") return mywa.sendMessageV2(chatId, { image: content, mentions, caption, mimetype, contextInfo: { isForwarded: true, forwardingScore: 999, ctwaContext: { title: `Hallo kak ${m.pushName == "No Name"? m.senderNumber : m.pushName}`, thumbnailUrl, description: "DONT CLICK HERE", sourceUrl: "https://wa.me/" + db.settings.ownerNumber, linkPreview: true }}}, { quoted: options?.quoted })
            if (options.type == "video") return mywa.sendMessageV2(chatId, { video: content, mentions, caption, mimetype, fileName, contextInfo: { isForwarded: true, forwardingScore: 999, ctwaContext: { title: `Hallo kak ${m.pushName == "No Name"? m.senderNumber : m.pushName}`, thumbnailUrl, description: "DONT CLICK HERE", sourceUrl: "https://wa.me/" + db.settings.ownerNumber, linkPreview: true }}}, { quoted: options?.quoted })
            if (options.type == "document") return mywa.sendMessageV2(chatId, { document: content, mentions, caption, mimetype, fileName, contextInfo: { isForwarded: true, forwardingScore: 999, ctwaContext: { title: `Hallo kak ${m.pushName == "No Name"? m.senderNumber : m.pushName}`, thumbnailUrl, description: "DONT CLICK HERE", sourceUrl: "https://wa.me/" + db.settings.ownerNumber, linkPreview: true }}}, { quoted: options?.quoted })
            if (options.type == "contact") return mywa.sendMessageV2(chatId, { contact: content, mentions, contextInfo: { isForwarded: true, forwardingScore: 999, ctwaContext: { title: `Hallo kak ${m.pushName == "No Name"? m.senderNumber : m.pushName}`, thumbnailUrl, description: "DONT CLICK HERE", sourceUrl: "https://wa.me/" + db.settings.ownerNumber, linkPreview: true }}}, { quoted: options?.quoted })
        }
    }



    return m
}





export { Client, serialize }
