const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const Discord = require('discord.js');

module.exports = class MuteCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'mute',
            aliases: ['m'],
            group: 'mod',
            memberName: 'mute',
            description: "Mute's the mentioned user.",
            details: oneLine `
            Mute's the mentioned user.
			`,
            examples: ['mute <user> <reason>'],
            args: [{
                key: 'member',
                label: 'member',
                prompt: 'What member would you like to mute?',
                type: 'member'
            },
            {
                key: 'reason',
                label: 'reason',
                prompt: 'Why do you want to mute this member?',
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
        let muterole = msg.guild.roles.find(r => r.name === "Muted");
        
        if(!muterole){
            msg.channel.send("Error!! Please create a Muted role.");
            return;
        }

       member.addRole(muterole)
        .catch(console.error);
        
        member.send('You have been muted in **${msg.guild.name}**.\nReason: ${reason}\nModerator: ${msg.member.user.tag}')
        msg.channel.send(`Successfully muted ${member}. Reason: ${reason}.`);
       let log = this.client.provider.get(msg.guild, 'LogChannel', 'Not Set')
    let channel = msg.guild.channels.get(log);
    if(!channel) return;
    
   let embed = new Discord.RichEmbed()
   .setTitle('Member Muted')
   .addField('Muted Member', `${member.user.tag} (ID:${member.id})`)
   .addField('Reason', `${reason}`)
   .addField('Moderator', `${msg.member.user.tag} (ID:${msg.member.id})`)
   .setTimestamp()
   .setColor('RED');
   
   channel.send(embed)
    }
};
