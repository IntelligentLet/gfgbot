module.exports = {
	name: 'purge',
    description: 'delete messages',
    aliases: ['delete'],
	execute(message, args, client) {
        const Discord = require('discord.js');
        if (message.member.roles.cache.some(role => role.name === 'Mod')) {
            if (args[0] <= 20) {
                message.channel.messages.fetch({ limit: args[1] }).then(messages => {
                    message.channel.bulkDelete(messages)});
            } else if (args[0] > 20) {
                message.channel.send(`${message.author} dude that's like a lot of messages. Like more than 20.`);
            } else {
                message.channel.send("Eeek! Something went wrong!")
            }
        } else {
            message.channel.send(`${message.member} LOL you thought`); 
        }
    },
};
