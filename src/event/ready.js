const exa  = require('../command/example');
const clearCMD  = require('../command/clear-cmd');

module.exports = async (client) => {
    client.logger.info(`[!] ${client.user.username} is now started...`)
    client.logger.info(`[!] The bot have ${client.commandes.size} commands and ${client.slash.size} (/) commands`)
    client.user.setActivity(` être développé par nous.`, { type: 'PLAYING' })

    let commands = client.application?.commands;

    commands.create(exa);
    commands.create(clearCMD);
};
