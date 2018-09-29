const Discord = require("discord.js");
const db = require('quick.db');

module.exports.run = async (client, message, args) => {
if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("You need permission `KICK_MEMBERS` to use this command!");
let member = message.mentions.users.first();
if (!member) return message.reply("Please mention the user you want to kick!");
let reason = args.slice(1).join(" ");
if (!reason.length < 1) return message.reply("You need to specify a reason for the kick!");
if (member.kickable) {
            member.kick(reason)
                .catch(console.error);
     member.send(`You have been kicked from **${message.guild.name}**.\nReason: ${reason}\nModerator: ${message.member.user.tag}`);
     message.channel.send(`Successfully kicked ${member.user.tag} from this server. Reason: ${reason}.`);
let log = await db.fetch(`LogChannel_${message.guild.id}`);
let channel = message.guild.channels.get(log);
if(!channel) return;

const embed = new Discord.RichEmbed()
 .setTitle('Member Kicked')
        .addField('Kicked Member', `${member.tag} (ID:${member.id})`)
        .addField('Reason', `${reason}`)
        .addField('Moderator', `${message.member.user.tag} (ID:${message.member.id})`)
        .setTimestamp()
        .setColor('RED');

 channel.send(embed)
} else {
  message.channel.send(`Error! I was unable to kick ${member.user.tag}, this maybe due them having a higher role.`);
}
}

module.exports.help = {
name: "kick",
group: 'mod'
}
