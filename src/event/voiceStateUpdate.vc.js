module.exports = async (client, oldState, newState) => {
    if(newState.channel?.id !== client.config.voiceAutoCreateAdmin) {
        return;
    }

    const voiceAutoCreate = newState.channel;

    voiceAutoCreate.clone({name: '#1'}) //todo: réfléchir pour le nom
        .then((voiceChannel) => {
            newState.member.voice.setChannel(voiceChannel.id);
        })
};