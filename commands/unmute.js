module.exports = {
    name: 'unmute',
    description: 'ok yeah being winnie the pooh isnt awesome all the time',
    execute(message, args, client) {
        const Discord = require('discord.js')
        var victim = message.member.guild.member(message.mentions.users.first());

        if (message.member.roles.cache.some(role => role.name === 'Mod')) {
            if (message.member.guild.member(victim) && victim.roles.cache.some(role => role.name === 'Muted')) {
                let muterole = message.member.guild.roles.cache.find(role => role.name === 'Muted');
                victim.roles.remove(muterole).catch(console.error);
                message.channel.send(`Unmuted ${victim}.`);
            } else {
                message.channel.send(`Eeek! Something went wrong!`);
            }
        } else {
            message.channel.send(`${message.member} LOL you thought`); 
        }
    },
};