module.exports = {
	name: 'info',
    description: 'flex that ryzen 7',
    aliases: ['information', 'host'],
	execute(message, args, client) {
        const os = require('os')
        const Discord = require('discord.js')
		let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
        let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
        var hostinfo = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Host Info')
            .setDescription('This bot is hosted on')
            .setThumbnail('https://i.imgur.com/rALsa7C.png')
            .addFields(
                { name: 'OS', value: `${os.type()} ${os.release()}` },
                { name: 'CPU', value: `${JSON.stringify(os.cpus()[0].model).toString().slice(1).slice(0, -1)}` },
                { name: 'RAM', value: `${Math.floor((process.memoryUsage().heapUsed / 1024 / 1024))} MB / ${Math.floor((os.totalmem() / 1024 / 1024))} MB` },
                { name: 'Bot Uptime', value: `${uptime}` },
                { name: 'Bot ping', value: `${Date.now() - message.createdTimestamp} ms` },
                { name: 'API Latency', value: `${Math.round(client.ws.ping)} ms`},
                { name: 'Github Repo', value: `https://github.com/IntelligentLet/gfgbot`}
            )
            .setTimestamp()
            .setFooter('Created by LogicGo#7666', 'https://i.imgur.com/iglEZPr.png'); 
            
        message.channel.send(hostinfo);
    },
};

