module.exports = {
    name: 'server',
    description: 'DAMN SON 90 PEOPLE??? HOLY $#!%',
    execute(message, args, client) {
        const Discord = require('discord.js')
        const thisguild = message.member.guild;
        var memberCount = (client.guilds.cache.get(thisguild.id).memberCount);
        var vchannels = message.guild.channels.cache.filter(c => c.type === 'voice').size;
        var tchannels = message.guild.channels.cache.filter(c => c.type === 'text').size;
        var guilddays = (((new Date()).getTime()) - ((client.guilds.cache.get(thisguild.id).createdAt).getTime())) / (1000 * 3600 * 24);
        var serverembed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Server Stats')
            .setDescription('Powered by Vortex#2957')
            .setThumbnail('https://i.imgur.com/rALsa7C.png')
            .addFields(
                { name: 'Server Name', value:'Good Fight Gaming' },
                { name: 'Server members', value: `${memberCount}` },
                { name: 'Total Channels', value: `${vchannels + tchannels}` },
                { name: 'Voice Channels', value: `${vchannels}` },
                { name: 'Text Channels', value: `${tchannels}` },
                { name: 'Created', value: `${Math.round(guilddays)} days ago` },
            )
            .setTimestamp()
            .setFooter('Created by LogicGo#7666', 'https://i.imgur.com/iglEZPr.png');
        message.channel.send(serverembed);
    },
};
