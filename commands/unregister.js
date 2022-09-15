const { SlashCommandBuilder } = require('@discordjs/builders');
const { Interaction } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unregister')
        .setDescription('Unregister Command for Solos & Duos')
        .addSubcommand(subcommand =>
            subcommand
                .setName('solos')
                .setDescription('Register for solos')
                .addStringOption(ign =>
                    ign
                    .setName('ign')
                    .setDescription('You in game name')
                    .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('duos')
                .setDescription('Info about the server')
                .addStringOption((team_name) => {
                    return team_name
                        .setName('team')
                        .setDescription('Your Team Name')
                        .setRequired(true)
                })
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('squads')
                .setDescription('Info about the server')
                .addStringOption((team_name_squad) => {
                    return team_name_squad
                        .setName('team_name')
                        .setDescription('Your Team Name')
                        .setRequired(true)
                })
        ),

        async execute(interaction,client) {
            //solos
            const soloUser = interaction.options.getString('ign');
            //duos
            const teamName = interaction.options.getString('team');
            //squads
            const squadName = interaction.options.getString('team_name');
            if(interaction.guild.id != '899801075786342480') {
                interaction.reply(`${interaction.user} this command is used in UGL only!`)
            } else {
            
                if(interaction.options.getSubcommand() === 'solos') {
                    client.db.query("SELECT * FROM solos_season_four WHERE discordID= '" + interaction.user.id + "' AND ign= '" + soloUser + "';", async function(err,rows) {
                        if(rows[0] == null) {
                            interaction.reply(`${interaction.user} you have not registered for Solos in Season 4`);
                        } else {
                            const role = interaction.guild.roles.cache.find(sRole => sRole.id === "917084509424455775");
                            interaction.member.roles.remove(role);
                            client.db.query("DELETE FROM solos_season_four WHERE discordID= '" + interaction.user.id + "';");
                            interaction.reply(`${interaction.user} you have been unregistered for Solos Season 4`);
                        }
                    });
                } else if(interaction.options.getSubcommand() === 'duos') {
                    client.db.query("SELECT * FROM duos_season_two WHERE discordID= '" + interaction.user.id + "' OR team_mateID= '" + interaction.user.id + "' AND team_name= '" + teamName + "';", async function(err,dRows) {
                        if(dRows[0] == null) {
                            interaction.reply(`${interaction.user} you have not registered for Duos Season 2`);
                        } else {
                            if(dRows[0].team_name != teamName) {
                                interaction.reply(`${interaction.user} That team name is incorrect or is not the team you registered with. Please contact an admin for further instructions.`)
                            } else {
                                const dRole = interaction.guild.roles.cache.find(dRoles => dRoles.id === "977328896544497674");
                                interaction.member.roles.remove(dRole)

                                const playersd2Role = interaction.guild.members.cache.get(dRows[0].team_mateID);
                                playersd2Role.roles.remove(dRole);

                                client.db.query("DELETE FROM duos_season_two WHERE discordID= '" + interaction.user.id + "' OR team_mateID= '" + interaction.user.id + "';");
                                interaction.reply(`${interaction.user} ${teamName} have been unregistered for Duos Season 2`);
                            }
                        }
                    });
                } else if(interaction.options.getSubcommand() === 'squads') {
                    client.db.query("SELECT * FROM squads WHERE player_one= '" + interaction.user.id + "' OR player_two= '" + interaction.user.id + "' OR player_three= '" + interaction.user.id + "';", async function(err,sRows) {
                        if(sRows[0] == null) {
                            interaction.reply(`${interaction.user} you have not registered for Squads Season 1`);
                        } else {
                            if(sRows[0].team_name != squadName) {
                                interaction.reply(`${interaction.user} That team name is incorrect or is not the team you registered with. Please contact an admin for further instructions.`)
                            } else {
                                const sRole = interaction.guild.roles.cache.find(sRoles => sRoles.id === "995561554370105394");

                                const playersd1sRole = interaction.guild.members.cache.get(sRows[0].player_one);
                                playersd1sRole.roles.remove(sRole);

                                const playersd2sRole = interaction.guild.members.cache.get(sRows[0].player_two);
                                playersd2sRole.roles.remove(sRole);

                                const playersd3sRole = interaction.guild.members.cache.get(sRows[0].player_three);
                                playersd3sRole.roles.remove(sRole);

                                client.db.query("DELETE FROM squads WHERE player_one= '" + interaction.user.id + "' OR player_two= '" + interaction.user.id + "' OR player_three= '" + interaction.user.id + "';");
                                interaction.reply(`${interaction.user} ${squadName} have been unregistered for Squads Season 1`);
                            }
                        }
                    });
                }
            }
        }
}