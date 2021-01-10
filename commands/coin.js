module.exports = {
    name: 'coin',
    description: 'heads or tails?!',
    aliases: ['coinflip'],
    execute(message, args, client) {
        var options = ['Heads', 'Tails'];
        message.channel.send(`🪙 ${options[Math.floor(Math.random() * options.length)]}!`);
    },
};
