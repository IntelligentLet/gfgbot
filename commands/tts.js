module.exports = {
    name: 'tts',
    description: 'twitch donations long lost brother',
    aliases: ['texttospeech'],
    execute(message, args, client) {
        if (message.member.roles.cache.some(role => role.name === 'Mod')) {
            message.delete();
            var msgtosend = message.content.substring(4, message.content.length);
            message.channel.send(msgtosend, { tts: true} );
        } else {
            message.delete();
            message.channel.send(`${message.member} is sipping dum fuk juice!`);
        }
    },
};