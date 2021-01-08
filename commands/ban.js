module.exports = {
    name: 'ban',
    description: 'the ban hammer has struck!',
    execute(message, args, client) {
        const Discord = require('discord.js')
        var victim = message.member.guild.member(message.mentions.users.first());
        if (message.member.roles.cache.some(role => role.name === 'Mod')) {
            if (message.member.guild.member(victim) && victim.roles.cache.some(role => role.name === 'Mod') === false) {
                var reason = message.content.toString().substring((args[0].length + args[1].length), message.content.toString().length);
                message.member.guild.members.ban(victim);
                message.channel.send(`Banned ${victim} for reason ${reason.substring(2, reason.length)}`);
            } else {
                message.channel.send(`Eeek! Something went wrong!`);
            }
        } else {
            message.channel.send(`${message.member} LOL you thought`); 
        }
            
    },
};

            
            