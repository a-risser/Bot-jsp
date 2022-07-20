module.exports = {
    name: 'call',
    description: 'Faire un call pour proposer une session de jeu, ajoutez une date pour les calls de +24h',
    usage: '<prefix>call [@jeu] [hour] [date]', //OPTIONAL (for the help cmd)
    examples: ['call jeu:@Among us heure:21h00 date:25/12/2022'], //OPTIONAL (for the help cmd)
    cooldown: 10, // Cooldown in seconds, by default it's 2 seconds | OPTIONAL
    permissions: [], // OPTIONAL
    options: [
        {
            name: 'jeu',
            description: "Jeu concerné par le call.",
            type: 8,
            required: true,
        },
        {
            name: 'heure',
            description: "Heure de la session de jeu.",
            type: 3,
            required: true,
        },
        {
            name: 'date',
            description: "Date de la session de jeu, uniquement si dans +24h.",
            type: 3,
            required: false,
        }
    ],
    run: async (client, interaction) => {
        const jspGuild = client.guilds.resolve(client.config.guildId);
        const quiJoueChannel = jspGuild.channels.resolve(client.config.channelCmdAdminId); //todo - replace it by : client.config.channelQuiJoueId

        let game = interaction.options.getRole('jeu');
        let hour = interaction.options.getString('heure');
        let date = interaction.options.getString('date');
        let isScheduled = false;

        //check hour format
        if (!hour.match(/\d{2}[hH:]\d{2}/)) {
            interaction.reply({content : '❌️ "heure" n\'est pas au bon format (hh:mm). Voici un exemple valide : 21h00.', ephemeral: true})
                .then((message) => client.logger.error(message.content))
            ;
            return;
        }
        //replace 'H' or ':' by 'h'
        hour = hour.replace(/[H:]/g, 'h');

        quiJoueChannel.send({ content: '*'+ interaction.user.username + '* veut jouer à <@&' + game + '> à ' + hour + '.' })
            .then(message => {
                message.react("👍");
                message.react("👎");

                //If date = scheduled call
                if (date) {
                    if (!date.match(/\d{2}\/\d{2}\/\d{4}/)) {
                        interaction.reply({content : '❌️ "date" n\'est pas au bon format (jj/mm/hhhh). Voici un exemple valide : 25/12/2022.', ephemeral: true})
                            .then((message) => client.logger.error(message.content))
                        ;
                        return;
                    }
                    isScheduled = true;
                    //jspGuild.scheduledEvents.create();
                }

                //Create thread
                let archiveDuration = isScheduled ? 'MAX' : 1440; //maximum (1 week actually) or 1 day. Doc: https://discord-api-types.dev/api/discord-api-types-v10/enum/ThreadAutoArchiveDuration
                message.startThread({
                    name: 'Call ' + game.name + ' à ' + hour,
                    autoArchiveDuration: archiveDuration,
                    type: 'GUILD_PUBLIC_THREAD',
                    reason: 'Discuss about the call'
                })

                interaction.reply({content : 'Call créé avec succès dans le salon <#' + quiJoueChannel + '>.', ephemeral: true});
            })
    }
}
