const { SlashCommandBuilder } = require('@discordjs/builders');
const { Interaction, MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('UGL Staff warning system')
        .addUserOption((user) => {
            return user
                .setName('member')
                .setDescription('Members Username')
                .setRequired(true)
        })
        .addStringOption((team_name_squad) => {
            return team_name_squad
                .setName('reason')
                .setDescription('Reason for the warning')
                .setRequired(true)
        }),

        async execute(interaction,client) {
            const member = interaction.options.getUser('member');
            const reason = interaction.options.getString('reason');
            if(!interaction.member.roles.cache.some((role) => role.id == '907042996128723036')) {
                interaction.reply(`You do not have permissions to use this command`)
            } else {
                interaction.reply(`${interaction.user} ${member} has been sent a warning to their DM`);

                const memberDM = interaction.guild.members.cache.get(member.id);
                memberDM.send(`**WARNING**\nYou have been warned in UGL for the following reason:\n\n${reason}`);

                const logChannel = interaction.guild.channels.cache.get('1008179926203113503');
                const weekEmbed = new MessageEmbed()
                .setTitle('New Warning')
                .setDescription(`${interaction.user} has submitted a new warning to ${member}`)
                .setColor("RED")
                .setThumbnail(client.user.avatarURL())
                .addField('Reason', reason)
                logChannel.send({ embeds: [ weekEmbed ] })
            }
        }
}