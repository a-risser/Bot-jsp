const {Intents} = require("discord.js");

const config = require('./config.json');

const Discord = require("discord.js");

const client = new Discord.Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS]
});

client.on('ready', () => {
    client.users.fetch('232941232748232716').then((user) => {
        console.log(user);
    });
});

client.login(config.token);
console.log ('test');
