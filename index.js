const Discord = require('discord.js');
const fs = require('fs');
const keepAlive = require('./server');
const dotenv = require('dotenv');

const client = new Discord.Client();
keepAlive();
// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('server started, ready');
});

client.on('message', message => {
	if (message.content === '!info') {
        message.channel.send('under development :/');
    }    
});

client.login(process.env.TOKEN);