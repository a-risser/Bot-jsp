module.exports = {
    name: 'send-dm',
    description: 'Commande envoyant un DM à Shahan (le premier qui spam, je le ban).',
    usage: '<prefix>send-dm [input]',
    examples: ['send-dm', 'send-dm input'],
    aliases: ['sdm'],
    dir: "command",
    cooldown: 1,
    permissions: [],
    options: [
        {
            name: 'input',
            description: "Get the bot's latency",
            type: 3,
            required: false,
            choices: [ { name: "yes", value: 'true' }, { name: "no", value: 'false' } ]
        }
    ],

    run :async (client, interaction) => {
        if(interaction.options.getString('input')) {
            client.guilds.fetch('777327735348527116').then((guilds)=> {
                guilds.members.fetch(interaction.member.user.id).then((member) => {
                    member.send(input);
                })
            });
        } else {
            client.guilds.fetch('777327735348527116').then((guilds)=> {
                guilds.members.fetch(interaction.member.user.id).then((member) => {
                    member.send('Default text');
                })
            });
        }
    }
}
