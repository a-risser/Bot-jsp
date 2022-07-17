module.exports = {
    name: 'pile-ou-face',
    description: 'Pile ou face ?',
    usage: '<prefix>pile-ou-face [force]', //OPTIONAL (for the help cmd)
    examples: ['pile-ou-face', 'pile-ou-face forcer:pile'], //OPTIONAL (for the help cmd)
    options: [
        {
            name: 'forcer',
            description: "Pour forcer pile ou face",
            type: 3,
            required: false,
            choices: [ { name: "pile", value: "pile" }, { name: "face", value: "face" } ]
        }
    ], // OPTIONAL, (/) command options ; read https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure

    run: async (client, interaction) => {
        let headsOrTails;
        if (interaction.options.getString('forcer')) {
            headsOrTails = interaction.options.getString('forcer');
        } else {
            headsOrTails = (Math.random() < 0.5) ? 'pile' : 'face';
        }
        interaction.reply({ content:  headsOrTails });
    }
}