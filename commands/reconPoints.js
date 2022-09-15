const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const { Stats } = require('node:fs');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('Register Your ID for Stats')
        .addSubcommand(subcommand =>
            subcommand
                .setName('solos')
                .setDescription('List of Solo Players')
                .addStringOption(option =>
                    option
                        .setName('ign')
                        .setDescription('Pick an Option')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('duos')
                .setDescription('List of Solo Players'),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('squads')
                .setDescription('List of Solo Players'),
        ),

        async execute(interaction,client) {
            const InGameName = interaction.options.getString('ign');
            client.db.query("SELECT * FROM player_stats WHERE in_game_name= '" + InGameName + "';", async function(err,stats) {
                client.db.query("SELECT * FROM solos_season_four;", async function(err,solos) {
                    client.db.query("SELECT * FROM duos_season_two;", async function(err,duos) {
                        client.db.query("SELECT * FROM squads;", async function(err,squads) {
                            if (interaction.options.getSubcommand() === 'solos') {
                                const playerID = stats[0].playFabID;
                                axios.get(`https://nykloo.com/api/PlayerStats/Stats/${playerID}`).then(async function(ID) {
                                    console.log(playerID);

                                    const MMR = ID.data.playerStatistics;
                                    const mmrPoints = MMR.find(function(MMR1, index){
                                        if(MMR1.statisticName == "MMR1"){
                                            return true;
                                        }
                                    });

                                    const PLAYERSKILL = ID.data.playerStatistics;
                                    const playerSkillPoints = PLAYERSKILL.find(function(PlayerSkill, index){
                                        if(PlayerSkill.statisticName == "PlayerSkill"){
                                            return true;
                                        }
                                    });

                                    var points = Math.floor((mmrPoints.value + playerSkillPoints.value) / 2 );
                                    client.db.query("UPDATE player_stats set `division_points`= '" + points + "' WHERE in_game_name= '" + InGameName + "';");
                                    interaction.reply(`${interaction.user} ${InGameName}'s division_points have been updated to ${points}`);
                                });
                            }
                        });
                    });
                });
            });
        }
}