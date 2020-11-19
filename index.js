const Discord = require('discord.js');
const fs = require('fs');
const keepAlive = require('./server');
const os = require('os');
const AntiSpam = require('discord-anti-spam');
const ms = require('ms');
const crypto = require('crypto');
const randomPuppy = require('random-puppy');
const { SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG } = require('constants');
var antiSpam = new AntiSpam({
    warnThreshold: 8, 
    kickThreshold: 15, 
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
            } else if (split[1] > 20) {
                message.channel.send(`${message.author} dude that's like a lot of messages. Like more than 20.`);
            } else {
                message.channel.send("Eeek! Something went wrong!")
            }
        } else {
            message.channel.send(`${message.member} LOL you thought`); 
        }
        
    }
    if (message.content.startsWith("!ban")) {
        const guild = message.member.guild;

        var split = message.content.split(" ");
        var victim =  guild.member(message.mentions.users.first());

        if (message.member.roles.cache.some(role => role.name === 'Mod')) {
            if (guild.member(victim) && victim !== client.users.cache.get("766455342644068352") && victim.roles.cache.some(role => role.name === 'Mod') === false) {
                var reason = message.content.toString().substring((split[0].length + split[1].length), message.content.toString().length);
                guild.members.ban(victim);
                message.channel.send(`Banned ${victim} for reason ${reason.substring(2, reason.length)}`);
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
                { name: 'Fun', value: '!help fun' }
            )
            .setTimestamp()
            .setFooter('Created by Intelligent_Let#7666', 'https://i.imgur.com/iglEZPr.png'); 

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
                { name: 'S I M P', value: '!simp' }
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
    // ok fun commands here
    if (message.content.startsWith("!sha256")) {
        var hash = (args) => {
            return crypto.createHash('sha256').update(args).digest('hex');
        }
        message.channel.send(hash(message.content.substring(8, message.content.length)));
    }
    if (message.content.startsWith("!md5")) {
        var hash = (args) => {
            return crypto.createHash('md5').update(args).digest('hex');
        }
        message.channel.send(hash(message.content.substring(5, message.content.length)));
    }
    if (message.content.startsWith("!sha512")) {
        var hash = (args) => {
            return crypto.createHash('sha512').update(args).digest('hex');
        }
        message.channel.send(hash(message.content.substring(8, message.content.length)));
    }
    if (message.content === '!puppy') {
        randomPuppy()
            .then(url => {
                message.channel.send(url);
            })
    }
    if (message.content === '!meme') {
        randomPuppy('memes')
            .then(url => {
                message.channel.send(url);
            })
    }
    if (message.content === '!lmeme') {
        randomPuppy('linuxmemes')
            .then(url => {
                message.channel.send(url);
            })
    }
    if (message.content === '!pmeme') {
        randomPuppy('programmerhumor')
            .then(url => {
                message.channel.send(url);
            })
    }
});

//when someone joins, give roles and welcome them
client.on("guildMemberAdd", (member) => {
    const rules = client.channels.cache.get('766386424567693343');
    var memberCount = (client.guilds.cache.get(member.guild.id).memberCount);
    client.channels.cache.get('766100639826575433').send(`Welcome ${member.user}! You are member #${memberCount}. Please read ${rules} to get started!`).catch(console.error);
    const role = member.guild.roles.cache.find(role => role.name === 'Gamer');
    member.roles.add(role);
}); 

client.login(process.env.TOKEN);