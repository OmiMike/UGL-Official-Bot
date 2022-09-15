const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('id')
        .setDescription('Register Your ID for Stats')
        .addStringOption((username) => {
            return username
                .setName('ign')
                .setDescription('Your In Game Name')
                .setRequired(true)
        }),

        async execute(interaction,client) {
            const inGameName = interaction.options.getString('ign');
            client.db.query("SELECT * FROM player_stats WHERE discordID= '" + interaction.user.id + "';", async function(err,rows) {
                if(rows[0] == null) {
                    interaction.reply(`${inGameName} has been entered into our database`);
                    axios.get(`https://nykloo.com/api/PlayerInfos/Search?usernameQuery=${inGameName}&page=0&pageSize=25`).then(async function (res) {
                        const playerID = res.data[0].playFabId
                        axios.get(`https://nykloo.com/api/PlayerStats/Stats/${playerID}`).then(async function(ID) {
                            var PlayerName = ID.data.accountInfo.titleInfo.displayName;
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

                            const SQUADSSKILL = ID.data.playerStatistics;
                            const skillForSquads = SQUADSSKILL.find(function(SkillSquads, index){
                                if(SkillSquads.statisticName == "SkillSquads"){
                                    return true;
                                }
                            });

                            const SOLOSKILL = ID.data.playerStatistics;
                            const skillForSolo = SOLOSKILL.find(function(SkillSolo, index){
                                if(SkillSolo.statisticName == "SkillSolo"){
                                    return true;
                                }
                            });

                            var divPoints = Math.floor((mmrPoints.value + playerSkillPoints.value) / 2 );
                            client.db.query("INSERT INTO player_stats (discordID, in_game_name, playFabID, division_points) VALUES('" + interaction.user.id + "', '" + PlayerName + "', '" + playerID + "', '" + divPoints + "');");
                        })
                        //client.db.query("INSERT INTO player_stats (discordID, in_game_name, playFabID) VALUES('" + interaction.user.id + "', '" + inGameName + "', '" + playerID + "');");
                        //await wait(5000)
                        //interaction.reply(`${inGameName} has been entered into our database`);
                    });
                } else {
                    interaction.reply(`${interaction.user} You have already set your ID with UGL Official.`);
                }
            });
        }
}