import { isUrl } from "../../libs/function.js"
export default {
    commands: ["delpp"],
    tags: "owner menu", 
    isSewa: true,
    isOwner: true,
    callback: async ({ mywa, m, command, cmdSuccess, cmdFailed }) => {
        try {
            try{
                var isProfile = isUrl((await mywa.getProfilePict(m.botNumber)))? true : false
            } catch {
                var isProfile = false
            }
            if (!isProfile) return m.reply("No photo profile!!") 
            await mywa.deleteMyPict() 
            await m.reply("Success delete photo profile")
            cmdSuccess(command, "owner menu")
        } catch (error) {
            cmdFailed(command, "owner menu", error)
        }
    }
}