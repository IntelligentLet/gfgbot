const Discord = require('discord.js');
const keepAlive = require('./server');
require('dotenv').config();

const client = new Discord.Client();
keepAlive();

client.once('ready', () => {
    console.log('app ready');
    client.user.setActivity('messages fly by', { type: 'WATCHING' });
});

//commands
client.on('message', message => {
	if (message.content.startsWith("!ban")) {
        const sender = message.member;
        const guild = sender.guild;
        if (sender.roles.cache.some(role => role.name === 'Mod')) {
            var split = message.content.split(" ");
            var victim = split[1];
            victim.ban({ days: split[2], reason: split[3] })
            message.channel.send(`Banned ${victim} for ${split[3]} days for reason ${split[4]}.`);
        } else {
            message.channel.send(`${member} you don't seem to be a moderator. If you think this is a mistake please message a moderator.`) 
        }
    }
});

//when someone joins, give roles and welcome them
client.on("guildMemberAdd", (member) => {
    const guild = member.guild;
    const rules = client.channels.cache.get('766386424567693343');
    client.channels.cache.get('766100639826575433').send(`Welcome ${member.user}! Please read ${rules} to get started!`);
    const role = guild.roles.cache.find(role => role.name === 'Gamer');
    member.roles.add(role);
}); 

client.login(process.env.TOKEN);