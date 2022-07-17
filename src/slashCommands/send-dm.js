module.exports = {
    name: 'send-dm',
    description: 'Commande envoyant un DM à l\'utilisateur connecté.',
    usage: '<prefix>send-dm [input]',
    examples: ['send-dm', 'send-dm input'],
    options: [
        {
            name: 'input',
            description: "Défini un input aléatoire à envoyer à l'utilisateur",
            type: 3,
            required: false
        }
    ],

    run :async (client, interaction) => {
        if(interaction.options.getString('input')) {
            client.guilds.fetch('777327735348527116').then((guilds)=> {
                guilds.members.fetch(interaction.member.user.id).then((member) => {
                    member.send(interaction.options.getString('input'));
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
