const Discord = require('discord.js');
const AntiSpam = require('discord-anti-spam');
const crypto = require('crypto');
const randomPuppy = require('random-puppy');
const fs = require('fs');
const keepAlive = require('./server');
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
const prefix = '!';

keepAlive();
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}


client.once('ready', () => {
    console.log('app ready');
    client.user.setActivity('messages fly by', { type: 'WATCHING' });
});

//commands

client.on('message', message => {
	const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

    try {
    	client.commands.get(command).execute(message, args, client);
    } catch (error) {
    	console.error(error);
    	message.reply('there was an error trying to execute that command!');
    }

    
    antiSpam.message(message).catch(console.error);
    if (message.guild === null) { return }
    if (message.author.bot) { return }
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
    if (message.content === '!basilisk') {
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
    }
    if (message.content === '!coin') {
            var options = ['Heads', 'Tails'];
            message.channel.send(`🪙 ${options[Math.floor(Math.random() * options.length)]}!`);
    }
    if (message.content.startsWith('!math')) {
        try {
            message.channel.send(eval(message.content.substring(5, message.content.length)));
        }
        catch {
            message.channel.send("Eeek! Something went wrong!")
        }
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
