const { Client, Intents } = require('discord.js');
const { token } = require('../config');
const { url_image_to_ascii } = require('../image_converter');




const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
    console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'ascii') {
        interaction.channel.messages.fetch().then((messages) => {
            const lastMessage = messages.sort((a, b) => b.createdTimestamp - a.createdTimestamp).filter((m) => m.attachments.size > 0).first();
            const url = lastMessage.attachments.values().next().value.url;
            console.log(url);
            url_image_to_ascii(url).then(value => interaction.reply('```\n' + value + '```'));
        })
    }

});

client.login(token);