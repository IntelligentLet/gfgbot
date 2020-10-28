const Discord = require('discord.js');
const fs = require('fs');
const keepAlive = require('./server');
const os = require('os');
const AntiSpam = require('discord-anti-spam');
const ms = require('ms');
var antiSpam = new AntiSpam({
    warnThreshold: 6, 
    kickThreshold: 13, 
    banThreshold: 18,
    maxInterval: 4000,
    maxDuplicatesWarning: 3,
    maxDuplicatesKick: 6,
    maxDuplicatesBan: 13,
    warnMessage: '{@user}, please stop spamming.', 
    kickMessage: '**{user_tag}** has been kicked for spamming.', 
    banMessage: '**{user_tag}** has been banned for spamming.', 
    exemptPermissions: ["ADMINISTRATOR"],
    ignoreBots: true, 
    verbose: true,
});
require('dotenv').config();

const client = new Discord.Client();
keepAlive();

client.once('ready', () => {
    console.log('app ready');
    client.user.setActivity('messages fly by', { type: 'WATCHING' });
});

function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

//commands
client.on('message', message => {
    antiSpam.message(message).catch(console.error);
    if (message.content.startsWith("!purge")) {
        var split = message.content.split(" ");
        if (message.member.roles.cache.some(role => role.name === 'Mod')) {
            if (split[1] <= 20) {
                message.channel.messages.fetch({ limit: split[1] }).then(messages => {
                    message.channel.bulkDelete(messages)});
            } else {
                message.channel.send(`${message.author} dude that's like a lot of messages. Like more than 20.`);
            }
        } else {
            message.channel.send(`${message.member} LOL you thought`); 
        }
        
    }
    if (message.content.startsWith("!ban")) {
        const guild = message.member.guild;

        var split = message.content.split(" ");
        var victim =  message.mentions.users.first();

        if (message.member.roles.cache.some(role => role.name === 'Mod')) {
            if (guild.member(victim) && victim !== client.users.cache.get("766455342644068352")) {
                guild.members.ban(victim);
                message.channel.send(`Banned ${victim} for ${split[2]} days for reason ${split[3]}.`);
            } else {
                message.channel.send(`Eeek! Something went wrong!`);
            }
        } else {
            message.channel.send(`${message.member} LOL you thought`); 
        }
    }
    if (message.content.startsWith("!mute")) {
        const guild = message.member.guild;

        var split = message.content.split(" ");
        var victim =  guild.member(message.mentions.users.first());

        if (message.member.roles.cache.some(role => role.name === 'Mod')) {
            if (guild.member(victim) && victim !== client.users.cache.get("766455342644068352") && victim.roles.cache.some(role => role.name === 'Mod') === false) {
                var reason = message.content.toString().substring((split[0].length + split[1].length), message.content.toString().length);
                var muterole = guild.roles.cache.find(role => role.name === 'Muted');
                victim.roles.add(muterole).catch(console.error);
                message.channel.send(`Muted ${victim} for reason ${reason.substring(2, reason.length)}`);
            } else {
                message.channel.send(`Eeek! Something went wrong!`);
            }
        } else {
            message.channel.send(`${message.member} LOL you thought`); 
        }
    }
    if (message.content.startsWith("!unmute")) {
        const guild = message.member.guild;

        var split = message.content.split(" ");
        var victim =  guild.member(message.mentions.users.first());

        if (message.member.roles.cache.some(role => role.name === 'Mod')) {
            if (guild.member(victim) && victim !== client.users.cache.get("766455342644068352") && victim.roles.cache.some(role => role.name === 'Muted')) {
                let muterole = guild.roles.cache.find(role => role.name === 'Muted');
                victim.roles.remove(muterole).catch(console.error);
                message.channel.send(`Unmuted ${victim}.`);
            } else {
                message.channel.send(`Eeek! Something went wrong!`);
            }
        } else {
            message.channel.send(`${message.member} LOL you thought`); 
        }
    }
    if (message.content.startsWith("!server")) {
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
            .setFooter('Created by Intelligent_Let#7666', 'https://i.imgur.com/iglEZPr.png');
        message.channel.send(serverembed);
    }
    if (message.content.startsWith("!info")) {
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
                { name: 'CPU architecture', value: `${os.arch()}` },
                { name: 'RAM', value: `${bytesToSize(os.totalmem())}` },
                { name: 'Bot Uptime', value: `${uptime}` },
                { name: 'Hostname', value: `${os.hostname()}` },
                { name: 'Bot ping', value: `${Date.now() - message.createdTimestamp} ms` },
                { name: 'API Latency', value: `${Math.round(client.ws.ping)} ms`},
                { name: 'Github Repo', value: `https://github.com/IntelligentLet/gfgbot`}
            )
            .setTimestamp()
            .setFooter('Created by Intelligent_Let#7666', 'https://i.imgur.com/iglEZPr.png'); 
        
        message.channel.send(hostinfo);
    }
    if (message.content.startsWith("!simp")) {
        message.channel.send("SIMP SIMP SIMP SIMP SIMP SIMP SIMP SIMP");
    }
    if (message.content.startsWith("!help")) {
        
        const helpembed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Help Page')
            .setDescription('Vortex cheat sheet')
            .setThumbnail('https://i.imgur.com/rALsa7C.png')
            .addFields(
                { name: 'Mod tools', value: '!help mod' },
                { name: 'Server stats', value: '!help server' },
                { name: 'Bot stats', value: '!help info' },
                { name: 'Simp', value: '!help simp' },
            )
            .setTimestamp()
            .setFooter('Created by Intelligent_Let#7666', 'https://i.imgur.com/iglEZPr.png'); 

        const modembed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Moderation Tools')
            .setDescription('For mods')
            .setThumbnail('https://i.imgur.com/rALsa7C.png')
            .addFields(
                { name: 'Ban', value: '!help ban' },
                { name: 'Mute', value: '!help mute' },
                { name: 'Unmute', value: '!help unmute' },
                { name: 'Purge', value: '!help purge' },
            )
            .setTimestamp()
            .setFooter('Created by Intelligent_Let#7666', 'https://i.imgur.com/iglEZPr.png'); 

        if (message.content === "!help mod") {
            message.channel.send(modembed);
        } else if (message.content === "!help server") {
            message.channel.send("Server stats. ```!server```");
        } else if (message.content === "!help info") {
            message.channel.send("Bot stats. ```!info```");
        } else if (message.content === "!help simp") {
            message.channel.send("Simp! Simp! Simp! ```!simp```");
        } else if (message.content === "!help ban") {
            message.channel.send("Ban. ```!ban <user> <reason>```");
        } else if (message.content === "!help mute") {
            message.channel.send("Mute. ```!mute <user> <reason>```");
        } else if (message.content === "!help unmute") {
            message.channel.send("Unmute. ```!unmute <user>```");
        } else if (message.content === "!help purge") {
            message.channel.send("Removes latest messages. ```!purge <message amount>```");
        } else {
            message.channel.send(helpembed);
        }
    }
    if (message.content.startsWith("!say")) {
        if (message.member.roles.cache.some(role => role.name === 'Mod')) {
            message.delete();
            var msgtosend = message.content.substring(4, message.content.length);
            message.channel.send(msgtosend);
        } else {
            message.delete();
            message.channel.send(`${message.member} is sipping dum fuk juice!`);
        }
    }
    if (message.content.startsWith("!tts")) {
        if (message.member.roles.cache.some(role => role.name === 'Mod')) {
            message.delete();
            var msgtosend = message.content.substring(4, message.content.length);
            message.channel.send(msgtosend, { tts: true} );
        } else {
            message.delete();
            message.channel.send(`${message.member} is sipping dum fuk juice!`);
        }
    }
});

//when someone joins, give roles and welcome them
client.on("guildMemberAdd", (member) => {
    const guild = member.guild;
    member.roles.add(guild.roles.cache.find(role => role.name === 'Gamer'));
    var memberCount = (client.guilds.cache.get(user.guild.id).memberCount);
    const rules = client.channels.cache.get('769958719018237983');
    client.channels.cache.get('766100639826575433').send(`Welcome ${member.user}! You are member #${memberCount}. Please read ${rules} to get started!`);
});

client.login(process.env.TOKEN);