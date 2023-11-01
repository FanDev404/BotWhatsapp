module.exports = {
    commands: ["setdone"],
    minArgs: 1,
    expectedArgs: "<teks>",
    example: "{prefix}{command} \`\`\`「 TRANSAKSI SUCCES 」\`\`\`\n\n📆 TANGGAL : {calender}\n⌚ JAM : {time}\n👤 USERS : @{users}\n✨ STATUS  : Done\n📝 Catatan : {note}",
    tags: "store menu", 
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            db.groups[m.chat].store.done = m.text
            m.reply("Success set done")
            cmdSuccess(command, "store menu")
        } catch (error) {
            cmdFailed(command, "store menu", error)
        }
    }
}