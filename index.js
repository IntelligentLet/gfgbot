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
    //bans
    if (message.content.startsWith("!ban")) {
        const sender = message.member;
        const guild = sender.guild;

        var split = message.content.split(" ");
        var victim =  message.mentions.users.first();

        if (sender.roles.cache.some(role => role.name === 'Mod')) {
            if (guild.member(victim)) {
                guild.members.ban(victim);
                message.channel.send(`Banned ${victim} for ${split[2]} days for reason ${split[3]}.`);
            } else {
                message.channel.send(`Eeek! Something went wrong!`);
            }
        } else {
            message.channel.send(`${sender} you don't seem to be a moderator. If you think this is a mistake please message a moderator.`); 
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