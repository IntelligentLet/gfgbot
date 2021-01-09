module.exports = {
    name: 'lmeme',
    description: 'arch > debian change my mind.',
    execute(message, args, client) {
        const randomPuppy = require('random-puppy')
        randomPuppy('linuxmemes')
            .then(url => {
                message.channel.send(url);
            })
    },
};