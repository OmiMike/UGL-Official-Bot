const { SlashCommandBuilder } = require('@discordjs/builders');
const { Interaction } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sub')
        .setDescription('Register Your Team for UGL Official')
        .addSubcommand(subcommand =>
            subcommand
                .setName('duos')
                .setDescription('Info about the server')
                .addUserOption((sub) => {
                    return sub
                        .setName('duo_sub')
                        .setDescription('Choose your First Sub')
                        .setRequired(true)
                })
                .addUserOption((sub1) => {
                    return sub1
                        .setName('duo_sub2')
                        .setDescription('Choose your Second Sub')
                })
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('squads')
                .setDescription('Add Subs to your Squads')
                .addUserOption((sub1_squad) => {
                    return sub1_squad
                        .setName('sub1')
                        .setDescription('Choose your First Sub')
                        .setRequired(true)
                })
                .addUserOption((sub2_squad) => {
                    return sub2_squad
                        .setName('sub2')
                        .setDescription('Choose your Second Sub')
                })
                .addUserOption((sub3_squad) => {
                    return sub3_squad
                        .setName('sub3')
                        .setDescription('Choose your Third Sub')
                })
        ),

        async execute(interaction,client) {
            //DUOS
            const duo = interaction.options.getString('duos');
            const subPlayer1 = interaction.options.getUser('duo_sub');
            const subPlayer2 = interaction.options.getUser('duo_sub2');
            //SQUADS
            const squad = interaction.options.getString('squads');
            const sub1Squads = interaction.options.getUser('sub1');
            const sub2Squads = interaction.options.getUser('sub2');
            const sub3Squads = interaction.options.getUser('sub3');

            if(interaction.guild.id != '899801075786342480') {
                interaction.reply(`${interaction.user} this command is used in UGL only!`)
            } else {
                if(interaction.options.getSubcommand() === 'duos') {
                    client.db.query("SELECT * FROM duos_season_two WHERE discordID= '" + interaction.user.id + "' OR team_mateID= '" + interaction.user.id + "';", async function(err,dRows) {
                        if(dRows[0].sub_one != '1' && dRows[0].sub_two != '1') {
                            interaction.reply(`${interaction.user} ${dRows[0].team_name} has already been registered for Duos`);
                        } else if(dRows[0].sub_one == 1) {
                            const dRole = interaction.guild.roles.cache.find(dRoles => dRoles.id === "977328896544497674");
                            const playersd1Role = interaction.guild.members.cache.get(subPlayer1.id);
                            playersd1Role.roles.add(dRole)
                        
                            if(subPlayer2) {
                                const playersd2Role = interaction.guild.members.cache.get(subPlayer2.id);
                                playersd2Role.roles.add(dRole);
                                client.db.query("UPDATE duos_season_two SET `sub_one`= '" + subPlayer1 + "', `sub_two`= '" + subPlayer2 + "' WHERE team_name= '" + dRows[0].team_name + "';");
                                interaction.reply(`${interaction.user} has registered ${subPlayer1} and ${subPlayer2} as subs for ${dRows[0].team_name}`);
                            } else {
                                client.db.query("UPDATE duos_season_two SET `sub_one`= '" + subPlayer1 + "' WHERE team_name= '" + dRows[0].team_name + "';");
                                interaction.reply(`${interaction.user} has registered ${subPlayer1} as a sub for ${dRows[0].team_name}`);
                            }
                            
                        } else if(dRows[0].sub_one != '1' && dRows[0].sub_two == 1) {
                            const dRole = interaction.guild.roles.cache.find(dRoles => dRoles.id === "977328896544497674");
                            const playersd2Role = interaction.guild.members.cache.get(subPlayer1.id);
                            playersd2Role.roles.add(dRole);

                            client.db.query("UPDATE duos_season_two SET `sub_two`= '" + subPlayer1 + "' WHERE team_name= '" + dRows[0].team_name + "';");
                            interaction.reply(`${interaction.user} has registered ${subPlayer1} as a sub for ${dRows[0].team_name}`);
                        }
                    });
                } else if(interaction.options.getSubcommand() === 'squads') {
                    client.db.query("SELECT * FROM squads WHERE player_one= '" + interaction.user.id + "' OR player_two= '" + interaction.user.id + "' OR player_three= '" + interaction.user.id + "';", async function(err,sRows) {
                        client.db.query("SELECT * FROM guild_settings WHERE guild_ID= '" + interaction.guild.id + "';", async function(err,reg) {
                            if(sRows[0].sub_one != '1' && sRows[0].sub_two != '1') {
                                interaction.reply(`${interaction.user} ${sRows[0].team_name} you have added your subs for Qualifiers already!`);
                            } else if(sRows[0].sub_one == '1') {
                                const sRole = interaction.guild.roles.cache.find(sRoles => sRoles.id === "995561554370105394");

                                const sub1Squads1 = interaction.guild.members.cache.get(sub1Squads.id);
                                sub1Squads1.roles.add(sRole);

                                if(sub2Squads) {
                                    const sub2Squads2 = interaction.guild.members.cache.get(sub2Squads.id);
                                    sub2Squads2.roles.add(sRole);
                                    client.db.query("UPDATE squads SET `sub_one`= '" + sub1Squads + "', `sub_two`= '" + sub2Squads + "', `sub_three`= '" + sub3Squads + "' WHERE team_name= '" + sRows[0].team_name + ";");
                                    interaction.reply(`${interaction.user} has registered ${sub1Squads} & ${sub2Squads} as subs for ${sRows[0].team_name}`);
                                } else {
                                    client.db.query("UPDATE squads SET `sub_one`= '" + sub1Squads + "' WHERE team_name= '" + sRows[0].team_name + "';");
                                    interaction.reply(`${interaction.user} has registered ${sub1Squads} as a sub for ${sRows[0].team_name}`);
                                }
                            } else if(sRows[0].sub_one != '1' && sRows[0].sub_two == '1') {
                                const sRole = interaction.guild.roles.cache.find(sRoles => sRoles.id === "995561554370105394");

                                const sub2Squads2 = interaction.guild.members.cache.get(sub2Squads.id);
                                sub2Squads2.roles.add(sRole);

                                client.db.query("UPDATE squads SET `sub_two`= '" + sub2Squads + "' WHERE team_name= '" + sRows[0].team_name + "';");
                                interaction.reply(`${interaction.user} has registered ${sub2Squads} as a sub for ${sRows[0].team_name}`);
                            }
                        });
                    });
                }
            }
        }
}