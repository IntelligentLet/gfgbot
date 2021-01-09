const Discord = require('discord.js');
const AntiSpam = require('discord-anti-spam');
const fs = require('fs');
const express = require('express');

const server = express();
require('dotenv').config();

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
const prefix = '!';

server.listen(process.env.PORT || 5000);

const client = new Discord.Client();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();


const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('app ready');
    client.user.setActivity('messages fly by', { type: 'WATCHING' });
});

client.on('message', message => {
	const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;
    if (message.author.bot) return;
    if (message.guild === null) return;

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }
    
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;
    
    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

	    if (now < expirationTime) {
	    	const timeLeft = (expirationTime - now) / 1000;
	    	return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
	    }
    }
    
    try {
    	client.commands.get(command).execute(message, args, client);
    } catch (error) {
    	console.error(error);
    	message.reply('there was an error trying to execute that command!');
    }

    antiSpam.message(message).catch(console.error);

    if (message.content.includes("grabify.link") ||
        message.content.includes("lovebird.guru") ||
        message.content.includes("trulove.guru") ||
        message.content.includes("dateing.club") ||
        message.content.includes("otherhalf.life") ||
        message.content.includes("shrekis.life") ||
        message.content.includes("datasig.io") ||
        message.content.includes("datauth.io") ||
        message.content.includes("headshot.monster") ||
        message.content.includes("gaming-at-my.best") ||
        message.content.includes("progaming.monster") ||
        message.content.includes("yourmy.monster") ||
        message.content.includes("screenshare.host") ||
        message.content.includes("imageshare.best") ||
        message.content.includes("screenshot.best") ||
        message.content.includes("gamingfun.me") ||
        message.content.includes("catsnthing.com") ||
        message.content.includes("mypic.icu") ||
        message.content.includes("catsnthings.fun") ||
        message.content.includes("curiouscat.club") ||
        message.content.includes("joinmy.site") ||
        message.content.includes("fortnitechat.site") ||
        message.content.includes("fortnight.space") ||
        message.content.includes("freegiftcards.co") ||
        message.content.includes("stopify.co") ||
        message.content.includes("leancoding.co")
    ) {
        message.delete();
        message.channel.send(`No grabify links please ${message.author}`);
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

client.login(process.env.DISCORD);