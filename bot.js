/*
Imports
*/

const Discord = require("discord.js");
const commando = require('discord.js-commando');
const path = require('path');
const sqlite = require('sqlite');

/*
Client
*/

const client = new commando.CommandoClient({
    owner: ['Owner ID'],
    commandPrefix: 'Bot Prefix',
    unknownCommandResponse: false,
    selfbot: false,
    commandEditableDuration: 60
});

module.exports = client;

/*
Events & Other Files
*/

require('Discrord-Bot-Template/events/commando.js');
require('Discord-Bot-Template/events/logging.js');

/*
Settings Provider
*/

sqlite.open(path.join(__dirname, "settings.sqlite")).then((db) => {
    client.setProvider(new commando.SQLiteProvider(db));
});

/*
Command Registry
*/

 client.registry
    .registerGroups([
    ['mod', 'Moderation'],
    ['utility', 'Utility'],
    ['commands', 'Owner/Administration']
    ])
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.login(process.env.TOKEN);
