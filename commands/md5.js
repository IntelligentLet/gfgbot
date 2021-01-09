module.exports = {
    name: 'md5',
    description: '59ce3e4c7316f6888c9a6608c492312d',
    execute(message, args, client) {
        const crypto = require('crypto')
        var hash = (args) => {
            return crypto.createHash('md5').update(args).digest('hex');
        }
        message.channel.send(hash(message.content.substring(5, message.content.length)));
    },
};
