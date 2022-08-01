function GetGameEmoji(game) {
    let emojiName = game.name.replace(/[^a-zA-Z0-9\s]/g, '').trim()
        .split(/ |\B(?=[A-Z])/)
        .map(word => word.toLowerCase())
        .join('_')
    ;
    return game.guild.emojis.cache.find(emoji => emoji.name === emojiName);
}

module.exports = {
    GetGameEmoji
};