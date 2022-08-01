module.exports = async (client, interaction) => {
    return;
    if (!interaction.is()) {return;}
    if (interaction.customId !== 'thread_button') {return;}

    const button = interaction.button;
    button.message.reply.threads.create({
        name: 'Discutez du call de ' + user.username + ' dans ce fil',
        autoArchiveDuration: 60,
    }).catch((error) => {
        client.logger.error('command: call, user:' + user.username + ', reason: ' + error);
    });
};