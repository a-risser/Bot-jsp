module.exports = {
    name: 'clear-cmd',
    description: 'Purge le channel CMD.',
    usage: '<prefix>clear-cmd ', //OPTIONAL (for the help cmd)
    examples: ['clear-cmd'], //OPTIONAL (for the help cmd)
    aliases: ['ccmd'],
    dir: "command",
    cooldown: 1, // Cooldown in seconds, by default it's 2 seconds | OPTIONAL
    permissions: [], // OPTIONAL

    run :async (client, message) => {
        message.reply("PURGE");
    }
}
