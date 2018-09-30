const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const Discord = require('discord.js');
const db = require('quick.db');

module.exports = class SetModLogCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'setmodch',
            aliases: ['setlogchannel', 'setlogch'],
            group: 'config',
            memberName: 'setlogch',
            description: "Sets the log channel for the server",
      
            details: oneLine `
            Sets the log channel for the server.
			`,
            examples: ['setlogch <channel>', 'setlogch disable'],
            args: [
				{
					key: 'channel',
					prompt: 'Which channel would you like to set as the logging channel?',
					type: 'string',
				}
			]
    });
}

    async run(msg, { channel }) {
        if(msg.author.bot) return;
        if(!msg.member.hasPermission("MANAGE_GUILD")) {
            msg.channel.send("Error!! You don't have the Manage Server permission!!");
            return;
        }
     let log = this.client.provider.get(msg.guild, 'LogChannel', 'Not Set')
       if(channel == 'disable') {
         log = 'Not Set';
        this.client.provider.set(msg.guild, 'LogChannel', log)
          msg.channel.send(`Successfully disabled welcome log on **${msg.guild.name}**`);
      } else {
        let ch;
    if(channel.startsWith('<#')) {
channel = channel.replace('<#', '').replace('>', '');
ch = msg.guild.channels.get(channel);
if(!ch) return msg.reply('Error! Unable to find channel.');
} else {
ch = msg.guild.channels.get(channel);
if(!ch) {
ch = msg.guild.channels.find(c => c.name === channel);
if(!ch) return msg.reply('Error! Unable to find channel.'); 
}
}
        log = ch.id;
this.client.provider.set(msg.guild, 'LogChannel', log)
        msg.channel.send(`Successfully set Join log to ${ch}`);
      }
    }
}
