module.exports = {
    name: 'sha512',
    description: 'de8a1ae98bb79184e49d0924b629c324c28c1829ae6952efda06d5971e64cd1faebb8f3ec0147767aeda7448f80ac648f8929d7bf995dc452191517b70a2acc6',
    execute(message, args, client) {
        const crypto = require('crypto')
        var hash = (args) => {
            return crypto.createHash('sha512').update(args).digest('hex');
        }
        message.channel.send(hash(message.content.substring(8, message.content.length)));
    },
};