module.exports = {
    name: 'call',
    description: 'Faire un call pour proposer une session de jeu. Ajoutez la date pour les calls dans plus de 24h.',
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
            description: "Heure de la session de jeu, au format ʰʰhᵐᵐ (ex: 21h30).",
            type: 3,
            required: true,
        },
        {
            name: 'date',
            description: "[Uniquement si call dans +24h] Date de la session de jeu, au format ʲʲ/ᵐᵐ/ᵃᵃᵃᵃ (ex: 21/07/2022).",
            type: 3,
            required: false,
        }
    ],
    run: async (client, interaction) => {
        const jspGuild = client.guilds.resolve(client.config.guildId);
        const quiJoueChannel = jspGuild.channels.resolve(client.config.channelCmdAdminId); //todo - replace it by : client.config.channelQuiJoueId

        let game = interaction.options.getRole('jeu');
        let time = interaction.options.getString('heure');
        let date = interaction.options.getString('date');
        let isScheduled = false;

        //check time format
        let timeRegex = /^([0-1][0-9]|2[0-3])[hH:]([0-5][0-9])$/;
        if (!time.match(timeRegex)) {
            interaction.reply({content : '⚠️️ "heure" n\'est pas au bon format. Requis : `ʰʰhᵐᵐ` (ex: 21h00).', ephemeral: true})
                .then((message) => client.logger.error(message.content))
            ;
            return;
        }
        //replace 'H' or ':' by 'h'
        time = time.replace(/[H:]/g, 'h');

        //Build call content
        let content = '*'+ interaction.user.username + '* veut jouer à <@&' + game + '> à ' + time + '.'

        //** scheduled call **//
        if (date) {
            //check date format
            let dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/;
            if (!date.match(dateRegex)) {
                interaction.reply({content : '⚠️️ "date" n\'est pas au bon format. Requis : `ʲʲ/ᵐᵐ/ᵃᵃᵃᵃ` (ex: 25/12/2022).', ephemeral: true})
                    .then((message) => client.logger.error(message.content))
                ;
                return;
            }

            //Build date object
            let arrDate = date.split('/');
            let day = parseInt(arrDate[0]);
            let month = parseInt(arrDate[1]) - 1;
            let year = parseInt(arrDate[2]);

            let arrTime = time.split('h');
            let hour = parseInt(arrTime[0]);
            let minute = parseInt(arrTime[1]);

            let startDateObj = new Date(year, month, day, hour, minute);
            let endDateObj = new Date(year, month, day, hour+1, minute);

            //Build event
            await jspGuild.scheduledEvents.create({
                name: 'Session ' + game.name,
                privacyLevel: 2,
                entityType: 3,
                entityMetadata: {location: 'ᒍᔕᑭ-ᴶᵉᵘ ˢᵃᶦˢ ᵖᵃˢ-'},
                description: interaction.user.username + ' organise une session de ' + game.name + ' !',
                scheduledStartTime: startDateObj,
                scheduledEndTime: endDateObj
            }).catch((error) => {
                interaction.reply({content : '❌️ Erreur lors de la création de l\'événement, merci de contacter un Admin'})
                    .then((message) => client.logger.error(message.content))
                ;
            });

            isScheduled = true;
            content = '*'+ interaction.user.username + '* veut jouer à <@&' + game + '> à ' + time + ' le ' + date + '.'
        }

        quiJoueChannel.send({ content: content })
            .then(message => {
                //Add reactions
                message.react("👍");
                message.react("👎");

                //Create thread
                let archiveDuration = isScheduled ? 'MAX' : 1440; //maximum (1 week actually) or 1 day. Doc: https://discord-api-types.dev/api/discord-api-types-v10/enum/ThreadAutoArchiveDuration
                message.startThread({
                    name: 'Call ' + game.name + ' à ' + time,
                    autoArchiveDuration: archiveDuration,
                    type: 'GUILD_PUBLIC_THREAD',
                    reason: 'Discuss about the call'
                }).catch((error) => {
                    interaction.reply({content : '❌️ Erreur lors de la création du fil, merci de contacter un Admin'})
                        .then((message) => client.logger.error(message.content))
                    ;
                });

                //Send success command message
                interaction.reply({content : 'Call créé avec succès dans le salon <#' + quiJoueChannel + '>.', ephemeral: true});
            })
    }
}
