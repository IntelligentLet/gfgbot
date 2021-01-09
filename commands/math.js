module.exports = {
    name: 'math',
    description: 'vortex has become the ultimate swiss army knife',
    execute(message, args, client) {
        try {
            message.channel.send(eval(message.content.substring(5, message.content.length)));
        }
        catch {
            message.channel.send("Eeek! Something went wrong!")
        }
    },
};
