const { SlashCommandBuilder } = require('@discordjs/builders');
const { Interaction, MessageEmbed } = require('discord.js');

const { Canvas } = require('@napi-rs/canvas');
const { request } = require('undici');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('list')
        .setDescription('UGL Players & Teams')
        .addSubcommand(subcommand =>
            subcommand
                .setName('solos')
                .setDescription('List of Solo Players')
                .addStringOption(option =>
                    option
                        .setName('solo_lobby')
                        .setDescription('Pick Which Lobby to DM')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Lobby A', value: '1' },
                            { name: 'Lobby B', value: '2'},
                            { name: 'Lobby C', value: '3' },
                            { name: 'Lobby D', value: '4'},
                            { name: 'Lobby E', value: '5' },
                            { name: 'Lobby F', value: '6'},
                            { name: 'Lobby G', value: '7' },
                        )
                ),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('duos')
                .setDescription('List of Duo Teams')
                .addStringOption(option =>
                    option
                        .setName('duo_lobby')
                        .setDescription('Pick Which Lobby to DM')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Lobby A', value: '1' },
                            { name: 'Lobby B', value: '2'},
                            { name: 'Lobby C', value: '3' },
                            { name: 'Lobby D', value: '4'},
                            { name: 'Lobby E', value: '5' },
                            { name: 'Lobby F', value: '6'},
                        )
                ),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('squads')
                .setDescription('List of Squads')
                .addStringOption(option =>
                    option
                        .setName('squad_lobby')
                        .setDescription('Pick Which Lobby to DM')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Lobby A', value: '1' },
                            { name: 'Lobby B', value: '2'},
                            { name: 'Lobby C', value: '3' },
                            { name: 'Lobby D', value: '4'},
                            { name: 'Lobby E', value: '5' },
                            { name: 'Lobby F', value: '6'},
                        )
                ),
        ),

        async execute(interaction, client) {
            const solosType = interaction.options.getString('solo_lobby');
            const duosType = interaction.options.getString('duo_lobby');
            const squadsType = interaction.options.getString('squad_lobby');

            if(interaction.guild.id != '899801075786342480') {
                interaction.reply(`${interaction.user} this command is used in UGL only!`)
            } else {
                if(interaction.options.getSubcommand() === 'solos') {
                    client.db.query("SELECT * FROM solos_season_four WHERE `lobby`= '" + solosType + "';", async function(err,rows) {
                        if(solosType == '1') {
                            for(var i = 0; i < rows.length; i++) {
                                interaction.guild.channels.cache.get('911468753542320158').send(`Lobby A :\n ${rows[i].ign}`);
                            }
                        } else if(solosType == '2') {
                            for(var i = 0; i < rows.length; i++) {
                                interaction.guild.channels.cache.get('911468753542320158').send(`Lobby B :\n ${rows[i].ign}`);
                            }
                        } else if(solosType == '3') {
                            for(var i = 0; i < rows.length; i++) {
                                interaction.guild.channels.cache.get('911468753542320158').send(`Lobby C :\n ${rows[i].ign}`);
                            }
                        } else if(solosType == '4') {
                            for(var i = 0; i < rows.length; i++) {
                                interaction.guild.channels.cache.get('911468753542320158').send(`Lobby D :\n ${rows[i].ign}`);
                            }
                        } else if(solosType == '5') {
                            for(var i = 0; i < rows.length; i++) {
                                interaction.guild.channels.cache.get('911468753542320158').send(`Lobby E :\n ${rows[i].ign}`);
                            }
                        } else if(solosType == '6') {
                            for(var i = 0; i < rows.length; i++) {
                                interaction.guild.channels.cache.get('911468753542320158').send(`Lobby F :\n ${rows[i].ign}`);
                            }
                        } else if(solosType == '7') {
                            for(var i = 0; i < rows.length; i++) {
                                interaction.guild.channels.cache.get('911468753542320158').send(`Lobby G :\n ${rows[i].ign}`);
                            }
                        }
                    });
                } else if(interaction.options.getSubcommand() === 'duos') {
                    client.db.query("SELECT * FROM duos_season_two WHERE `lobby`= '" + duosType + "';", async function(err,dRows) {
                        if(duosType == '1') {
                            for(var i = 0; i < dRows.length; i++) {
                                interaction.guild.channels.cache.get('911468753542320158').send(`**__Lobby:__**   |        **__Team Name:__**         |         **__Player 1:__**                      |            **__Player 2:__**\n   A           |        ${dRows[i].team_name}          |        ${interaction.guild.members.cache.get(dRows[i].discordID)}             |        <@${dRows[i].team_mateID}>`);
                            }
                        } else if(duosType == '2') {
                            for(var i = 0; i < dRows.length; i++) {
                                interaction.guild.channels.cache.get('911468753542320158').send(`**__Lobby:__**   |        **__Team Name:__**         |         **__Player 1:__**                      |            **__Player 2:__**\n   B           |        ${dRows[i].team_name}          |        ${interaction.guild.members.cache.get(dRows[i].discordID)}             |        <@${dRows[i].team_mateID}>`);
                            }
                        } else if(duosType == '3') {
                            for(var i = 0; i < dRows.length; i++) {
                                interaction.guild.channels.cache.get('911468753542320158').send(`**__Lobby:__**   |        **__Team Name:__**         |         **__Player 1:__**                      |            **__Player 2:__**\n   C           |        ${dRows[i].team_name}          |        ${interaction.guild.members.cache.get(dRows[i].discordID)}             |        <@${dRows[i].team_mateID}>`);
                            }
                        } else if(duosType == '4') {
                            for(var i = 0; i < dRows.length; i++) {
                                interaction.guild.channels.cache.get('911468753542320158').send(`**__Lobby:__**   |        **__Team Name:__**         |         **__Player 1:__**                      |            **__Player 2:__**\n   D           |        ${dRows[i].team_name}          |        ${interaction.guild.members.cache.get(dRows[i].discordID)}             |        <@${dRows[i].team_mateID}>`);
                            }
                        } else if(duosType == '5') {
                            for(var i = 0; i < dRows.length; i++) {
                                interaction.guild.channels.cache.get('911468753542320158').send(`**__Lobby:__**   |        **__Team Name:__**         |         **__Player 1:__**                      |            **__Player 2:__**\n   E           |        ${dRows[i].team_name}          |        ${interaction.guild.members.cache.get(dRows[i].discordID)}             |        <@${dRows[i].team_mateID}>`);
                            }
                        } else if(duosType == '6') {
                            for(var i = 0; i < dRows.length; i++) {
                                interaction.guild.channels.cache.get('911468753542320158').send(`**__Lobby:__**   |        **__Team Name:__**         |         **__Player 1:__**                      |            **__Player 2:__**\n   F           |        ${dRows[i].team_name}          |        ${interaction.guild.members.cache.get(dRows[i].discordID)}             |        <@${dRows[i].team_mateID}>`);
                            }
                        }
                    });
                } else if(interaction.options.getSubcommand() === 'squads') {
                    client.db.query("SELECT * FROM squads WHERE `lobby`= '" + squadsType + "';", async function(err,sRows) {
                        if(squadsType == '1') {
                            for(var i = 0; i < sRows.length; i++) {
                                interaction.guild.channels.cache.get('911468753542320158').send(`**__Lobby:__**   |        **__Team Name:__**         |         **__Player 1:__**                      |            **__Player 2:__**\n   A           |        ${sRows[i].team_name}          |        ${interaction.guild.members.cache.get(sRows[i].player_one)}             |        <@${sRows[i].player_two}>             |        <@${sRows[i].player_three}>`);
                            }
                        } else if(squadsType == '2') {
                            for(var i = 0; i < sRows.length; i++) {
                                interaction.guild.channels.cache.get('911468753542320158').send(`**__Lobby:__**   |        **__Team Name:__**         |         **__Player 1:__**                      |            **__Player 2:__**\n   B           |        ${sRows[i].team_name}          |        ${interaction.guild.members.cache.get(sRows[i].player_one)}             |        <@${sRows[i].player_two}>             |        <@${sRows[i].player_three}>`);
                            }
                        } else if(squadsType == '3') {
                            for(var i = 0; i < sRows.length; i++) {
                                interaction.guild.channels.cache.get('911468753542320158').send(`**__Lobby:__**   |        **__Team Name:__**         |         **__Player 1:__**                      |            **__Player 2:__**\n   C           |        ${sRows[i].team_name}          |        ${interaction.guild.members.cache.get(sRows[i].player_one)}             |        <@${sRows[i].player_two}>             |        <@${sRows[i].player_three}>`);
                            }
                        } else if(squadsType == '4') {
                            for(var i = 0; i < sRows.length; i++) {
                                interaction.guild.channels.cache.get('911468753542320158').send(`**__Lobby:__**   |        **__Team Name:__**         |         **__Player 1:__**                      |            **__Player 2:__**\n   D           |        ${sRows[i].team_name}          |        ${interaction.guild.members.cache.get(sRows[i].player_one)}             |        <@${sRows[i].player_two}>             |        <@${sRows[i].player_three}>`);
                            }
                        } else if(squadsType == '5') {
                            for(var i = 0; i < sRows.length; i++) {
                                interaction.guild.channels.cache.get('911468753542320158').send(`**__Lobby:__**   |        **__Team Name:__**         |         **__Player 1:__**                      |            **__Player 2:__**\n   E           |        ${sRows[i].team_name}          |        ${interaction.guild.members.cache.get(sRows[i].player_one)}             |        <@${sRows[i].player_two}>             |        <@${sRows[i].player_three}>`);
                            }
                        } else if(squadsType == '6') {
                            for(var i = 0; i < sRows.length; i++) {
                                interaction.guild.channels.cache.get('911468753542320158').send(`**__Lobby:__**   |        **__Team Name:__**         |         **__Player 1:__**                      |            **__Player 2:__**\n   F           |        ${sRows[i].team_name}          |        ${interaction.guild.members.cache.get(sRows[i].player_one)}             |        <@${sRows[i].player_two}>             |        <@${sRows[i].player_three}>`);
                            }
                        }
                    });
                }
            }
        }
}