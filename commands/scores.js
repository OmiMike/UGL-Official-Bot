const { SlashCommandBuilder, ActionRowBuilder, SelectMenuBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('scores')
        .setDescription('Register Your Team for Gun Raiders')
        .addStringOption(option =>
            option
                .setName('team')
                .setDescription('Pick a day and Time')
                .setRequired(true)
                .addChoices(
                    { name: 'Player 1', value: 'P1' },
                    { name: 'Team 2', value: 'T2'},
                )
        )
        .addIntegerOption(places => 
            places
            .setName('placement')
            .setDescription('The user')
            .setRequired(true)
        )
        .addIntegerOption(killing => 
            killing
            .setName('kills')
            .setDescription('The user')
            .setRequired(true)
        )
        .addIntegerOption(damages => 
            damages
            .setName('damage')
            .setDescription('The user')
            .setRequired(true)
        ),

        async execute(interaction,client) {
            const members = interaction.options.getString('team');
            const place = interaction.options.getInteger('placement');
            const kill = interaction.options.getInteger('kills');
            const dmg = interaction.options.getInteger('damage');
            if(!interaction.member.roles.cache.some((role) => role.id == '907042996128723036')) {
                interaction.reply(`You do not have permissions to use this command`)
            } else {
                interaction.reply(`${interaction.user} you have entered scores in for ${members}\n**Placement:** ${place}\n**Kills:** ${kill}\n**Damage:** ${dmg}`)
            }
        }
}