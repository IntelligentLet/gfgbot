module.exports = {
    name: 'basilisk',
    description: 'for my friend dean',
    execute(message, args, client) {
        function genrnd(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        if (genrnd(1, 8) === 3) {
            message.channel.send("❤️ https://discord.gg/zDc8yCH79k")
        } else {
            message.channel.send("❤️");
        }
    },
};
