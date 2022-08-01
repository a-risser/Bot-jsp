const {GetGameEmoji} = require("../utils/emoji");
const {MessageActionRow, MessageButton } = require("discord.js");

module.exports = async (client, message) => {
    if (message.channel.id !== client.config.channelCmdAdminId) {return;} //todo: client.config.channelQuiJoueId
    if (message.author.bot) {return;}
    if (!message.mentions?.roles) {return;}

    const messageUser = message.author;
    const guild = message.guild;

    //Get games roles
    const games = message.mentions.roles.filter(role => /[^\u0000-\u00ff]/.test(role.name)); //keep roles with emoji only

    if (games.size === 0) {return;}

    //Add games emojis to message
    games.reverse().each(game => {
        //get game emoji
        const emoji = GetGameEmoji(game);
        //add emoji to message
        message.react(emoji).catch((error) => {
            client.logger.error('command: call, user:' + messageUser.username + ', reason: ' + error);
        });
    })

    //add hashtag emoji
    const hashtagEmoji = guild.emojis.cache.find(emoji => emoji.name === 'create_thread');
    await message.react(hashtagEmoji);

    const filter = (reaction, user) => {
        return [hashtagEmoji.name].includes(reaction.emoji.name) && user.id === messageUser.id;
    };

    message.awaitReactions({filter, max: 1})
        .then(collected => {
            const reaction = collected.first();
            if (reaction.emoji.name !== hashtagEmoji.name) {return;}

            reaction.remove();

            message.startThread({
                name: 'Discutez du call de ' + messageUser.username + ' dans ce fil',
                autoArchiveDuration: 60,
            })
                .catch((error) => {
                    client.logger.error('command: call, user:' + messageUser.username + ', reason: ' + error);
                });
        });

    //Create new thread
    /*message.channel.threads.create({
        name: 'Discutez du call de ' + user.username + ' dans ce fil',
        autoArchiveDuration: 60,
    }).catch((error) => {
        client.logger.error('command: call, user:' + user.username + ', reason: ' + error);
    });*/

    //Create reply thread
    /*message.startThread({
        name: 'Merci d\'en discuter dans ce fil',
        autoArchiveDuration: 60,
        reason: 'Discuter à propos du call.'
    }).catch((error) => {
        client.logger.error('command: call, user:' + user.username + ', reason: ' + error);
    });*/

    //Button to create thread
    /*const button = new MessageButton()
        .setCustomId('thread_button')
        .setLabel('Créer un fil pour discuter du call')
        .setStyle(2)
    ;
    const row = new MessageActionRow().addComponents([button]);
    message.reply({components: [row]});*/
};