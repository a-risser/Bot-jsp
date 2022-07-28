module.exports = {
    name: 'call',
    description: 'Faire un call pour proposer une session de jeu.',
    usage: '<prefix>call [@jeu] [hour] [@jeu1] [@jeu2] [@jeu3] [@jeu4] ',
    examples: ['call jeu:@Among us heure:21h00 jeu1:@Phasmophobia'],
    cooldown: 10,
    permissions: [],
    options: [
        {
            name: 'heure',
            description: "Heure de la session de jeu, au format ʰʰhᵐᵐ (ex: 21h30).",
            type: 3,
            required: true,
        },
        {
            name: 'jeu',
            description: "Jeu concerné par le call.",
            type: 8,
            required: true,
        },
        {
            name: 'jeu1',
            description: "Jeu concerné par le call.",
            type: 8,
            required: false
        },
        {
            name: 'jeu2',
            description: "Jeu concerné par le call.",
            type: 8,
            required: false
        },
        {
            name: 'jeu3',
            description: "Jeu concerné par le call.",
            type: 8,
            required: false
        },
        {
            name: 'jeu4',
            description: "Jeu concerné par le call.",
            type: 8,
            required: false
        }
    ],
    run: async (client, interaction) => {


        const jspGuild = client.guilds.resolve(client.config.guildId);
        const quiJoueChannel = jspGuild.channels.resolve(client.config.channelCmdAdminId); //todo: client.config.channelQuiJoueId

        const game = interaction.options.getRole('jeu');
        const game1 = interaction.options.getRole('jeu1');
        const game2 = interaction.options.getRole('jeu2');
        const game3 = interaction.options.getRole('jeu3');
        const game4 = interaction.options.getRole('jeu4');

        let arrayGames = [];
        arrayGames.push(game);
        if(game1) arrayGames.push(game1);
        if(game2) arrayGames.push(game2);
        if(game3) arrayGames.push(game3);
        if(game4) arrayGames.push(game4);

        let time = interaction.options.getString('heure');
        //check time format
        let timeRegex = /^([0-1][0-9]|2[0-3])[hH:]([0-5][0-9])$/;
        if (!time.match(timeRegex)) {
            interaction.reply({content : '⚠ "heure" n\'est pas au bon format. Requis : `ʰʰhᵐᵐ` (ex: 21h00).', ephemeral: true});
            client.logger.error('command: call, user:' + interaction.user.username + ', reason: wrong hours format')
            return;
        }
        //replace 'H' or ':' by 'h'
        time = time.replace(/[H:]/g, 'h');
        let content = '**'+ interaction.user.username + '** veut jouer';

        arrayGames = arrayGames.slice(1);

        let first = true;
        arrayGames.forEach(game=> {
            if (first) {
                content = content + ' à <@&' + game + '>';
            } else {
                content = content + 'ou à <@&' + game + '>';
            }
            first = false;
        })
        content = content + ' à partir de ' + time;

        quiJoueChannel.send({ content: content })
            .then(message => {
                //Add reactions
                message.react("👍");
                message.react("👎");
            })
    }
}
