module.exports = {
    name: 'purge',
    description: 'Purge le channel CMD.',
    usage: '<prefix>purge ', //OPTIONAL (for the help cmd)
    examples: ['purge'], //OPTIONAL (for the help cmd)
    aliases: ['pg'],
    dir: "command",
    cooldown: 1, // Cooldown in seconds, by default it's 2 seconds | OPTIONAL
    permissions: [], // OPTIONAL

    run :async (client, message) => {
        message.reply("PURGE");
    }
}
