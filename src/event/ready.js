
module.exports = async (client) => {
    client.logger.info(`[!] ${client.user.username} is now started...`)
    client.logger.info(`[!] The bot have ${client.slash.size} (/) commands`)
    client.user.setActivity(` être développé par nous.`, {type: 'PLAYING'})

};
