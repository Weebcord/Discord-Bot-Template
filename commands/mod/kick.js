const commando = require('discord.js-commando');
const Discord = requie('discord.js');
const oneLine = require('common-tags').oneLine;

module.exports = class KickCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'kick',
            aliases: ['mod-kick', 'k'],
            group: 'mod',
            memberName: 'kick',
            description: 'Kicks the mentioned user',
            details: oneLine `
                Kicks the mentioned user
			`,
            examples: ['kick <user> <reason>', 'k <user> <reason>'],

            args: [{
                    key: 'member',
                    label: 'member',
                    prompt: 'What member would you like to kick?',
                    type: 'member'
                },
                {
                    key: 'reason',
                    label: 'reason',
                    prompt: 'Why do you want to kick this member?',
                    type: 'string'
                }
            ]
        });
    }

    async run(msg, { member, reason }) {
        if(msg.author.bot) return;
        if (!msg.member.hasPermission("KICK_MEMBERS")) {
            msg.channel.send("Error!! You can't Kick Memebrs here.");
            return;
        } else if (member.kickable) {
            member.kick(reason)
                .catch(console.error);
     member.send(`You have been kicked from **${msg.guild.name}**.\nReason: ${reason}\nModerator: ${msg.member.user.tag}`);
     msg.channel.send(`Successfully kicked ${member.user.tag} from this server. Reason: ${reason}.`);
     let log = this.client.provider.get(msg.guild, 'LogChannel', 'Not Set');
    let channel = msg.guild.channels.get(log);
    if(!channel) return;
        
        let embed = Discord.RichEmbed()
        .setTitle('Member Kicked')
        .addField('Kicked Member', `${member.user.tag} (ID:${member.id})`)
        .addField('Reason', `${reason}`)
        .addField('Moderator', `${msg.member.user.tag} (ID:${msg.member.id})`)
        .setTimestamp()
        .setColor('RED');
       
        channel.send(embed)
    } else {
            msg.channel.send(`Error! I was unable to kick ${member.user.tag}, this maybe due them having a higher role.`);
        }
    }
};
