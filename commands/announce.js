const { SlashCommandBuilder } = require('@discordjs/builders');
const { Interaction, MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('announce')
        .setDescription('UGL Announcement Command')
        .addChannelOption((user) => {
            return user
                .setName('channel')
                .setDescription('Channel to send a message')
                .setRequired(true)
        })
        .addStringOption((title) => {
            return title
                .setName('title')
                .setDescription('Message to post')
                .setRequired(true)
        })
        .addStringOption((team_name_squad) => {
            return team_name_squad
                .setName('msg')
                .setDescription('Message to post')
                .setRequired(true)
        }),

        async execute(interaction,client) {
            const member = interaction.options.getChannel('channel');
            const aTitle = interaction.options.getString('title');
            const reason = interaction.options.getString('msg');


            if(!interaction.member.roles.cache.some((role) => role.id == '907042996128723036')) {
                interaction.reply(`You do not have permissions to use this command`)
            } else {
                interaction.reply(`${interaction.user} your message has been sent to ${member}`);
                const logChannel = interaction.guild.channels.cache.get(member.id);
                const weekEmbed = new MessageEmbed()
                .setTitle(aTitle)
                .setDescription(`${reason}`)
                .setColor("GREEN")
                .setThumbnail(client.user.avatarURL())
                logChannel.send({ embeds: [ weekEmbed ] })
            }
        }
}