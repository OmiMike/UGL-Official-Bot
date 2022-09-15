const { SlashCommandBuilder } = require('@discordjs/builders');
const { client, message } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Pong!'),
    async execute(interaction,client) {
        interaction.reply('Pinging....');
        await wait(2000);
        interaction.editReply(`The server is running on ${client.ws.ping}ms ping!`)
    }
}