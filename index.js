const {Intents} = require("discord.js");

const config = require('./config.json');

const Discord = require("discord.js");

const client = new Discord.Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS]
});

client.on('ready', () => {
    client.guilds.fetch('777327735348527116').then((guilds)=> {
        guilds.members.fetch().then((members) => {
            // Contient la liste de tout les utilisateurs du serveur.
            const allUsers = [];
            const allUsersResponded = [];
            members.filter(member => member.user.bot === false).forEach((member) => {
                allUsers.push(member.user);
            })
            // On fetch le channel
            client.channels.fetch('802229980867199026').then((channel) => {
                // On fetch le message
                channel.messages.fetch('996336354348777552').then((message) => {
                    message.reactions.cache.forEach(async(reaction) => {
                        // Liste des utilisateurs ayant répondus avec l'icone '✋'
                        if (reaction._emoji.name === '✋') {
                            reaction.users.fetch().then(function (users) {
                                // La liste de tout les utilisateur ayant répondu.
                                users.forEach((member) => {
                                    allUsersResponded.push(member);
                                })
                                const utilisateurPurger = allUsers.filter(f => !allUsersResponded.includes(f));
                                console.log('Utilisateur à purger');
                                console.log(utilisateurPurger);
                            });
                        }
                    });
                })
            })
        });
    });
});

client.login(config.token);
