const {GetGameEmoji} = require('../utils/emoji');
const {IsValidTimeFormat} = require("../utils/datetime");

module.exports = {
    name: 'call',
    description: 'Faire un call pour proposer une session de jeu.',
    usage: '<prefix>call [@jeu_1] [heure] [@jeu_2] [@jeu_3] [@jeu_4] [@jeu_5] ',
    examples: ['call jeu:@Among us heure:21h00 jeu1:@Phasmophobia'],
    cooldown: 120, //in seconds
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
        const user = interaction.user;

        //push all games in an array
        let games = [];
        for (let n = 1; n <= 5; n++) {
            if (interaction.options.getRole('jeu_' + n)) {
                games.push(interaction.options.getRole('jeu_' + n));
            }
        }

        //check time format
        const time = interaction.options.getString('heure');
        if (!IsValidTimeFormat(time)) {
            interaction.reply({content : '⚠ "heure" n\'est pas au bon format. Requis : `ʰʰhᵐᵐ` (ex: 21h00).', ephemeral: true});
            client.logger.error('command: call, user:' + user.username + ', reason: wrong hours format')
            return;
        }
        const formattedTime = time.replace(/[H:]/g, 'h');

        //build content and get emojis
        let emojisToAdd = [];
        let content = '**' + user.username + '** propose de jouer à ';
        for (let [index, game] of games.entries()) {
            //add games and conjunction to content
            content += game.toString();
            if (index === games.length - 2) {
                content += ' ou ';
            }  else if (index !== games.length - 1) {
                content += ', ';
            }
            //add game emoji in list
            emojisToAdd.push(GetGameEmoji(game));
        }
        content += ' à partir de **' + formattedTime + '** !';

        //send message
        quiJoueChannel.send({ content: content })
            .then(message => {
                //Add reactions
                for (const emojiToAdd of emojisToAdd) {
                    message.react(emojiToAdd).catch((error) => {
                        client.logger.error('command: call, user:' + user.username + ', reason: ' + error);
                    });
                }

                //Create thread
                message.startThread({
                    name: 'Merci d\'en discuter dans ce fil',
                    autoArchiveDuration: 60,
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
    }
}
