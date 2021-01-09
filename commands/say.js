module.exports = {
    name: 'say',
    description: 'the king has spoken',
    execute(message, args, client) {
        if (message.member.roles.cache.some(role => role.name === 'Mod')) {
            message.delete();
            var msgtosend = message.content.substring(4, message.content.length);
            message.channel.send(msgtosend);
        } else {
            message.delete();
            message.channel.send(`${message.member} LOL you thought`);
        }
    },
};