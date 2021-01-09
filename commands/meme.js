module.exports = {
    name: 'meme',
    description: 'hahahhah funny meme go brrr',
    execute(message, args, client) {
        const randomPuppy = require('random-puppy')
        randomPuppy('memes')
            .then(url => {
                message.channel.send(url);
            })
    },
};