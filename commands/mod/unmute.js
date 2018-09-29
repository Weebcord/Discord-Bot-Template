const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const Discord = require('discord.js');

module.exports = class UnmuteCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'unmute',
            aliases: ['mod-unmute'],
            group: 'mod',
            memberName: 'unmute',
            description: "Unmute's mentioned user.",
            details: oneLine `
            Unmute's mentioned user.
			`,
            examples: ['unmute <user> <reason>', 'mod-unmute <user> <reason>'],
            args: [{
                key: 'member',
                label: 'member',
                prompt: 'What member would you like to unmute?',
                type: 'member'
            },
            {
                key: 'reason',
                label: 'reason',
                prompt: 'Why do you want to unmute this member?',
                type: 'string'
            }
        ]
    });
}

    async run(msg, { member, reason }) {
        if(msg.author.bot) return;
        if(!msg.member.hasPermission("MANAGE_MESSAGES")) {
            msg.channel.send("Error!! You don't have the Manage Messages permission!!");
            return;
        }
        let muterole = member.roles.has('Muted');
        if(!muterole){
            msg.channel.send(`${member.user.tag} doesn't have a Muted role.`);
            return;
        }

       member.removeRole(muterole)
        .catch(console.error);
        
        msg.channel.send(`Successfully unmuted ${member}.Reason: ${reason}.`);
       let log = this.client.provider.get(msg.guild, 'LogChannel', 'Not Set');
    let channel = msg.guild.channels.get(log);
    if(!channel) return;
        
        let embed = new Discord.RichEmbed()
        .setTitle('Member Unmuted')
        .addField('Unmuted Member', `${member.user.tag} (ID:${member.id})`)
        .addField('Reason', `${reason}`)
        .addField('Moderator', `${msg.member.user.tag} (ID:${msg.member.id})`)
        .setTimestamp()
        .setColor('GREEN');
        
        channel.send(embed);
    }
};
