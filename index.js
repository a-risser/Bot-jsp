const {Intents} = require("discord.js");

const config = require('./config.json');

const Discord = require("discord.js");

const client = new Discord.Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS]
});

client.on('ready', () => {
    // Delete les messages du channel CMD
    // client.guilds.fetch('777327735348527116').then((guilds)=> {
    //     guilds.channels.fetch('986383828723568660').then((channel) => {
    //         channel.messages.fetch({limit: 100}).then((msgs) => {
    //             const msgNotPinned = msgs.filter(m => !m.pinned);
    //             msgNotPinned.forEach(msg => msg.delete());
    //         })
    //     })
    // });
    // client.guilds.fetch('777327735348527116').then((guilds)=> {
    //     guilds.members.fetch('232949020039839744').then((member) => {
    //        console.log(member.voice);
    //     })
    // });
    // client.guilds.fetch('777327735348527116').then((guilds)=> {
    //     guilds.members.fetch('232949020039839744').then((member) => {
    //         member.send(
    //         'Salut Shahan,\n' +
    //         'tu as été expulsé du serveur **ᒍᔕᑭ-ᴶᵉᵘ ˢᵃᶦˢ ᵖᵃˢ-** suite à ton __inactivité__.\n'+
    //         'Si tu souhaites revenir, voici un nouveau lien d\'invitation : https://discord.gg/DUrrD9Sgs3.\n'+
    //         'Sache cependant que si tu es à toujours inactif, tu seras de nouveau expulsé après un certain temps.\n');
    //     })
    // });


    // client.guilds.fetch('777327735348527116').then((guilds)=> {
    //     guilds.members.fetch().then((members) => {
    //         // Contient la liste de tout les utilisateurs du serveur.
    //         const allUsers = [];
    //         const allUsersResponded = [];
    //         members.filter(member => member.user.bot === false).forEach((member) => {
    //             allUsers.push(member.user);
    //         })
    //         // On fetch le channel
    //         client.channels.fetch('802229980867199026').then((channel) => {
    //             // On fetch le message
    //             channel.messages.fetch('996336354348777552').then((message) => {
    //                 message.reactions.cache.forEach(async(reaction) => {
    //                     // Liste des utilisateurs ayant répondus avec l'icone '✋'
    //                     if (reaction._emoji.name === '✋') {
    //                         reaction.users.fetch().then(function (users) {
    //                             // La liste de tout les utilisateur ayant répondu.
    //                             users.forEach((member) => {
    //                                 allUsersResponded.push(member);
    //                             })
    //                             const utilisateurPurger = allUsers.filter(f => !allUsersResponded.includes(f));
    //                             console.log('Utilisateur à purger');
    //                             utilisateurPurger.forEach(u => {
    //                                 guilds.members.fetch(u.id).then((member) => {
    //                                     console.log(member.user.username);
    //                                     console.log(member);
    //                                 });
    //                             })
    //                         });
    //                     }
    //                 });
    //             })
    //         })
    //     });
    // });
});

client.login(config.token);
