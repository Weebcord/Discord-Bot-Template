const commando = require('discord.js-commando');
const Discord = require('discord.js');
const oneLine = require('common-tags').oneLine;

module.exports = class BanCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'ban',
            aliases: ['mod-baan'],
            group: 'mod',
            memberName: 'ban',
            description: 'Bans the mentioned user',
            details: oneLine `
                Bans the mentioned user
			`,
            examples: ['ban <user> <reason>', 'mod-ban <user> <reason>'],

            args: [{
                    key: 'member',
                    label: 'member',
                    prompt: 'What member would you like to ban?',
                    type: 'member'
                },
                {
                    key: 'reason',
                    label: 'reason',
                    prompt: 'Why do you want to ban this member?',
                    type: 'string'
                }
            ]
        });
    }

    async run(msg, { member, reason }) {
        if(msg.author.bot) return;
        if (!msg.member.hasPermission("BAN_MEMBERS")) {
            msg.channel.send("Error!! You can't Ban Memebrs here.");
            return;
        } else if (member.banable) {
            member.ban(reason)
                .catch(console.error);
     member.send(`You have been banned from **${msg.guild.name}**.\nReason: ${reason}\nModerator: ${msg.member.user.tag}`);
     msg.channel.send(`Successfully banned ${member.user.tag} from this server. Reason: ${reason}.`);
     let log = this.client.provider.get(msg.guild, 'LogChannel', 'Not Set');
    let channel = msg.guild.channels.get(log);
    if(!channel) return;
        
        let embed = Discord.RichEmbed()
        .setTitle('Member Banned')
        .addField('Banned Member', `${member.user.tag} (ID:${member.id})`)
        .addField('Reason', `${reason}`)
        .addField('Moderator', `${msg.member.user.tag} (ID:${msg.member.id})`)
        .setTimestamp()
        .setColor('RED');
       
        channel.send(embed)
    } else {
            msg.channel.send(`Error! I was unable to ban ${member.user.tag}, this maybe due them having a higher role.`);
        }
    }
};
