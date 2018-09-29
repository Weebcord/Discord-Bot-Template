const Discord = require("discord.js");
const db = require('quick.db');

module.exports.run = async (client, message, args) => {
if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("You need permission `KICK_MEMBERS` to use this command!");
let channel = args.join(" ");
if (!channel.length < 1) return message.reply("You need to specify a channel to set as the mod log!");
if(channel == 'disable') {
await db.set(`LogChannel_${message.guild.id}`, 'Not Set');
return message.channel.send(`Successfully disabled logging on **${message.guild.name}**`);
} else {
if(channel.startsWith('<#')) {
channel = channel.replace('<#', '').replace('>', '');
let ch = message.guild.channels.get(channel);
if(!ch) return message.reply('Error! Unable to find channel.');
} else {
let ch = message.guild.channels.get(channel);
if(!ch) {
ch = message.guild.channels.find(c => c.name === channel);
if(!ch) return message.reply('Error! Unable to find channel.'); 
}
}
await db.set(`LogChannel_${message.guild.id}`, ch.id);
message.channel.send('Successfully set logging channel to ${ch}');
}
}

module.exports.help = {
name: "setmodlog",
group: "config",
description: "Set's the moderation log for the server."
}
