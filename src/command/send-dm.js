module.exports = {
    name: 'send-dm',
    description: 'Commande envoyant un DM à Shahan (le premier qui spam, je le ban).',
    usage: '<prefix>send-dm [input]',
    examples: ['send-dm', 'send-dm input'],
    aliases: ['sdm'],
    dir: "command",
    cooldown: 1,
    permissions: [],

    run :async (client, message, args) => {
        if(args[0] === 'input') {
            client.guilds.fetch('777327735348527116').then((guilds)=> {
                guilds.members.fetch('232949020039839744').then((member) => {
                    member.send(input);
                })
            });
        } else {
            client.guilds.fetch('777327735348527116').then((guilds)=> {
                guilds.members.fetch('232949020039839744').then((member) => {
                    member.send(
                        'Salut Shahan,\n' +
                        'tu as été expulsé du serveur **ᒍᔕᑭ-ᴶᵉᵘ ˢᵃᶦˢ ᵖᵃˢ-** suite à ton __inactivité__.\n'+
                        'Si tu souhaites revenir, voici un nouveau lien d\'invitation : https://discord.gg/DUrrD9Sgs3.\n'+
                        'Sache cependant que si tu es à toujours inactif, tu seras de nouveau expulsé après un certain temps.\n');
                })
            });
        }
    }
}
