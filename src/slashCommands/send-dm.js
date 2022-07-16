module.exports = {
    name: 'send-dm',
    description: 'Commande envoyant un DM à Shahan (le premier qui spam, je le ban).',
    usage: '<prefix>send-dm [input]',
    examples: ['send-dm', 'send-dm input'],
    aliases: ['sdm'],
    dir: "command",
    cooldown: 1,
    permissions: [],

    run :async (client, interaction) => {
        if(interaction.options.getString('input')) {
            client.guilds.fetch('777327735348527116').then((guilds)=> {
                guilds.members.fetch('232949020039839744').then((member) => {
                    member.send(input);
                })
            });
        } else {
            client.guilds.fetch('777327735348527116').then((guilds)=> {
                guilds.members.fetch('232949020039839744').then((member) => {
                    member.send('Default text');
                })
            });
        }
    }
}
