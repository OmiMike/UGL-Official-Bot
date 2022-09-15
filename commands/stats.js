const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment, MessageEmbed } = require("discord.js");
const wait = require('node:timers/promises').setTimeout;
const { readFile } = require('fs/promises');
const axios = require('axios');

const { Canvas } = require('@napi-rs/canvas');
const { request } = require('undici');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('Get Your Population One Stats')
        .addSubcommand(subcommand =>
            subcommand
                .setName('career')
                .setDescription('Get Your Career Population One Stats')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('daily')
                .setDescription('Get Your Daily Population One Stats')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('weekly')
                .setDescription('Get Your Weekly Population One Stats')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('season')
                .setDescription('Get Your Season Population One Stats')
        ),

        async execute(interaction,client,canvas) {
            try {
                client.db.query("SELECT * FROM player_stats WHERE discordID= '" + interaction.user.id + "';", async function(err,rows) {
                    if (rows.is_banned == '1') {
                        interaction.reply(`${interaction.user} You have been banned from UGL Official Bot`);
                    } else {
                        if(rows[0] == null) {
                            interaction.reply(`${interaction.user} you have not setup your ID on UGL Official Bot yet. Please run the **__/id__** command and be sure to enter your in game name exactly like it is in game.`)
                        } else {
                            const playerID = rows[0].playFabID;
                            axios.get(`https://nykloo.com/api/PlayerStats/Stats/${playerID}`).then(async function (statResult) {
                                //Carreer Stats
                                let KDA;
                                let kills;
                                let weekWins;
                                let damagePGame;
                                let total_wins;
                                let total_games;
                                let total_kills;
                                let total_damage;
                                let accountCreate;

                                //Season Stats
                                let seasonKDA;
                                let seasonKills;
                                let total_season_games;
                                let seasonDamagePGame;
                                let total_season_damage;
                                let total_season_wins;


                                const account = statResult.data.accountInfo;
                                const weeklyKills = statResult.data.playerStatistics;
                                accountCreate = account.created;
                                const createAccount = accountCreate.substr(0, 10);
                                const createDate = new Date(createAccount);

                                const month = createDate.getMonth();
                                const day = createDate.getDay();
                                const year = createDate.getFullYear();

                                //Career Stats
                                const WKills = weeklyKills.find(function(weekKill, index) {
                                    if(weekKill.statisticName == "WeeklyKillsTotal"){
                                        return true;
                                    }
                                });

                                const weeklyWins = statResult.data.playerStatistics;
                                const WWins = weeklyWins.find(function(weekWinsTotal, index){
                                    if(weekWinsTotal.statisticName == "WeeklyWinsTotal"){
                                        return true;
                                    }
                                });

                                const careerKillsTotal = statResult.data.playerStatistics;
                                const cKills = careerKillsTotal.find(function(totalCareerKills, index){
                                    if(totalCareerKills.statisticName == "CareerKills"){
                                        return true;
                                    }
                                });

                                const careerGamesTotal = statResult.data.playerStatistics;
                                const cGames = careerGamesTotal.find(function(totalCareerGames, index){
                                    if(totalCareerGames.statisticName == "CareerGamesPlayed"){
                                        return true;
                                    }
                                });

                                const careerWinsTotal = statResult.data.playerStatistics;
                                const cGamesWon = careerWinsTotal.find(function(totalCareerWins, index){
                                    if(totalCareerWins.statisticName == "CareerWins"){
                                        return true;
                                    }
                                });

                                const careerDamageTotal = statResult.data.playerStatistics;
                                const cDamage = careerDamageTotal.find(function(totalCareerDamage, index){
                                    if(totalCareerDamage.statisticName == "CareerDamage"){
                                        return true;
                                    }
                                });

                                total_games = cGames.value;
                                total_kills = cKills.value;
                                total_wins = cGamesWon.value;
                                total_damage = cDamage.value;

                                //Season Stats
                                const SeasonGamesPlayed = statResult.data.playerStatistics;
                                const sGPlayed = SeasonGamesPlayed.find(function(seasonTotalPlayed, index){
                                    if(seasonTotalPlayed.statisticName == "SeasonGamesPlayed"){
                                        return true;
                                    }
                                });

                                const SeasonDamage = statResult.data.playerStatistics;
                                const sDamage = SeasonDamage.find(function(seasonTotalDamage, index){
                                    if(seasonTotalDamage.statisticName == "SeasonDamage"){
                                        return true;
                                    }
                                });

                                const SeasonKills = statResult.data.playerStatistics;
                                const sKills = SeasonKills.find(function(seasonTotalKills, index){
                                    if(seasonTotalKills.statisticName == "SeasonKills"){
                                        return true;
                                    }
                                });

                                const SeasonWins = statResult.data.playerStatistics;
                                const sWins = SeasonWins.find(function(seasonTotalWins, index){
                                    if(seasonTotalWins.statisticName == "SeasonWins"){
                                        return true;
                                    }
                                });

                                seasonKills = sKills.value;
                                total_season_games = sGPlayed.value;
                                total_season_wins = sWins.value;
                                total_season_damage = sDamage.value;

                                let leaderKills;
                                let leaderWins;
                                axios.get(`https://nykloo.com/api/PlayerStats/LeaderBoard/WeeklyKillsTotal/${playerID}`).then(async function (leadKills){ 
                                    const killLeaderboard = leadKills.data;
                                    const leaderboardKills = killLeaderboard.find(function(killer, index){
                                        if(killer.displayName == rows[0].in_game_name){
                                            return true;
                                        }
                                    });

                                    if(leaderboardKills == null) {
                                        leaderKills = 0;
                                    } else {
                                        leaderKills = leaderboardKills.position;
                                    }
                                
                                    axios.get(`https://nykloo.com/api/PlayerStats/LeaderBoard/WeeklyWinsTotal/${playerID}`).then(async function (leadWins){
                                        const WinLeaderboard = leadWins.data;
                                        const leaderboardWin = WinLeaderboard.find(function(Winner, index){
                                            if(Winner.playFabId == playerID){
                                                return true;
                                            }
                                        })

                                        if(leaderboardWin == null) {
                                            leaderWins = 0;
                                        } else {
                                            leaderWins = leaderboardWin.position;
                                        }


                                        
                                        KDA = Math.round(total_kills * 100.0 / total_games) / 100;
                                        seasonKDA = Math.round(seasonKills * 100.0 / total_season_games) / 100;

                                        if (WKills == null) {
                                            kills = 0;
                                        } else {
                                            kills = WKills.value;
                                        }

                                        if(WWins == null){
                                            weekWins = 0;
                                        } else {
                                            weekWins = WWins.value;
                                        }

                                        damagePGame = Math.round(total_damage / total_games);
                                        seasonDamagePGame = Math.round(total_season_damage / total_season_games);
                                        
                                        let wins = Math.round(total_wins * 100 / total_games);
                                        let winsPercentage = wins ;

                                        let seasonWinPercent = Math.round(total_season_wins * 100 / total_season_games);
                                        let seasonWinPercentage = seasonWinPercent;

                                        if (interaction.options.getSubcommand() === 'career') {
                                            interaction.reply(`Getting Career Stats.....`)
                                            const CAN = canvas.createCanvas(1920, 1080);
                                            const context = CAN.getContext('2d');
                                            const applyText = (canvas, text) => {
                                                const context = CAN.getContext('2d');
                                            
                                                // Declare a base size of the font
                                                let fontSize = 70;
                                            
                                                do {
                                                    // Assign the font to the context and decrement it so it can be measured again
                                                    context.font = `${fontSize -= 10}px vintage`;
                                                    // Compare pixel width of the text to the canvas minus the approximate avatar size
                                                } while (context.measureText(text).width > canvas.width - 1920);
                                            
                                                // Return the result to use in the actual canvas
                                                return context.font;
                                            };

                                            const backgroundFile = await readFile('./popOneBGNewish.png');
                                            const background = new canvas.Image();
                                            background.src = backgroundFile;

                                            context.drawImage(background, 0, 0, CAN.width, CAN.height);
                                            context.strokeStyle = '#0099ff';
                                            context.strokeRect(0, 0, CAN.width, CAN.height);
                                            const { body } = await request(statResult.data.accountInfo.titleInfo.avatarUrl);
                                            const avatar = new canvas.Image();
                                            avatar.src = Buffer.from(await body.arrayBuffer());
                                            context.drawImage(avatar, 200, 250, 600, 600);

                                            //DISPLAY NAME
                                            context.font = applyText(canvas, statResult.data.accountInfo.titleInfo.displayName);
                                            context.fillStyle = '#ffffff';
                                            context.textBaseline = 'middle'; 
                                            context.textAllign = 'right';
                                            if(statResult.data.accountInfo.titleInfo.displayName == 'CIC_Detroit.ish') {
                                                context.fillText(`    ${statResult.data.accountInfo.titleInfo.displayName}`, CAN.width / 16.0, CAN.height / 1.15);
                                            } else {
                                                context.fillText(`${statResult.data.accountInfo.titleInfo.displayName}`, CAN.width / 16.0, CAN.height / 1.15);
                                            }

                                            //TOTAL GAMES
                                            context.font = '60px vintage';
                                            context.fillStyle = '#ffffff';
                                            context.fillText(String(total_games), CAN.width / 1.25, CAN.height / 5.2);

                                            //TOTAL WINS
                                            context.font = '60px vintage';
                                            context.fillStyle = '#ffffff';
                                            context.fillText(String(total_wins), CAN.width / 1.25, CAN.height / 2.95);

                                            //AVG KILLS
                                            context.font = '60px vintage';
                                            context.fillStyle = '#ffffff';
                                            context.fillText(String(KDA), CAN.width / 1.25, CAN.height / 2.0);

                                            //AVG DMG
                                            context.font = '60px vintage';
                                            context.fillStyle = '#ffffff';
                                            context.fillText(String(damagePGame), CAN.width / 1.25, CAN.height / 1.53);

                                            //WIN RATE
                                            context.font = '60px vintage';
                                            context.fillStyle = '#ffffff';
                                            context.fillText(`${String(winsPercentage)}%`, CAN.width / 1.25, CAN.height / 1.23);


                                            const attachment = new MessageAttachment(CAN.toBuffer('image/png'), 'profile-image.png');
                                            await wait(5000)
                                            interaction.editReply({ files: [attachment] });
                                        } else if (interaction.options.getSubcommand() === 'daily') {
                                            interaction.reply(`${interaction.user} we are still working on this feature. Please be patient and we will have this working soon!`);
                                        } else if (interaction.options.getSubcommand() === 'weekly') {
                                            const weekEmbed = new MessageEmbed()
                                            .setTitle('Weekly Stats')
                                            .setDescription(`**__Weekly Wins__**\n${weekWins}\n\n**__Weekly Kills__**\n${kills}\n\n**__Wins Leaderboard Position__**\n${leaderWins}\n\n**__Kills Leaderboard Position__**\n${leaderKills}`)
                                            .setColor("GREEN")
                                            .setThumbnail(statResult.data.accountInfo.titleInfo.avatarUrl)
                                            interaction.reply({ embeds: [ weekEmbed ] });
                                        } else if (interaction.options.getSubcommand() === 'season') {
                                            interaction.reply(`Getting Season Stats....`)
                                            const canv = canvas.createCanvas(1920, 1080);
                                            const context = canv.getContext('2d');
                                            const applyText = (canvas, text) => {
                                                const context = canv.getContext('2d');
                                            
                                                // Declare a base size of the font
                                                let fontSize = 70;
                                            
                                                do {
                                                    // Assign the font to the context and decrement it so it can be measured again
                                                    context.font = `${fontSize -= 10}px vintage`;
                                                    // Compare pixel width of the text to the canvas minus the approximate avatar size
                                                } while (context.measureText(text).width > canvas.width - 1920);
                                            
                                                // Return the result to use in the actual canvas
                                                return context.font;
                                            };

                                            const backgroundFile = await readFile('./popOneBGNewish.png');
                                            const background = new canvas.Image();
                                            background.src = backgroundFile;

                                            context.drawImage(background, 0, 0, canv.width, canv.height);
                                            context.strokeStyle = '#0099ff';
                                            context.strokeRect(0, 0, canv.width, canv.height);
                                            const { body } = await request(statResult.data.accountInfo.titleInfo.avatarUrl);
                                            const avatar = new canvas.Image();
                                            avatar.src = Buffer.from(await body.arrayBuffer());
                                            context.drawImage(avatar, 200, 250, 600, 600);

                                            //DISPLAY NAME
                                            context.font = applyText(canvas, statResult.data.accountInfo.titleInfo.displayName);
                                            context.fillStyle = '#ffffff';
                                            context.textBaseline = 'middle'; 
                                            context.textAllign = 'right';
                                            if(statResult.data.accountInfo.titleInfo.displayName == 'CIC_Detroit.ish') {
                                                context.fillText(`    ${statResult.data.accountInfo.titleInfo.displayName}`, canv.width / 16.0, canv.height / 1.15);
                                            } else {
                                                context.fillText(`${statResult.data.accountInfo.titleInfo.displayName}`, canv.width / 16.0, canv.height / 1.15);
                                            }

                                            //TOTAL GAMES
                                            context.font = '60px vintage';
                                            context.fillStyle = '#ffffff';
                                            context.fillText(String(total_season_games), canv.width / 1.25, canv.height / 5.2);

                                            //TOTAL WINS
                                            context.font = '60px vintage';
                                            context.fillStyle = '#ffffff';
                                            context.fillText(String(total_season_wins), canv.width / 1.25, canv.height / 2.95);

                                            //AVG KILLS
                                            context.font = '60px vintage';
                                            context.fillStyle = '#ffffff';
                                            context.fillText(String(seasonKDA), canv.width / 1.25, canv.height / 2.0);

                                            //AVG DMG
                                            context.font = '60px vintage';
                                            context.fillStyle = '#ffffff';
                                            context.fillText(String(seasonDamagePGame), canv.width / 1.25, canv.height / 1.53);

                                            //WIN RATE
                                            context.font = '60px vintage';
                                            context.fillStyle = '#ffffff';
                                            context.fillText(`${String(seasonWinPercentage)}%`, canv.width / 1.25, canv.height / 1.23);


                                            const attachment = new MessageAttachment(canv.toBuffer('image/png'), 'profile-image.png');
                                            await wait(5000)
                                            interaction.editReply({ files: [attachment] });
                                        }
                                    });
                                });
                            });
                        }
                    }
                });
            } catch(err) {
                if(err) interaction.reply(`${interaction.user} it looks like you may have entered your in game name wrong. Please contact NMC.GHOST.RECON.TTV for further instructions.`)
            }
        }
}