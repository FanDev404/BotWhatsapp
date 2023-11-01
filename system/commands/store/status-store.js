import { timeToEpired } from "../../libs/function.js"
export default {
    commands: ["status"],
    tags: "store menu", 
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            const listStore = Object.keys(db.groups[m.chat].store.key)
            if (listStore.length == 0) return m.reply("Tidak ada list di group ini")
            let teks = "\`\`\`「 STATUS STORE 」\`\`\`\n\n"
            for (let x of listStore) {
                teks += `- *Key* : ${x}\n- *Status* : ${db.groups[m.chat].store.key[x].text == ""? "No respon" : "Respon"}\n- *Type* : ${db.groups[m.chat].store.key[x].image !== ""? "Image" : db.groups[m.chat].store.key[x].document.url !== ""? "Document" : "Text" }\n- *Time* : ${db.groups[m.chat].store.key[x].time == 0? "Not found" : timeToEpired(db.groups[m.chat].store.key[x].time)}\n\n────────────────\n\n`
            }
            m.reply(teks)
            cmdSuccess(command, "store menu")
        } catch (error) {
            cmdFailed(command, "store menu", error)
        }
    }
}