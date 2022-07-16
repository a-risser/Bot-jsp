module.exports = {
    name: 'clear-cmd',
    description: 'Purge le channel CMD.',
    usage: '<prefix>clear-cmd ', //OPTIONAL (for the help cmd)
    examples: ['clear-cmd'], //OPTIONAL (for the help cmd)
    aliases: ['ccmd'],
    dir: "command",
    cooldown: 1, // Cooldown in seconds, by default it's 2 seconds | OPTIONAL
    permissions: [], // OPTIONAL

    run :async (client) => {
        client.guilds.fetch('777327735348527116').then((guilds)=> {
            guilds.channels.fetch('986383828723568660').then((channel) => {
                channel.messages.fetch({limit: 100}).then((msgs) => {
                    const msgNotPinned = msgs.filter(m => !m.pinned);
                    msgNotPinned.forEach(msg => msg.delete());
                })
            })
        });
    }
}
