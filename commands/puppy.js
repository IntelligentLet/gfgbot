module.exports = {
    name: 'puppy',
    description: 'pupper go brr',
    execute(message, args, client) {
        const randomPuppy = require('random-puppy');
        randomPuppy()
            .then(url => {
                message.channel.send(url);
        })
    },
};

