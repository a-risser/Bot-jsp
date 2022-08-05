const {IsValidDateFormat, IsValidTimeFormat, BuildDateTimeObjectFromValidFormat} = require("../utils/datetime");

module.exports = {
    name: 'event',
    description: 'Faire un event pour proposer une session de jeu.',
    usage: '<prefix>event [@jeu] [heure] [date]', //OPTIONAL (for the help cmd)
    examples: ['event jeu:@Among us heure:21h00 date:25/12/2022'], //OPTIONAL (for the help cmd)
    cooldown: 600, //in seconds, 10 minutes
    permissions: [], // OPTIONAL
    options: [
        {
            name: 'jeu',
            description: "Jeu concerné.",
            type: 8,
            required: true,
        },
        {
            name: 'date',
            description: "Date de la session de jeu, au format ʲʲ/ᵐᵐ/ᵃᵃᵃᵃ (ex: 21/07/2022).",
            type: 3,
            required: true,
        },
        {
            name: 'heure',
            description: "Heure de la session de jeu, au format ʰʰhᵐᵐ (ex: 21h30).",
            type: 3,
            required: true,
        },
    ],
    run: async (client, interaction) => {
        const jspGuild = client.guilds.resolve(client.config.guildId);
        const quiJoueChannel = jspGuild.channels.resolve(client.config.channelCmdAdminId); //todo: client.config.channelQuiJoueId
        const user = interaction.user;
        const game = interaction.options.getRole('jeu');

        //check date format
        const date = interaction.options.getString('date');
        if (!IsValidDateFormat(date)) {
            interaction.reply({content: '⚠️️ "date" n\'est pas au bon format. Requis : `ʲʲ/ᵐᵐ/ᵃᵃᵃᵃ` (ex: 25/12/2022).', ephemeral: true});
            client.logger.error('command: call, user:' + user.username + ', reason: wrong dates format')
            return;
        }

        //check time format
        const time = interaction.options.getString('heure');
        if (!IsValidTimeFormat(time)) {
            interaction.reply({content : '⚠ "heure" n\'est pas au bon format. Requis : `ʰʰhᵐᵐ` (ex: 21h00).', ephemeral: true});
            client.logger.error('command: call, user:' + user.username + ', reason: wrong hours format')
            return;
        }


        let startDateObj = BuildDateTimeObjectFromValidFormat(date, time);
        let endDateObj = new Date(startDateObj.getTime()).addHours(1);

        //Build event
        await jspGuild.scheduledEvents.create({
            name: 'Session ' + game.name,
            privacyLevel: 2,
            entityType: 3,
            entityMetadata: {location: 'ᒍᔕᑭ-ᴶᵉᵘ ˢᵃᶦˢ ᵖᵃˢ-'},
            description: user.username + ' organise une session de ' + game.name + ' !',
            scheduledStartTime: startDateObj,
            scheduledEndTime: endDateObj
        })
            .then((event) => {
                //build content
                const validTimeStamp = event.scheduledStartTimestamp.toString().slice(0, -3);
                let content = `**${user.username}** propose de jouer à ${game.toString()}, le <t:${validTimeStamp}:F>.\n\n> 🏁 <t:${validTimeStamp}:R> \n\n${event.url}`;

                //send message
                quiJoueChannel.send({ content: content })
                    .then(message => {
                        //Create thread
                        message.startThread({
                            name: 'Discutez de l\'event dans ce fil',
                            autoArchiveDuration: 'MAX',
                        }).catch((error) => {
                            interaction.reply({content : '❌️ Erreur lors de la création du fil, merci de contacter un Admin'});
                            client.logger.error('command: call, user:' + user.username + ', reason: ' + error);
                        });

                        //Send success command message
                        interaction.reply({content : 'Call créé avec succès dans le salon <#' + quiJoueChannel + '>.', ephemeral: true});
                    })
                    .catch((error) => {
                        interaction.reply({content: '❌️ Erreur lors de l\'ajout du message, merci de contacter un Admin'});
                        client.logger.error('command: call, user:' + user.username + ', reason: ' + error);
                    })
                ;
            })
            .catch((error) => {
                interaction.reply({content: '❌️ Erreur lors de la création de l\'événement, merci de contacter un Admin'});
                client.logger.error('command: call, user:' + user.username + ', reason: ' + error);
            })
        ;
    }
}
