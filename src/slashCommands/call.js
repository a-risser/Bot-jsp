// /call instant [@jeu] [heure].
// Ajout du call dans 🔍│qui_joue + création d'un fil.
// /call scheduled [@jeu] [jour/mois/année] [heure/minute].
// Création d'un événement + ajout du call dans 🔍│qui_joue avec le lien de l'event + création d'un fil.

module.exports = {
    name: 'call',
    description: 'Lancer un call pour un jeu dans le channel "qui joue".',
    usage: '<prefix>call [type] [jeu]', //OPTIONAL (for the help cmd)
    examples: [], //OPTIONAL (for the help cmd)
    cooldown: 1, // Cooldown in seconds, by default it's 2 seconds | OPTIONAL
    permissions: [], // OPTIONAL
    options: [
        {
            name: 'type',
            description: "Type de call à créer",
            type: 3,
            required: true,
            choices: [
                { name: "instant", value: "instant" },
                { name: "programme", value: "programme" }
            ]
        },
        {
            name: 'jeu',
            description: "Le jeu auquel tu veux jouer",
            type: 3,
            required: true
        }
    ],

    run :async (client, interaction) => {
        const jeu = interaction.options.getString('jeu');
        client.guilds.fetch('777327735348527116').then((guilds)=> {
            guilds.channels.fetch('986383828723568660').then((channel) => {
                message = channel.send('On cherche du monde pour jouer à ' + jeu);
                console.log(lastMessage);
                if (lastMessage.author.bot) {
                    lastMessage.startThread({
                        name: 'On cherche du monde pour jouer !',
                        reason: 'On cherche du monde pour jouer !',
                    });
                }
            })
        });
    }
}
