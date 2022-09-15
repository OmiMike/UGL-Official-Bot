const { SlashCommandBuilder } = require('@discordjs/builders');
const { Interaction } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription('Register Your Team for UGL Official')
        .addSubcommand(subcommand =>
            subcommand
                .setName('solos')
                .setDescription('Select Solos to register in solos league for UGL')
                .addUserOption(option => 
                    option
                    .setName('discord_username')
                    .setDescription('Select your name from the list. If it does not show up start typing your discord name.')
                    .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('duos')
                .setDescription('Select Duos to register for Duos in UGL')
                .addStringOption((team_name) => {
                    return team_name
                        .setName('team')
                        .setDescription('Tell us what your Team Name will be.')
                        .setRequired(true)
                })
                .addUserOption((user) => {
                    return user
                        .setName('user')
                        .setDescription('Your Username')
                        .setRequired(true)
                })
                .addUserOption((user1) => {
                    return user1
                        .setName('teammate')
                        .setDescription('Your Partners Username')
                        .setRequired(true)
                })
                .addUserOption((sub) => {
                    return sub
                        .setName('sub')
                        .setDescription('1st Sub')
                })
                .addUserOption((sub1) => {
                    return sub1
                        .setName('sub2')
                        .setDescription('2nd Sub')
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
                .addUserOption((user_squad) => {
                    return user_squad
                        .setName('user_squad')
                        .setDescription('Your Username')
                        .setRequired(true)
                })
                .addUserOption((user1_squad) => {
                    return user1_squad
                        .setName('teammate1_squads')
                        .setDescription('Your 1st Teammate')
                        .setRequired(true)
                })
                .addUserOption((user2_squad) => {
                    return user2_squad
                        .setName('teammate2_squads')
                        .setDescription('Your 2nd Teammate')
                        .setRequired(true)
                })
                .addUserOption((sub1_squad) => {
                    return sub1_squad
                        .setName('sub1_squads')
                        .setDescription('1st Sub')
                })
                .addUserOption((sub2_squad) => {
                    return sub2_squad
                        .setName('sub2_squads')
                        .setDescription('2nd Sub')
                })
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('scrims')
                .setDescription('Info about the server')
                .addStringOption(option =>
                    option
                        .setName('mode')
                        .setDescription('Pick a day and Time')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Duos', value: 'Duo' },
                            { name: 'Squads', value: 'Squad'},
                        )
                )
                .addStringOption((team_name_scrim) => {
                    return team_name_scrim
                        .setName('team_name_scrim')
                        .setDescription('Your Team Name')
                        .setRequired(true)
                })
                .addUserOption((user_scrim) => {
                    return user_scrim
                        .setName('user_scrim')
                        .setDescription('Your Username')
                        .setRequired(true)
                })
                .addUserOption((user1_scrim) => {
                    return user1_scrim
                        .setName('teammate1_scrim')
                        .setDescription('Your 1st Teammate')
                        .setRequired(true)
                })
                .addUserOption((user2_scrim) => {
                    return user2_scrim
                        .setName('teammate2_scrim')
                        .setDescription('Your 1st Teammate')
                })
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('events')
                .setDescription('Info about the server')
                .addStringOption(option =>
                    option
                        .setName('event_mode')
                        .setDescription('Pick a day and Time')
                        .setRequired(true)
                        .addChoices(
                            { name: '1v1s', value: '1v1s' },
                        )
                )
                .addStringOption(option =>
                    option
                        .setName('ign_event')
                        .setDescription('Enter your in game name')
                        .setRequired(true)
                )
                .addUserOption((user_event) => {
                    return user_event
                        .setName('user_event')
                        .setDescription('Your Username')
                        .setRequired(true)
                })
        ),

        async execute(interaction,client) {
            //solos
            const soloUser = interaction.options.getString('ign');
            const solo = interaction.options.getUser('discord_username') ?? interaction.user;
            //duos
            const duo = interaction.options.getString('duos');
            const teamName = interaction.options.getString('team');
            const player1 = interaction.options.getUser('user') ?? interaction.user;
            const player1_ign = interaction.options.getString('player_one_ign');
            const player2 = interaction.options.getUser('teammate');
            const player2_ign = interaction.options.getString('player_two_ign');
            const subPlayer1 = interaction.options.getUser('sub');
            const subPlayer2 = interaction.options.getUser('sub2');
            //squads
            const squad = interaction.options.getString('squads');
            const teamNameSquads = interaction.options.getString('team_name');
            const player1Squads = interaction.options.getUser('user_squads') ?? interaction.user;
            const player2Squads = interaction.options.getUser('teammate1_squads');
            const player3Squads = interaction.options.getUser('teammate2_squads');
            const sub1Squads = interaction.options.getUser('sub1_squads');
            const sub2Squads = interaction.options.getUser('sub2_squads');
            //scrims
            const scrims = interaction.options.getString('scrims');
            const scrimMode = interaction.options.getString('mode')
            const scrimTeamName = interaction.options.getString('team_name_scrim');
            const scrimPlayer1 = interaction.options.getUser('user_scrim');
            const scrimPlayer2 = interaction.options.getUser('teammate1_scrim');
            const scrimPlayer3 = interaction.options.getUser('teammate2_scrim');
            //1v1 Event
            const event1v1 = interaction.options.getString('events');
            const eventMode = interaction.options.getString('event_mode');
            const eventIGN = interaction.options.getString('ign_event');
            const eventUsername = interaction.options.getUser('user_event');

            if(interaction.guild.id != '899801075786342480') {
                interaction.reply(`${interaction.user} this command is used in UGL only!`)
            } else {
                client.db.query("SELECT * FROM player_stats WHERE discordID= '" + interaction.user.id + "';", async function(err,psRows) {
                    if(interaction.options.getSubcommand() === 'solos') {
                        if(interaction.channel.id == '956026367269556295') {
                            client.db.query("SELECT * FROM solos_season_four WHERE discordID= '" + solo.id + "' AND ign= '" + soloUser + "';", async function(err,rows) {
                                client.db.query("SELECT * FROM solos_lobby_notifications;", async function(err,reg) {
                                    client.db.query("SELECT * FROM player_stats WHERE discordID = '" + interaction.user.id + "';", async function (err,psSolos) {
                                        if(psSolos[0] == null) {
                                            interaction.reply(`${interaction.user} please register your ID with our **/id** command to register for Solos`)
                                        } else {
                                            if(reg[0].solo_registration == 1) {
                                                if(rows[0] == null) {
                                                    const role = interaction.guild.roles.cache.find(sRole => sRole.id === "917084509424455775");
                                                    interaction.member.roles.add(role);
                                                    client.db.query("INSERT INTO solos_season_four (discordID, ign) VALUES ('" + interaction.user.id + "','" + psSolos[0].in_game_name + "');");
                                                    interaction.reply(`${interaction.user} has been registered for Solos Season 4`);
                                                } else {
                                                    interaction.reply(`${interaction.user} you have already registered for Solos Season 4`);
                                                }
                                            } else {
                                                interaction.reply(`${interaction.user} registration is not open at this time. Please wait until it is opened up by an Admin.`);
                                            }
                                        }
                                    });
                                });
                            });
                        } else {
                            interaction.reply(`${interaction.user} Please use <#956026367269556295> to register for Solos`);
                        }
                    } else if(interaction.options.getSubcommand() === 'duos') {
                        if(interaction.channel.id == '956026367269556295') {
                            client.db.query("SELECT * FROM duos_season_two WHERE discordID= '" + player1.id + "' OR team_mateID= '" + interaction.user.id + "';", async function(err,dRows) {
                                client.db.query("SELECT * FROM duos_season_two;", async function(err,teamMate) {
                                    client.db.query("SELECT * FROM duos_lobby_notifications;", async function(err,reg) {
                                        client.db.query("SELECT * FROM player_stats WHERE discordID = '" + player1.id + "';", async function (err,psDuos1) {
                                            client.db.query("SELECT * FROM player_stats WHERE discordID = '" + player2.id + "';", async function (err,psDuos2) {
                                                if(psDuos1[0] == null) {
                                                    interaction.reply(`Sorry ${interaction.user} you must first enter your ID with our **/id** command before registering. All members must do the same to register in UGL.`)
                                                } else if (psDuos2[0] == null) {
                                                    interaction.reply(`${interaction.user} ${player2} needs to enter their in game name with UGL Official Bot with our **/id** command.`)
                                                } else {
                                                    if(reg[0].duo_registration == 1) {
                                                        if(dRows[0] == null) {
                                                            const dRole = interaction.guild.roles.cache.find(dRoles => dRoles.id === "977328896544497674");
                                                            interaction.member.roles.add(dRole)

                                                            const playersd2Role = interaction.guild.members.cache.get(player2.id);
                                                            playersd2Role.roles.add(dRole);

                                                            client.db.query("INSERT INTO duos_season_two (team_name, discordID, team_mateID, player_one_ign, player_two_ign) VALUES ('" + teamName + "','" + player1.id + "','" + player2.id + "','" + psDuos1[0].in_game_name + "','" + psDuos2[0].in_game_name + "');");
                                                            interaction.reply(`${player1} & ${player2} has registered ${teamName} for Duos Season 2`);
                                                        } else {
                                                            interaction.reply(`${interaction.user} ${teamName} has already been registered for Duos Season 2`);
                                                        }
                                                    } else {
                                                        interaction.reply(`${interaction.user} registration is not open at this time. Please wait until it is opened up by an Admin.`);
                                                    }
                                                }
                                            });
                                        });
                                    });
                                });
                            });
                        } else {
                            interaction.reply(`${interaction.user} Please use <#956026367269556295> to register for Duos`);
                        }
                    } else if(interaction.options.getSubcommand() === 'squads') {
                        client.db.query("SELECT * FROM squads WHERE player_one= '" + player1Squads.id + "' OR player_two= '" + interaction.user.id + "' OR player_three= '" + interaction.user.id + "' AND team_name= '" + teamNameSquads + "';", async function(err,sRows) {
                            client.db.query("SELECT * FROM player_stats WHERE discordID = '" + interaction.user.id + "';", async function (err,psRows) {
                                client.db.query("SELECT * FROM player_stats WHERE discordID = '" + player2Squads.id + "';", async function (err,ps1Rows) {
                                    client.db.query("SELECT * FROM player_stats WHERE discordID = '" + player3Squads.id + "';", async function (err,ps2Rows) {
                                        client.db.query("SELECT * FROM squads_lobby_notifications;", async function(err,squadRegistration) {
                                            if(squadRegistration[0].squad_register == 1) {
                                                if(psRows[0] == null) {
                                                    interaction.reply(`Sorry ${interaction.user} you must first enter your ID with our **/id** command before registering. All members must do the same to register in UGL.`)
                                                } else if (ps1Rows[0] == null) {
                                                    interaction.reply(`${interaction.user} ${player2Squads} needs to enter their in game name with UGL Official Bot with our **/id** command.`)
                                                } else if (ps2Rows[0] == null) {
                                                    interaction.reply(`${interaction.user} ${player3Squads} needs to enter their in game name with UGL Official Bot with our **/id** command.`)
                                                } else {
                                                    if(sRows[0] == null) {
                                                        const sRole = interaction.guild.roles.cache.find(sRoles => sRoles.id === "995561554370105394");
                                                        interaction.member.roles.add(sRole)

                                                        const players2Role = interaction.guild.members.cache.get(player2Squads.id);
                                                        players2Role.roles.add(sRole);
                                                        const players3Role = interaction.guild.members.cache.get(player3Squads.id);
                                                        players3Role.roles.add(sRole);

                                                        client.db.query("INSERT INTO squads (team_name, player_one_ign, player_two_ign, player_three_ign, player_one, player_two, player_three) VALUES ('" + teamNameSquads + "','" + psRows[0].in_game_name + "','" + ps1Rows[0].in_game_name + "','" + ps2Rows[0].in_game_name + "','" + player1Squads.id + "','" + player2Squads.id + "','" + player3Squads.id + "');");
                                                        interaction.reply(`${player1Squads}, ${player2Squads} & ${player3Squads} is now registered on ${teamNameSquads}`);
                                                    } else {
                                                        interaction.reply(`${player1} you and your squad have already been registered for Squad Qualifiers`);
                                                    }
                                                }
                                            } else {
                                                interaction.reply(`${interaction.user} Please use <#956026367269556295> to register for Squads`);
                                            }
                                        });
                                    });
                                });
                            });
                        });
                    } else if(interaction.options.getSubcommand() === 'scrims') {
                        client.db.query("SELECT * FROM guild_settings WHERE guild_ID= '" + interaction.guild.id + "';", async function(err,scrim) {
                            if(scrim[0].scrim_registration == 1) {
                                if(interaction.channel.id == '938830765398052874') {
                                    if(scrimMode == 'Duo') {
                                        interaction.reply(`NEW ${scrimMode} SCRIMS REGISTRATION\n${scrimPlayer1} & ${scrimPlayer2} has registered with team name as ${scrimTeamName}`);
                                    } else if(scrimMode == 'Squad') {
                                        interaction.reply(`NEW ${scrimMode} SCRIMS REGISTRATION\n${scrimPlayer1} ${scrimPlayer2} & ${scrimPlayer3} has registered with team name as ${scrimTeamName}`);
                                    }
                                } else {
                                    interaction.reply(`${interaction.user} Please use <#938830765398052874> to register for Scrims`);
                                }
                            } else {
                                interaction.reply(`${interaction.user} scrim registration is currently closed at this time. Please refer to <#989904585466449921> for times, dates and modes.`);
                            }
                        });
                    } else if(interaction.options.getSubcommand() === 'events') {
                        if(interaction.channel.id == '956026367269556295') {
                            client.db.query("SELECT * FROM one_v_one WHERE discord_ID= '" + eventUsername.id + "' AND ign= '" + eventIGN + "';", async function(err,eRows) {
                                client.db.query("SELECT * FROM guild_settings WHERE guild_ID= '" + interaction.guild.id + "';", async function(err,reg) {
                                    if(reg[0].one_v_one == 1) {
                                        if(eRows[0] == null) {
                                            if(eventMode == '1v1s') {
                                                const eRole = interaction.guild.roles.cache.find(eRoles => eRoles.id === "994762419601678418");
                                                interaction.member.roles.add(eRole)
                                                client.db.query("INSERT INTO one_v_one (discord_ID, ign, discord_username) VALUES ('" + eventUsername.id + "','" + eventIGN + "','" + interaction.user.username + "');");
                                                interaction.reply(`${interaction.user} you have been entered into the 1v1 event successfully! Please stay tuned for further instructions.`);
                                            }
                                        } else {
                                            interaction.reply(`You have already been registered for the 1v1 Event`);
                                        }
                                    } else {
                                        interaction.reply(`${interaction.user} registration is not open at this time. Please wait until it is opened up by an Admin.`);
                                    }
                                });
                            });
                        } else {
                            interaction.reply(`${interaction.user} Please use <#956026367269556295> to register for Who Wants the Smoke 1v1 Tournament`);
                        }
                    } else if(interaction.options.getSubcommand() === 'tdm') {
                        client.db.query("SELECT * FROM tdm WHERE player_one= '" + player1tdm.id + "' AND team_name= '" + teamNametdm + "';", async function(err,tRows) {
                            if(tRows[0] == null) {
                                const tRole = interaction.guild.roles.cache.find(tRoles => tRoles.id === "999139013212504084");
                                interaction.member.roles.add(tRole)

                                const player2Role = interaction.guild.members.cache.get(player2tdm.id);
                                player2Role.roles.add(tRole);
                                const player3Role = interaction.guild.members.cache.get(player3tdm.id);
                                player3Role.roles.add(tRole);
                                const player4Role = interaction.guild.members.cache.get(player4tdm.id);
                                player4Role.roles.add(tRole);
                                const player5Role = interaction.guild.members.cache.get(player5tdm.id);
                                player5Role.roles.add(tRole);

                                client.db.query("INSERT INTO tdm (team_name, player_one, player_two, player_three, player_four, player_five) VALUES ('" + teamNametdm + "','" + player1tdm.id + "','" + player2tdm.id + "','" + player3tdm.id + "','" + player4tdm.id + "','" + player5tdm.id + "');");
                                interaction.reply(`${player1tdm} ${player2tdm} ${player3tdm} ${player4tdm} & ${player5tdm} has been registered on ${teamNametdm} for Team Deathmatch`);
                            } else {
                                interaction.reply(`${player1tdm} you and your squad have already been registered for Team Deathmatch`);
                            }
                        });
                    }
                });
            }           
        }
}