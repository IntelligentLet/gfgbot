const Discord = require('discord.js');
const fs = require('fs');
const keepAlive = require('./server');
const os = require('os');
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
 

function writeBan(name, time, reason) {
    var data = {
        name: name,
        time: time,
        reason: reason
    }
    fs.writeFileSync('bans.json', data);
}


//commands
client.on('message', message => {
    //bans
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
            message.channel.send(`${message.member} you don't seem to be a moderator.`); 
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
                { name: 'Ban', value: '!help ban' },
                { name: 'Server stats', value: '!help server' },
                { name: 'Bot stats', value: '!help info' },
                { name: 'Simp', value: '!help simp' },
            )
            .setTimestamp()
            .setFooter('Created by Intelligent_Let#7666', 'https://i.imgur.com/iglEZPr.png'); 

        if (message.content === "!help ban") {

            message.channel.send("Mod only: Ban command. ```!ban <user> <time> <reason>```");

        } else if (message.content === "!help server") {

            message.channel.send("Server stats. ```!server```");

        } else if (message.content === "!help info") {
            
            message.channel.send("Bot stats. ```!info```");

        } else if (message.content === "!help simp") {
            
            message.channel.send("Simp! Simp! Simp! ```!simp```");

        } else {
            message.channel.send(helpembed);
        }
    }
});

//when someone joins, give roles and welcome them
client.on("guildMemberAdd", (member) => {
    const guild = member.guild;
    const rules = client.channels.cache.get('766386424567693343');
    var memberCount = (client.guilds.cache.get(guild.id).memberCount);
    client.channels.cache.get('766100639826575433').send(`Welcome ${member.user}! You are member #${memberCount}. Please read ${rules} to get started!`);
    const role = guild.roles.cache.find(role => role.name === 'Gamer');
    member.roles.add(role);
}); 

client.login(process.env.TOKEN);