module.exports = {
    name: 'ban',
    description: 'the ban hammer has struck!',
    aliases: ['blacklist'],
    execute(message, args, client) {
        const Discord = require('discord.js')
        var victim = message.member.guild.member(message.mentions.users.first());
        if (message.member.roles.cache.some(role => role.name === 'Mod')) {
            if (message.member.guild.member(victim) && victim.roles.cache.some(role => role.name === 'Mod') === false) {
                args.shift();
                var reason = args.join(' ');
                message.member.guild.members.ban(victim);
                message.channel.send(`Banned ${victim} for reason ${reason}`);
            } else {
                message.channel.send(`Eeek! Something went wrong!`);
            }
        } else {
            message.channel.send(`${message.member} LOL you thought`); 
        }
            
    },
};