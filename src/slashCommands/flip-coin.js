module.exports = {
    name: 'flip-coin',
    description: 'Pile ou face ?',
    usage: '<prefix>flip-coin [force]', //OPTIONAL (for the help cmd)
    examples: ['flip-coin', 'flip-coin force:pile'], //OPTIONAL (for the help cmd)
    type: 1,
    options: [
        {
            name: 'force',
            description: "Pour forcer pile ou face",
            type: 1,
            required: false,
            choices: [ { name: "pile", value: 'pile' }, { name: "face", value: 'face' } ]
        }
    ], // OPTIONAL, (/) command options ; read https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure

    run: async (client, interaction) => {
        let headsOrTails;
        if (interaction.options.getString('force') === 'pile') {
            headsOrTails = 'pile';
        } else if (interaction.options.getString('force') === 'face') {
            headsOrTails = 'face';
        } else {
            headsOrTails = (Math.random() < 0.5) ? 'pile' : 'face';
        }
        interaction.reply({ content:  headsOrTails });
    }
}