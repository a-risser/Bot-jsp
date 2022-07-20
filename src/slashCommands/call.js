module.exports = {
    name: 'call',
    description: 'call',
    usage: '<prefix>call [@jeu] [hour] [date]', //OPTIONAL (for the help cmd)
    examples: ['call jeu:@Among us hour:21h30 date:25/12/2022'], //OPTIONAL (for the help cmd)
    cooldown: 10, // Cooldown in seconds, by default it's 2 seconds | OPTIONAL
    permissions: [], // OPTIONAL
    options: [
        {
            name: 'game',
            description: "jeu concerné",
            type: 8,
            required: true,
        },
        {
            name: 'hour',
            description: "heure de la session de jeu",
            type: 3,
            required: true,
        },
        {
            name: 'date',
            description: "date de la session de jeu",
            type: 3,
            required: false,
        }
    ],
    run: async (client, interaction) => {
        let jspGuild = client.guilds.resolve(client.config.guildId);
        let quiJoueChannel = jspGuild.channels.resolve('885693782522212392'); //for now: admin cmd
        let game = interaction.options.getRole('game');
        let hour = interaction.options.getString('hour');

        quiJoueChannel.send({ content: interaction.user.username + ' veut jouer à <@&' + game + '> à ' + hour + '.' })
            .then(message => {
                message.react("👍");
                message.react("👎");

                message.startThread({
                    name: 'Call ' + game.name + ' à ' + hour,
                    autoArchiveDuration: 'MAX',
                    type: 'GUILD_PUBLIC_THREAD',
                    reason: 'Discuss about the call'
                })

                interaction.reply({content : 'Call créé avec succès dans le salon <#' + quiJoueChannel + '>.', ephemeral: true});
            })
    }
}