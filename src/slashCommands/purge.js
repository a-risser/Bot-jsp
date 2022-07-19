module.exports = {
    name: 'purge',
    description: 'Commande envoyant un DM pour la purge.',
    usage: '<prefix>purge [userIdentifiant] [expulsion]',
    examples: ['purge userIdentifiant:id expulsion:true'],
    options: [
        {
            name: 'user-identifiant',
            description: "Définir le user à qui envoyer le MP",
            type: 3,
            required: true
        },
        {
            name: 'expulsion',
            description: "S'il faut expulser l'utilisateur ou non",
            type: 5,
            required: true
        },
    ],
    permissions: [
        {
            id: '777328480584859658',
            type: 1,
            permission: true
        }
    ],

    run :async (client, interaction) => {
        // On récupère le serveur
        client.guilds.fetch('777327735348527116').then((guilds)=> {
            // On vérifie que l'utilisateur est admin
            // guilds.members.fetch(interaction.member.user.id).then((guildMember) => {
            //     if(guildMember._roles.includes('777328480584859658')) {
                    guilds.members.fetch(interaction.options.getString('user-identifiant')).then((memberToExclude) => {
                        const expulsion = interaction.options.getBoolean('expulsion');
                        if (expulsion) {
                            memberToExclude.send("Salut,\n" +
                                "Tu as été expulsé du serveur **ᒍᔕᑭ-ᴶᵉᵘ ˢᵃᶦˢ ᵖᵃˢ-** suite à ton __inactivité__.\n" +
                                "Si tu souhaites revenir, voici un nouveau lien d'invitation : https://discord.gg/DUrrD9Sgs3.\n" +
                                "Sache cependant que si tu es à toujours inactif, tu seras de nouveau expulsé après un certain temps."
                            );
                            memberToExclude.kick();
                        } else {
                            memberToExclude.send(
                                "Salut,\n" +
                                "La purge sur ᒍᔕᑭ-ᴶᵉᵘ ˢᵃᶦˢ ᵖᵃˢ- est terminée, et tu y as survécu grâce à ta réaction au message l'annonçant.\n" +
                                "Cependant, on continue de vouloir avoir des membres actifs, et si tu reçois ce message c'est que tu ne l'es pas.\n" +
                                "Ce message est donc là pour te prévenir que si tu n'es pas actif·ve d'ici la prochaine purge, la réaction à l'annonce ne te sauvera pas."
                            );
                        }
                    });
                // } else {
                //     console.log('L\'utilisateur ' + interaction.member.user +' a tenté de lancer la commande');
                // }
            // });
        });
    }
}
