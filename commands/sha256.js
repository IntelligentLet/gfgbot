module.exports = {
    name: 'sha256',
    description: 'f945b2ab268c821dbe480f3951884da51a27440059fbfc845a42366cbc459ccd',
    execute(message, args, client) {
        const crypto = require('crypto')
        var hash = (args) => {
            return crypto.createHash('sha256').update(args).digest('hex');
        }
        message.channel.send(hash(message.content.substring(8, message.content.length)));
    },
};
