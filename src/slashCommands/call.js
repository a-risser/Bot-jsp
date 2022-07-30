const {GetGameEmoji} = require('/src/utils/emoji');

module.exports = {
    name: 'call',
    description: 'Faire un call pour proposer une session de jeu.',
    usage: '<prefix>call [@jeu] [hour] [@jeu1] [@jeu2] [@jeu3] [@jeu4] ',
    examples: ['call jeu:@Among us heure:21h00 jeu1:@Phasmophobia'],
    cooldown: 10,
    permissions: [],
    options: [
        {
            name: 'jeu_1',
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
            name: 'jeu_2',
            description: "Autre jeu concerné par le call.",
            type: 8,
            required: false
        },
        {
            name: 'jeu_3',
            description: "Autre jeu concerné par le call.",
            type: 8,
            required: false
        },
        {
            name: 'jeu_4',
            description: "Autre jeu concerné par le call.",
            type: 8,
            required: false
        },
        {
            name: 'jeu_5',
            description: "Autre jeu concerné par le call.",
            type: 8,
            required: false
        },
    ],
    run: async (client, interaction) => {

        const jspGuild = client.guilds.resolve(client.config.guildId);
        const quiJoueChannel = jspGuild.channels.resolve(client.config.channelCmdAdminId); //todo: client.config.channelQuiJoueId

        //push all games in an array
        let games = [];
        for (let n = 1; n <= 5; n++) {
            if (interaction.options.getRole('jeu_' + n)) {
                games.push(interaction.options.getRole('jeu_' + n));
            }
        }

        let time = interaction.options.getString('heure');
        //check time format
        if (!time.match(/^([0-1][0-9]|2[0-3])[hH:]([0-5][0-9])$/)) {
            interaction.reply({content : '⚠ "heure" n\'est pas au bon format. Requis : `ʰʰhᵐᵐ` (ex: 21h00).', ephemeral: true});
            client.logger.error('command: call, user:' + interaction.user.username + ', reason: wrong hours format')
            return;
        }
        //replace 'H' or ':' by 'h'
        time = time.replace(/[H:]/g, 'h');

        //build content and get emojis
        let content = '**'+ interaction.user.username + '** propose de jouer à ';
        let emojisToAdd = [];
        for (let [index, game] of games.entries()) {
            content += '<@&' + game + '>';
            if (index === games.length - 2) {
                content += ' ou ';
            }  else if (index !== games.length - 1) {
                content += ', ';
            }

            emojisToAdd.push(GetGameEmoji(game));
        }
        content += ' à partir de **' + time + '** !';

        //send message
        quiJoueChannel.send({ content: content })
            .then(message => {
                //Add reactions
                for (const emojiToAdd of emojisToAdd) {
                    message.react(emojiToAdd).catch((error) => {
                        client.logger.error('command: call, user:' + interaction.user.username + ', reason: ' + error);
                    });
                }
                //Send success command message
                interaction.reply({content : 'Call créé avec succès dans le salon <#' + quiJoueChannel + '>.', ephemeral: true});
            })
    }
}
