module.exports = {
    name: 'weather',
    description: 'sunny -324343 degrees',
    cooldown: 10,
    execute(message, args, client) {
        const axios = require('axios');

        var country = args.pop();
        var city = args.join(' ');

        if (country.length !== 2) {
            message.channel.send(`${message.author} provide a country in your query!`);
            return
        }

        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${process.env.WEATHER}`)
            .then(res => {
                const Discord = require('discord.js');

                var weather = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(`Weather in ${res.data.name}`)
                    .setDescription(`${res.data.weather[0].main}`)
                    .setThumbnail(`https://openweathermap.org/img/wn/${res.data.weather[0].icon}@4x.png`)
                    .addFields(
                        { name: `Wind`, value: `${res.data.wind.speed} km/h` },
                        { name: `Temp`, value: `${Math.round(res.data.main.temp - 273.15)}\u00B0 C`}
                    )
                    .setTimestamp()
                    .setFooter('Created by LogicGo#7666', 'https://i.imgur.com/iglEZPr.png');
                
                message.channel.send(weather)
            })
            .catch(res => {
                if (res.response.status === 404) {
                    message.channel.send(`${message.author} Try a valid city!`);
                    return
                }
                message.channel.send(`${message.author} there was an API error!`)
            })
            
    },
};