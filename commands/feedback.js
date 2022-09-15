const { SlashCommandBuilder } = require('@discordjs/builders');
const { Modal, TextInputComponent, SelectMenuComponent, showModal } = require('discord-modals');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('feedback')
        .setDescription('Send us your feedback'),


        async execute(interaction,client) {
            if(interaction.guild.id != '899801075786342480') {
                interaction.reply(`${interaction.user} this command is used in UGL only!`)
            } else {
                const modal = new Modal() // We create a Modal
                    .setCustomId('feedback')
                    .setTitle('UGL Feedback')
                    .addComponents(
                        new TextInputComponent()
                            .setCustomId('name')
                            .setLabel('Name')
                            .setStyle('SHORT')
                            .setPlaceholder('Whats your in game name?')
                            .setRequired(true),

                        new TextInputComponent()
                            .setCustomId('response')
                            .setLabel('Your Feedback')
                            .setStyle('LONG')
                            .setPlaceholder('Tell us what you think')
                            .setRequired(true),
                    );

                showModal(modal, {
                    client: client,
                    interaction: interaction
                })
            }
        }
}