const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('availability')
        .setDescription('Set your teams availability')
        .addSubcommand(subcommand =>
            subcommand
                .setName('solos')
                .setDescription('Availability for solos')
                .addStringOption(option =>
                    option
                        .setName('solo_first_pick')
                        .setDescription('Pick a day and Time')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Tuesday 9pm EST', value: 'Tuesday 9pm EST' },
                            { name: 'Tuesday 2pm EST', value: 'Tuesday 2pm EST' },
                            { name: 'Thursday 9pm EST', value: 'Thursday 9pm EST' },
                            { name: 'Thursday 5pm EST', value: 'Thursday 5pm EST' },
                            { name: 'Saturday 7pm EST', value: 'Saturday 7pm EST' },
                            { name: 'Saturday 2pm EST', value: 'Saturday 2pm EST' },
                        )
                )
                .addStringOption(option =>
                    option
                        .setName('solo_second_pick')
                        .setDescription('Pick a day and Time')
                        .setRequired(true)
                        .addChoices(
                            { name: 'None', value: 'None' },
                            { name: 'Tuesday 9pm EST', value: 'Tuesday 9pm EST' },
                            { name: 'Tuesday 2pm EST', value: 'Tuesday 2pm EST' },
                            { name: 'Thursday 9pm EST', value: 'Thursday 9pm EST' },
                            { name: 'Thursday 5pm EST', value: 'Thursday 5pm EST' },
                            { name: 'Saturday 7pm EST', value: 'Saturday 7pm EST' },
                            { name: 'Saturday 2pm EST', value: 'Saturday 2pm EST' },
                        )
                )
                .addStringOption(option =>
                    option
                        .setName('solo_third_pick')
                        .setDescription('Pick a day and Time')
                        .setRequired(true)
                        .addChoices(
                            { name: 'None', value: 'None' },
                            { name: 'Tuesday 9pm EST', value: 'Tuesday 9pm EST' },
                            { name: 'Tuesday 2pm EST', value: 'Tuesday 2pm EST' },
                            { name: 'Thursday 9pm EST', value: 'Thursday 9pm EST' },
                            { name: 'Thursday 5pm EST', value: 'Thursday 5pm EST' },
                            { name: 'Saturday 7pm EST', value: 'Saturday 7pm EST' },
                            { name: 'Saturday 2pm EST', value: 'Saturday 2pm EST' },
                        )
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('duos')
                .setDescription('Availability for Duos')
                .addStringOption(option =>
                    option
                        .setName('first_pick')
                        .setDescription('Pick a day and Time')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Monday 9pm EST', value: 'Monday 9pm EST' },
                            { name: 'Monday 2pm EST', value: 'Monday 2pm EST' },
                            { name: 'Wednesday 9pm EST', value: 'Wednesday 9pm EST' },
                            { name: 'Wednesday 5pm EST', value: 'Wednesday 5pm EST' },
                            { name: 'Saturday 4pm EST', value: 'Saturday 4pm EST' },
                        )
                )
                .addStringOption(option =>
                    option
                        .setName('second_pick')
                        .setDescription('Pick a day and Time')
                        .setRequired(true)
                        .addChoices(
                            { name: 'None', value: 'None' },
                            { name: 'Monday 9pm EST', value: 'Monday 9pm EST' },
                            { name: 'Monday 2pm EST', value: 'Monday 2pm EST' },
                            { name: 'Wednesday 9pm EST', value: 'Wednesday 9pm EST' },
                            { name: 'Wednesday 5pm EST', value: 'Wednesday 5pm EST' },
                            { name: 'Saturday 4pm EST', value: 'Saturday 4pm EST' },
                        )
                )
                .addStringOption(option =>
                    option
                        .setName('third_pick')
                        .setDescription('Pick a day and Time')
                        .setRequired(true)
                        .addChoices(
                            { name: 'None', value: 'None' },
                            { name: 'Monday 9pm EST', value: 'Monday 9pm EST' },
                            { name: 'Monday 2pm EST', value: 'Monday 2pm EST' },
                            { name: 'Wednesday 9pm EST', value: 'Wednesday 9pm EST' },
                            { name: 'Wednesday 5pm EST', value: 'Wednesday 5pm EST' },
                            { name: 'Saturday 4pm EST', value: 'Saturday 4pm EST' },
                        )
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('squads')
                .setDescription('Availability for Squads')
                .addStringOption(option =>
                    option
                        .setName('first_pick_squads')
                        .setDescription('Pick a day and Time')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Tuesday 2pm EST', value: 'Tuesday 2pm EST' },
                            { name: 'Tuesday 9pm EST', value: 'Tuesday 9pm EST' },
                            { name: 'Firday 2pm EST', value: 'Friday 2pm EST' },
                            { name: 'Firday 9pm EST', value: 'Friday 9pm EST' },
                            { name: 'Saturday 2pm EST', value: 'Saturday 2pm EST' },
                            { name: 'Saturday 9pm EST', value: 'Saturday 9pm EST' },
                        )
                )
                .addStringOption(option =>
                    option
                        .setName('second_pick_squads')
                        .setDescription('Pick a day and Time')
                        .setRequired(true)
                        .addChoices(
                            { name: 'None', value: 'None' },
                            { name: 'Tuesday 2pm EST', value: 'Tuesday 2pm EST' },
                            { name: 'Tuesday 9pm EST', value: 'Tuesday 9pm EST' },
                            { name: 'Firday 2pm EST', value: 'Friday 2pm EST' },
                            { name: 'Firday 9pm EST', value: 'Friday 9pm EST' },
                            { name: 'Saturday 2pm EST', value: 'Saturday 2pm EST' },
                            { name: 'Saturday 9pm EST', value: 'Saturday 9pm EST' },
                        )
                )
                .addStringOption(option =>
                    option
                        .setName('third_pick_squads')
                        .setDescription('Pick a day and Time')
                        .setRequired(true)
                        .addChoices(
                            { name: 'None', value: 'None' },
                            { name: 'Tuesday 2pm EST', value: 'Tuesday 2pm EST' },
                            { name: 'Tuesday 9pm EST', value: 'Tuesday 9pm EST' },
                            { name: 'Firday 2pm EST', value: 'Friday 2pm EST' },
                            { name: 'Firday 9pm EST', value: 'Friday 9pm EST' },
                            { name: 'Saturday 2pm EST', value: 'Saturday 2pm EST' },
                            { name: 'Saturday 9pm EST', value: 'Saturday 9pm EST' },
                        )
                )
        ),

        async execute(interaction, client) {
            const tues = interaction.options.getString('solo_first_pick');
            const sat = interaction.options.getString('solo_second_pick');
            const thirdSolos = interaction.options.getString('solo_third_pick');
            const mon = interaction.options.getString('first_pick');
            const satDuo = interaction.options.getString('second_pick');
            const thirdDuo = interaction.options.getString('third_pick');
            const firstSquads = interaction.options.getString('first_pick_squads');
            const secondSquads = interaction.options.getString('second_pick_squads');
            const thirdSquads = interaction.options.getString('third_pick_squads');
            if(interaction.guild.id != '899801075786342480') {
                interaction.reply(`${interaction.user} this command is used in UGL only!`)
            } else {

                if(interaction.options.getSubcommand() === 'solos') {
                    client.db.query("SELECT * FROM solos_season_four WHERE discordID= '" + interaction.user.id + "';", async function(err,rows) {
                        if(rows[0] == null) {
                            interaction.reply(`${interaction.user} you have not registered for Solos Season 4. Please register before entering your availability`);
                        } else {
                            client.db.query("UPDATE solos_season_four SET `first_pick`= '" + tues + "' WHERE `discordID`= '" + interaction.user.id + "';");
                            client.db.query("UPDATE solos_season_four SET `second_pick`= '" + sat + "' WHERE `discordID`= '" + interaction.user.id + "';");
                            client.db.query("UPDATE solos_season_four SET `third_pick`= '" + thirdSolos + "' WHERE `discordID`= '" + interaction.user.id + "';");
                            interaction.reply(`${interaction.user} You have registered your availability`);
                        }
                    });
                } else if(interaction.options.getSubcommand() === 'duos') {
                    client.db.query("SELECT * FROM duos_season_two WHERE discordID= '" + interaction.user.id + "' OR team_mateID= '" + interaction.user.id + "';", async function(err,dRows) {
                        if(dRows[0] == null) {
                            interaction.reply(`${interaction.user} you have not registered for Duos Season 2. Please register before entering your availability`);
                        } else {
                            if(dRows[0].discordID == interaction.user.id) {
                                client.db.query("UPDATE duos_season_two SET `first_pick`= '" + mon + "' WHERE `discordID`= '" + interaction.user.id + "';");
                                client.db.query("UPDATE duos_season_two SET `second_pick`= '" + satDuo + "' WHERE `discordID`= '" + interaction.user.id + "';");
                                client.db.query("UPDATE duos_season_two SET `third_pick`= '" + thirdDuo + "' WHERE `discordID`= '" + interaction.user.id + "';");
                                interaction.reply(`${interaction.user} You have registered your availability for ${dRows[0].team_name}`);
                            } else if(dRows[0].team_mateID == interaction.user.id) {
                                client.db.query("UPDATE duos_season_two SET `first_pick`= '" + mon + "' WHERE `team_mateID`= '" + interaction.user.id + "';");
                                client.db.query("UPDATE duos_season_two SET `second_pick`= '" + satDuo + "' WHERE `team_mateID`= '" + interaction.user.id + "';");
                                client.db.query("UPDATE duos_season_two SET `third_pick`= '" + thirdDuo + "' WHERE `team_mateID`= '" + interaction.user.id + "';");
                                interaction.reply(`${interaction.user} You have registered your availability for ${dRows[0].team_name}`);
                            }
                        }
                    });
                } else if(interaction.options.getSubcommand() === 'squads') {
                    client.db.query("SELECT * FROM squads WHERE player_one= '" + interaction.user.id + "' OR player_two= '" + interaction.user.id + "' OR player_three= '" + interaction.user.id + "';", async function(err,sRows) {
                        if(sRows[0] == null) {
                            interaction.reply(`${interaction.user} you have not registered for Qualifiers. Please register before entering your availability`);
                        } else {
                            client.db.query("UPDATE squads SET `first_pick`= '" + firstSquads + "' WHERE `player_one`= '" + interaction.user.id + "';");
                            client.db.query("UPDATE squads SET `second_pick`= '" + secondSquads + "' WHERE `player_one`= '" + interaction.user.id + "';");
                            client.db.query("UPDATE squads SET `third_pick`= '" + thirdSquads + "' WHERE `player_one`= '" + interaction.user.id + "';");
                            interaction.reply(`${interaction.user} You have registered your availability for ${sRows[0].team_name}`);
                        }
                    });
                }
            }
        }
}