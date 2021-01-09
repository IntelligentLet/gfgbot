module.exports = {
    name: 'help',
    description: 'never fear, vortex is here!!!!!',
    execute(message, args, client) {
        const Discord = require('discord.js');
        const helpembed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Help Page')
            .setDescription('Vortex cheat sheet')
            .setThumbnail('https://i.imgur.com/rALsa7C.png')
            .addFields(
                { name: 'Mod tools', value: '!help mod' },
                { name: 'Server stats', value: '!help server' },
                { name: 'Bot stats', value: '!help info' },
                { name: 'Fun', value: '!help fun' }
            )
            .setTimestamp()
            .setFooter('Created by Logicgo#7666', 'https://i.imgur.com/iglEZPr.png'); 

        const funcommands = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Fun commands!')
            .setDescription('Cool commands to play around with')
            .setThumbnail('https://i.imgur.com/rALsa7C.png')
            .addFields(
                { name: 'sha256', value: '!sha256 <string>' },
                { name: 'sha512', value: '!sha512 <string>' },
                { name: 'md5', value: '!md5 <string>' },
                { name: 'puppy', value: '!puppy' },
                { name: 'meme', value: '!meme' },
                { name: 'linux meme', value: '!lmeme' },
                { name: 'programming meme', value: '!pmeme' },
                { name: 'S I M P', value: '!simp' },
                { name: 'Coin flip', value: '!coin'},
                { name: 'Math', value: '!math <string>'},
                { name: 'Crypto', value: '!crypto <btc, eth, ltc, xmr, doge>'},
                { name: 'Weather', value: '!weather <city> <country>'}
            )
            .setTimestamp()
            .setFooter('Created by LogicGo#7666', 'https://i.imgur.com/iglEZPr.png');

        const modembed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Moderation Tools')
            .setDescription('For mods')
            .setThumbnail('https://i.imgur.com/rALsa7C.png')
            .addFields(
                { name: 'Ban', value: '!ban <user>' },
                { name: 'Mute', value: '!mute <user>' },
                { name: 'Unmute', value: '!unmute <user>' },
                { name: 'Purge', value: '!purge <message amount>' },
            )
            .setTimestamp()
            .setFooter('Created by LogicGo#7666', 'https://i.imgur.com/iglEZPr.png'); 
        
        if (message.content === "!help mod") {
            message.channel.send(modembed);
        } else if (message.content === "!help fun") {
            message.channel.send(funcommands);
        } else if (message.content === "!help server") {
            message.channel.send("Server stats. ```!server```");
        } else if (message.content === "!help info") {
            message.channel.send("Bot stats. ```!info```");
        } else {
            message.channel.send(helpembed);
        }
    },
};
