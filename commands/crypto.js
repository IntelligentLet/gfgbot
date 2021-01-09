module.exports = {
    name: 'crypto',
    description: 'track the price of crypto currency',
    cooldown: 5,
    execute(message, args, client) {
        const Discord = require('discord.js')
        const axios = require('axios');
        const coins = ['monero', 'bitcoin', 'litecoin', 'ethereum', 'dogecoin'];
        const alt = ['xmr', 'btc', 'ltc', 'eth', 'doge'];

        if (alt.includes(args[0])) {
            args[0] = coins[alt.indexOf(args[0])];
        }

        if (!coins.includes(args[0])) {
            message.channel.send(`${message.author} try a supported coin!`);
            return
        }

        if (args.length < 2) {
            args.push('usd');
        }

        axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${args[0].toString()}&vs_currencies=${args[1].toString()}`)
            .then(res => {
                var cryptoprice = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(`Price of ${args[0]} in ${args[1].toUpperCase()}`)
                    .setDescription(`${res.data[args[0]][args[1]]} ${args[1].toUpperCase()}`)
                    .attachFiles([`assets/${args[0]}.png`])
                    .setThumbnail(`attachment://${args[0]}.png`)
                    .setTimestamp()
                    .setFooter('Created by LogicGo#7666', 'https://i.imgur.com/iglEZPr.png');
                
                message.channel.send(cryptoprice)
            })
            .catch(res => {
                message.channel.send(`${message.author} there was an API error!`)
            });
    },
};