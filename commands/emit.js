//client.emit("guildMemberAdd", member.author.id)
const { SlashCommandBuilder } = require('@discordjs/builders');
const { Interaction } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('emit')
        .setDescription('DMs the Code to the players'),

    async execute(interaction,client,canvas,member) {
        if(!interaction.member.roles.cache.some((role) => role.id == '907042996128723036')) {
            interaction.reply(`You do not have permissions to use this command`)
        } else {
            client.emit('guildMemberAdd', interaction.member);
        }
    }
}