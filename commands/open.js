const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('channel')
        .setDescription('Open or Close a channel for Check in & Registration')
        .addSubcommand(subcommand =>
            subcommand
                .setName('open')
                .setDescription('Open a channel for Check ins or Registration')
                .addStringOption(option =>
                    option
                        .setName('options')
                        .setDescription('Pick an Option')
                        .setRequired(true)
                        .addChoices(
                            { name: 'CheckIn', value: 'CheckIn' },
                            { name: 'Registration', value: 'Registration'},
                        )
                )
                .addStringOption(option =>
                    option
                        .setName('mode')
                        .setDescription('Pick a Mode')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Solos', value: 'Solos' },
                            { name: 'Duos', value: 'Duos'},
                            { name: 'Squads', value: 'Squads'},
                            { name: 'Scrims', value: 'Scrims'},
                            { name: '1v1 Event', value: '1v1 Event'},
                        )
                )
                .addStringOption(option =>
                    option
                        .setName('lobby')
                        .setDescription('Pick a Lobby')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Lobby A', value: '1' },
                            { name: 'Lobby B', value: '2'},
                            { name: 'Lobby C', value: '3' },
                            { name: 'Lobby D', value: '4'},
                            { name: 'Lobby E', value: '5' },
                            { name: 'Lobby F', value: '6'},
                            { name: 'Lobby G', value: '7'},
                            { name: 'Lobby H', value: '8'},
                            { name: 'Lobby I', value: '9'},
                        )
                )
                .addChannelOption(option =>
                    option
                        .setName('channelname')
                        .setDescription('Pick a day and Time')
                        .setRequired(true)
                )
        ),

        async execute(interaction,client) {
            const Options = interaction.options.getString('options');
            const Mode = interaction.options.getString('mode');
            const TheChannel = interaction.options.getChannel('channelname');
            const TheLobby = interaction.options.getString('lobby');
            
            if(interaction.options.getSubcommand() === 'open') {
                client.db.query("SELECT * FROM solos_lobby_notifications;", async function(err,rows) {
                    client.db.query("SELECT * FROM duos_lobby_notifications;", async function(err,duoRows) {
                        client.db.query("SELECT * FROM squads_lobby_notifications;", async function(err,squadRows) {
                            client.db.query("SELECT * FROM guild_settings WHERE guild_ID= '" + interaction.guild.id + "';", async function(err,scrims){
                                const channelToSend = client.channels.cache.get(TheChannel.id);
                                if(!interaction.member.roles.cache.some((role) => role.id == '907042996128723036')) {
                                    interaction.reply(`You do not have permissions to use this command`)
                                } else {
                                    if (Mode == 'Solos') {
                                        var lobbyToNotify = "";
                                        if(Options == 'CheckIn') {
                                            if(rows[0].lobby_a == '0') {
                                                if (TheLobby == '1') {
                                                    lobbyToNotify = "A";
                                                    interaction.reply(`${interaction.user} ${Options} has been opened in ${TheChannel} for ${Mode} for Lobby ${lobbyToNotify}!`);
                                                    channelToSend.send(`<:Solos:917088503127506994> :no_entry:    **${Options} has been opened for ${Mode} in Lobby ${lobbyToNotify}**   :no_entry: <:Solos:917088503127506994> `);
                                                    client.db.query("UPDATE solos_lobby_notifications SET `lobby_a`= '1';");
                                                }
                                            } else {
                                                if (TheLobby == '1') {
                                                    lobbyToNotify = "A";
                                                    interaction.reply(`${interaction.user} ${Options} has been closed in ${TheChannel} for ${Mode} for Lobby ${lobbyToNotify}!`);
                                                    channelToSend.send(`<:Solos:917088503127506994> :no_entry:    **${Options} has been closed for ${Mode} in Lobby ${lobbyToNotify}**   :no_entry: <:Solos:917088503127506994> `);
                                                    client.db.query("UPDATE solos_lobby_notifications SET `lobby_a`= '0';");
                                                }
                                            }
                                            if(rows[0].lobby_b == '0') {
                                                if (TheLobby == '2') {
                                                    lobbyToNotify = "B";
                                                    interaction.reply(`${interaction.user} ${Options} has been opened in ${TheChannel} for ${Mode} for Lobby ${lobbyToNotify}!`);
                                                    channelToSend.send(`<:Solos:917088503127506994> :no_entry:    **${Options} has been opened for ${Mode} in Lobby ${lobbyToNotify}**   :no_entry: <:Solos:917088503127506994> `);
                                                    client.db.query("UPDATE solos_lobby_notifications SET `lobby_b`= '2';");
                                                }
                                            } else {
                                                if (TheLobby == '2') {
                                                    lobbyToNotify = "B";
                                                    interaction.reply(`${interaction.user} ${Options} has been closed in ${TheChannel} for ${Mode} for Lobby ${lobbyToNotify}!`);
                                                    channelToSend.send(`<:Solos:917088503127506994> :no_entry:    **${Options} has been closed for ${Mode} in Lobby ${lobbyToNotify}**   :no_entry: <:Solos:917088503127506994> `);
                                                    client.db.query("UPDATE solos_lobby_notifications SET `lobby_b`= '0';");
                                                }
                                            }
                                            if(rows[0].lobby_c == '0') {
                                                if (TheLobby == '3') {
                                                    lobbyToNotify = "C";
                                                    interaction.reply(`${interaction.user} ${Options} has been opened in ${TheChannel} for ${Mode} for Lobby ${lobbyToNotify}!`);
                                                    channelToSend.send(`<:Solos:917088503127506994> :no_entry:    **${Options} has been opened for ${Mode} in Lobby ${lobbyToNotify}**   :no_entry: <:Solos:917088503127506994> `);
                                                    client.db.query("UPDATE solos_lobby_notifications SET `lobby_c`= '3';");
                                                }
                                            } else {
                                                if (TheLobby == '3') {
                                                    lobbyToNotify = "C";
                                                    interaction.reply(`${interaction.user} ${Options} has been closed in ${TheChannel} for ${Mode} for Lobby ${lobbyToNotify}!`);
                                                    channelToSend.send(`<:Solos:917088503127506994> :no_entry:    **${Options} has been closed for ${Mode} in Lobby ${lobbyToNotify}**   :no_entry: <:Solos:917088503127506994> `);
                                                    client.db.query("UPDATE solos_lobby_notifications SET `lobby_c`= '0';");
                                                }
                                            }
                                            if(rows[0].lobby_d == '0') {
                                                if (TheLobby == '4') {
                                                    lobbyToNotify = "D";
                                                    interaction.reply(`${interaction.user} ${Options} has been opened in ${TheChannel} for ${Mode} for Lobby ${lobbyToNotify}!`);
                                                    channelToSend.send(`<:Solos:917088503127506994> :no_entry:    **${Options} has been opened for ${Mode} in Lobby ${lobbyToNotify}**   :no_entry: <:Solos:917088503127506994> `);
                                                    client.db.query("UPDATE solos_lobby_notifications SET `lobby_d`= '4';");
                                                }
                                            } else {
                                                if (TheLobby == '4') {
                                                    lobbyToNotify = "D";
                                                    interaction.reply(`${interaction.user} ${Options} has been closed in ${TheChannel} for ${Mode} for Lobby ${lobbyToNotify}!`);
                                                    channelToSend.send(`<:Solos:917088503127506994> :no_entry:    **${Options} has been closed for ${Mode} in Lobby ${lobbyToNotify}**   :no_entry: <:Solos:917088503127506994> `);
                                                    client.db.query("UPDATE solos_lobby_notifications SET `lobby_d`= '0';");
                                                }
                                            }
                                            if(rows[0].lobby_e == '0') {
                                                if (TheLobby == '5') {
                                                    lobbyToNotify = "E";
                                                    interaction.reply(`${interaction.user} ${Options} has been opened in ${TheChannel} for ${Mode} for Lobby ${lobbyToNotify}!`);
                                                    channelToSend.send(`<:Solos:917088503127506994> :no_entry:    **${Options} has been opened for ${Mode} in Lobby ${lobbyToNotify}**   :no_entry: <:Solos:917088503127506994> `);
                                                    client.db.query("UPDATE solos_lobby_notifications SET `lobby_e`= '5';");
                                                }
                                            } else {
                                                if (TheLobby == '5') {
                                                    lobbyToNotify = "E";
                                                    interaction.reply(`${interaction.user} ${Options} has been closed in ${TheChannel} for ${Mode} for Lobby ${lobbyToNotify}!`);
                                                    channelToSend.send(`<:Solos:917088503127506994> :no_entry:    **${Options} has been closed for ${Mode} in Lobby ${lobbyToNotify}**   :no_entry: <:Solos:917088503127506994> `);
                                                    client.db.query("UPDATE solos_lobby_notifications SET `lobby_e`= '0';");
                                                }
                                            }
                                            if(rows[0].lobby_f == '0') {
                                                if (TheLobby == '6') {
                                                    lobbyToNotify = "F";
                                                    interaction.reply(`${interaction.user} ${Options} has been opened in ${TheChannel} for ${Mode} for Lobby ${lobbyToNotify}!`);
                                                    channelToSend.send(`<:Solos:917088503127506994> :no_entry:    **${Options} has been opened for ${Mode} in Lobby ${lobbyToNotify}**   :no_entry: <:Solos:917088503127506994> `);
                                                    client.db.query("UPDATE solos_lobby_notifications SET `lobby_f`= '6';");
                                                }
                                            } else {
                                                if (TheLobby == '6') {
                                                    lobbyToNotify = "F";
                                                    interaction.reply(`${interaction.user} ${Options} has been closed in ${TheChannel} for ${Mode} for Lobby ${lobbyToNotify}!`);
                                                    channelToSend.send(`<:Solos:917088503127506994> :no_entry:    **${Options} has been closed for ${Mode} in Lobby ${lobbyToNotify}**   :no_entry: <:Solos:917088503127506994> `);
                                                    client.db.query("UPDATE solos_lobby_notifications SET `lobby_f`= '0';");
                                                }
                                            }
                                            if(rows[0].lobby_g == '0') {
                                                if (TheLobby == '7') {
                                                    lobbyToNotify = "G";
                                                    interaction.reply(`${interaction.user} ${Options} has been opened in ${TheChannel} for ${Mode} for Lobby ${lobbyToNotify}!`);
                                                    channelToSend.send(`<:Solos:917088503127506994> :no_entry:    **${Options} has been opened for ${Mode} in Lobby ${lobbyToNotify}**   :no_entry: <:Solos:917088503127506994> `);
                                                    client.db.query("UPDATE solos_lobby_notifications SET `lobby_g`= '7';");
                                                }
                                            } else {
                                                if (TheLobby == '7') {
                                                    lobbyToNotify = "G";
                                                    interaction.reply(`${interaction.user} ${Options} has been closed in ${TheChannel} for ${Mode} for Lobby ${lobbyToNotify}!`);
                                                    channelToSend.send(`<:Solos:917088503127506994> :no_entry:    **${Options} has been closed for ${Mode} in Lobby ${lobbyToNotify}**   :no_entry: <:Solos:917088503127506994> `);
                                                    client.db.query("UPDATE solos_lobby_notifications SET `lobby_g`= '0';");
                                                }
                                            }
                                            if(rows[0].lobby_h == '0') {
                                                if (TheLobby == '8') {
                                                    lobbyToNotify = "H";
                                                    interaction.reply(`${interaction.user} ${Options} has been opened in ${TheChannel} for ${Mode} for Lobby ${lobbyToNotify}!`);
                                                    channelToSend.send(`<:Solos:917088503127506994> :no_entry:    **${Options} has been opened for ${Mode} in Lobby ${lobbyToNotify}**   :no_entry: <:Solos:917088503127506994> `);
                                                    client.db.query("UPDATE solos_lobby_notifications SET `lobby_h`= '8';");
                                                }
                                            } else {
                                                if (TheLobby == '8') {
                                                    lobbyToNotify = "H";
                                                    interaction.reply(`${interaction.user} ${Options} has been closed in ${TheChannel} for ${Mode} for Lobby ${lobbyToNotify}!`);
                                                    channelToSend.send(`<:Solos:917088503127506994> :no_entry:    **${Options} has been closed for ${Mode} in Lobby ${lobbyToNotify}**   :no_entry: <:Solos:917088503127506994> `);
                                                    client.db.query("UPDATE solos_lobby_notifications SET `lobby_h`= '0';");
                                                }
                                            }
                                            if(rows[0].lobby_i == '0') {
                                                if (TheLobby == '9') {
                                                    lobbyToNotify = "I";
                                                    interaction.reply(`${interaction.user} ${Options} has been opened in ${TheChannel} for ${Mode} for Lobby ${lobbyToNotify}!`);
                                                    channelToSend.send(`<:Solos:917088503127506994> :no_entry:    **${Options} has been opened for ${Mode} in Lobby ${lobbyToNotify}**   :no_entry: <:Solos:917088503127506994> `);
                                                    client.db.query("UPDATE solos_lobby_notifications SET `lobby_i`= '9';");
                                                }
                                            } else {
                                                if (TheLobby == '9') {
                                                    lobbyToNotify = "I";
                                                    interaction.reply(`${interaction.user} ${Options} has been closed in ${TheChannel} for ${Mode} for Lobby ${lobbyToNotify}!`);
                                                    channelToSend.send(`<:Solos:917088503127506994> :no_entry:    **${Options} has been closed for ${Mode} in Lobby ${lobbyToNotify}**   :no_entry: <:Solos:917088503127506994> `);
                                                    client.db.query("UPDATE solos_lobby_notifications SET `lobby_i`= '0';");
                                                }
                                            }
                                        } else if (Options == 'Registration') {
                                            if(rows[0].solo_registration == '0') {
                                                interaction.reply(`${interaction.user} ${Options} has been opened in ${TheChannel} for ${Mode}`);
                                                channelToSend.send(`${Options} has been opened for ${Mode}!`);
                                                client.db.query("UPDATE solos_lobby_notifications SET `solo_registration`= '1';");
                                            } else {
                                                interaction.reply(`${interaction.user} ${Options} has been closed in ${TheChannel} for ${Mode}`);
                                                channelToSend.send(`${Options} has been closed for ${Mode}!`);
                                                client.db.query("UPDATE solos_lobby_notifications SET `solo_registration`= '0';");
                                            }
                                        }
                                    } else if (Mode == 'Duos') {
                                        if(Options == 'CheckIn') {
                                            if(duoRows[0].lobby_a == '0') {
                                                if (TheLobby == '1') {
                                                    lobbyToNotify = "A";
                                                    interaction.reply(`${interaction.user} ${Options} has been opened in ${TheChannel} for ${Mode} for Lobby ${lobbyToNotify}!`);
                                                    channelToSend.send(`<:duos:917088503228141639> :no_entry:    **${Options} has been opened for ${Mode} in Lobby ${lobbyToNotify}**   :no_entry: <:duos:917088503228141639> `);
                                                    client.db.query("UPDATE duos_lobby_notifications SET `lobby_a`= '1';");
                                                }
                                            } else {
                                                if (TheLobby == '1') {
                                                    lobbyToNotify = "A";
                                                    interaction.reply(`${interaction.user} ${Options} has been closed in ${TheChannel} for ${Mode} for Lobby ${lobbyToNotify}!`);
                                                    channelToSend.send(`<:duos:917088503228141639> :no_entry:    **${Options} has been closed for ${Mode} in Lobby ${lobbyToNotify}**   :no_entry: <:duos:917088503228141639> `);
                                                    client.db.query("UPDATE duos_lobby_notifications SET `lobby_a`= '0';");
                                                }
                                            }
                                            if(duoRows[0].lobby_b == '0') {
                                                if (TheLobby == '2') {
                                                    lobbyToNotify = "B";
                                                    interaction.reply(`${interaction.user} ${Options} has been opened in ${TheChannel} for ${Mode} for Lobby ${lobbyToNotify}!`);
                                                    channelToSend.send(`<:duos:917088503228141639> :no_entry:    **${Options} has been opened for ${Mode} in Lobby ${lobbyToNotify}**   :no_entry: <:duos:917088503228141639> `);
                                                    client.db.query("UPDATE duos_lobby_notifications SET `lobby_b`= '2';");
                                                }
                                            } else {
                                                if (TheLobby == '2') {
                                                    lobbyToNotify = "B";
                                                    interaction.reply(`${interaction.user} ${Options} has been closed in ${TheChannel} for ${Mode} for Lobby ${lobbyToNotify}!`);
                                                    channelToSend.send(`<:duos:917088503228141639> :no_entry:    **${Options} has been closed for ${Mode} in Lobby ${lobbyToNotify}**   :no_entry: <:duos:917088503228141639> `);
                                                    client.db.query("UPDATE duos_lobby_notifications SET `lobby_b`= '0';");
                                                }
                                            }
                                            if(duoRows[0].lobby_c == '0') {
                                                if (TheLobby == '3') {
                                                    lobbyToNotify = "C";
                                                    interaction.reply(`${interaction.user} ${Options} has been opened in ${TheChannel} for ${Mode} for Lobby ${lobbyToNotify}!`);
                                                    channelToSend.send(`<:duos:917088503228141639> :no_entry:    **${Options} has been opened for ${Mode} in Lobby ${lobbyToNotify}**   :no_entry: <:duos:917088503228141639> `);
                                                    client.db.query("UPDATE duos_lobby_notifications SET `lobby_c`= '3';");
                                                }
                                            } else {
                                                if (TheLobby == '3') {
                                                    lobbyToNotify = "C";
                                                    interaction.reply(`${interaction.user} ${Options} has been closed in ${TheChannel} for ${Mode} for Lobby ${lobbyToNotify}!`);
                                                    channelToSend.send(`<:duos:917088503228141639> :no_entry:    **${Options} has been closed for ${Mode} in Lobby ${lobbyToNotify}**   :no_entry: <:duos:917088503228141639> `);
                                                    client.db.query("UPDATE duos_lobby_notifications SET `lobby_c`= '0';");
                                                }
                                            }
                                            if(duoRows[0].lobby_d == '0') {
                                                if (TheLobby == '4') {
                                                    lobbyToNotify = "D";
                                                    interaction.reply(`${interaction.user} ${Options} has been opened in ${TheChannel} for ${Mode} for Lobby ${lobbyToNotify}!`);
                                                    channelToSend.send(`<:duos:917088503228141639> :no_entry:    **${Options} has been opened for ${Mode} in Lobby ${lobbyToNotify}**   :no_entry: <:duos:917088503228141639> `);
                                                    client.db.query("UPDATE duos_lobby_notifications SET `lobby_d`= '4';");
                                                }
                                            } else {
                                                if (TheLobby == '4') {
                                                    lobbyToNotify = "D";
                                                    interaction.reply(`${interaction.user} ${Options} has been closed in ${TheChannel} for ${Mode} for Lobby ${lobbyToNotify}!`);
                                                    channelToSend.send(`<:duos:917088503228141639> :no_entry:    **${Options} has been closed for ${Mode} in Lobby ${lobbyToNotify}**   :no_entry: <:duos:917088503228141639> `);
                                                    client.db.query("UPDATE duos_lobby_notifications SET `lobby_d`= '0';");
                                                }
                                            }
                                            if(duoRows[0].lobby_e == '0') {
                                                if (TheLobby == '5') {
                                                    lobbyToNotify = "E";
                                                    interaction.reply(`${interaction.user} ${Options} has been opened in ${TheChannel} for ${Mode} for Lobby ${lobbyToNotify}!`);
                                                    channelToSend.send(`<:duos:917088503228141639> :no_entry:    **${Options} has been opened for ${Mode} in Lobby ${lobbyToNotify}**   :no_entry: <:duos:917088503228141639> `);
                                                    client.db.query("UPDATE duos_lobby_notifications SET `lobby_e`= '5';");
                                                }
                                            } else {
                                                if (TheLobby == '5') {
                                                    lobbyToNotify = "E";
                                                    interaction.reply(`${interaction.user} ${Options} has been closed in ${TheChannel} for ${Mode} for Lobby ${lobbyToNotify}!`);
                                                    channelToSend.send(`<:duos:917088503228141639> :no_entry:    **${Options} has been closed for ${Mode} in Lobby ${lobbyToNotify}**   :no_entry: <:duos:917088503228141639> `);
                                                    client.db.query("UPDATE duos_lobby_notifications SET `lobby_e`= '0';");
                                                }
                                            }
                                            if(duoRows[0].lobby_f == '0') {
                                                if (TheLobby == '6') {
                                                    lobbyToNotify = "F";
                                                    interaction.reply(`${interaction.user} ${Options} has been opened in ${TheChannel} for ${Mode} for Lobby ${lobbyToNotify}!`);
                                                    channelToSend.send(`<:duos:917088503228141639> :no_entry:    **${Options} has been opened for ${Mode} in Lobby ${lobbyToNotify}**   :no_entry: <:duos:917088503228141639> `);
                                                    client.db.query("UPDATE duos_lobby_notifications SET `lobby_f`= '6';");
                                                }
                                            } else {
                                                if (TheLobby == '6') {
                                                    lobbyToNotify = "F";
                                                    interaction.reply(`${interaction.user} ${Options} has been closed in ${TheChannel} for ${Mode} for Lobby ${lobbyToNotify}!`);
                                                    channelToSend.send(`<:duos:917088503228141639> :no_entry:    **${Options} has been closed for ${Mode} in Lobby ${lobbyToNotify}**   :no_entry: <:duos:917088503228141639> `);
                                                    client.db.query("UPDATE duos_lobby_notifications SET `lobby_f`= '0';");
                                                }
                                            }
                                            if(duoRows[0].lobby_g == '0') {
                                                if (TheLobby == '7') {
                                                    lobbyToNotify = "G";
                                                    interaction.reply(`${interaction.user} ${Options} has been opened in ${TheChannel} for ${Mode} for Lobby ${lobbyToNotify}!`);
                                                    channelToSend.send(`<:duos:917088503228141639> :no_entry:    **${Options} has been opened for ${Mode} in Lobby ${lobbyToNotify}**   :no_entry: <:duos:917088503228141639> `);
                                                    client.db.query("UPDATE duos_lobby_notifications SET `lobby_g`= '7';");
                                                }
                                            } else {
                                                if (TheLobby == '7') {
                                                    lobbyToNotify = "G";
                                                    interaction.reply(`${interaction.user} ${Options} has been closed in ${TheChannel} for ${Mode} for Lobby ${lobbyToNotify}!`);
                                                    channelToSend.send(`<:duos:917088503228141639> :no_entry:    **${Options} has been closed for ${Mode} in Lobby ${lobbyToNotify}**   :no_entry: <:duos:917088503228141639> `);
                                                    client.db.query("UPDATE duos_lobby_notifications SET `lobby_g`= '0';");
                                                }
                                            }
                                            if(duoRows[0].lobby_h == '0') {
                                                if (TheLobby == '8') {
                                                    lobbyToNotify = "H";
                                                    interaction.reply(`${interaction.user} ${Options} has been opened in ${TheChannel} for ${Mode} for Lobby ${lobbyToNotify}!`);
                                                    channelToSend.send(`<:duos:917088503228141639> :no_entry:    **${Options} has been opened for ${Mode} in Lobby ${lobbyToNotify}**   :no_entry: <:duos:917088503228141639> `);
                                                    client.db.query("UPDATE duos_lobby_notifications SET `lobby_h`= '8';");
                                                }
                                            } else {
                                                if (TheLobby == '8') {
                                                    lobbyToNotify = "H";
                                                    interaction.reply(`${interaction.user} ${Options} has been closed in ${TheChannel} for ${Mode} for Lobby ${lobbyToNotify}!`);
                                                    channelToSend.send(`<:duos:917088503228141639> :no_entry:    **${Options} has been closed for ${Mode} in Lobby ${lobbyToNotify}**   :no_entry: <:duos:917088503228141639> `);
                                                    client.db.query("UPDATE duos_lobby_notifications SET `lobby_h`= '0';");
                                                }
                                            }
                                            if(duoRows[0].lobby_i == '0') {
                                                if (TheLobby == '9') {
                                                    lobbyToNotify = "I";
                                                    interaction.reply(`${interaction.user} ${Options} has been opened in ${TheChannel} for ${Mode} for Lobby ${lobbyToNotify}!`);
                                                    channelToSend.send(`<:duos:917088503228141639> :no_entry:    **${Options} has been opened for ${Mode} in Lobby ${lobbyToNotify}**   :no_entry: <:duos:917088503228141639> `);
                                                    client.db.query("UPDATE duos_lobby_notifications SET `lobby_i`= '9';");
                                                }
                                            } else {
                                                if (TheLobby == '9') {
                                                    lobbyToNotify = "I";
                                                    interaction.reply(`${interaction.user} ${Options} has been closed in ${TheChannel} for ${Mode} for Lobby ${lobbyToNotify}!`);
                                                    channelToSend.send(`<:duos:917088503228141639> :no_entry:    **${Options} has been closed for ${Mode} in Lobby ${lobbyToNotify}**   :no_entry: <:duos:917088503228141639> `);
                                                    client.db.query("UPDATE duos_lobby_notifications SET `lobby_i`= '0';");
                                                }
                                            }
                                        } else if (Options == 'Registration') {
                                            if(duoRows[0].duo_registration == '0') {
                                                interaction.reply(`${interaction.user} ${Options} has been opened in ${TheChannel} for ${Mode}`);
                                                channelToSend.send(`${Options} has been opened for ${Mode}!`);
                                                client.db.query("UPDATE duos_lobby_notifications SET `duo_registration`= '1';");
                                            } else {
                                                interaction.reply(`${interaction.user} ${Options} has been closed in ${TheChannel} for ${Mode}`);
                                                channelToSend.send(`${Options} has been closed for ${Mode}!`);
                                                client.db.query("UPDATE duos_lobby_notifications SET `duo_registration`= '0';");
                                            }
                                        }
                                    } else if (Mode == 'Squads') {
                                        if(Options == 'CheckIn') {
                                            if(squadRows[0].lobby_a == '0') {
                                                if (TheLobby == '1') {
                                                    lobbyToNotify = "A";
                                                    interaction.reply(`${interaction.user} ${Options} has been opened in ${TheChannel} for ${Mode} for Lobby ${lobbyToNotify}!`);
                                                    channelToSend.send(`<:squads:917088502909370399> :no_entry:    **${Options} has been opened for ${Mode} in Lobby ${lobbyToNotify}**   :no_entry: <:squads:917088502909370399> `);
                                                    client.db.query("UPDATE squads_lobby_notifications SET `lobby_a`= '1';");
                                                }
                                            } else {
                                                if (TheLobby == '1') {
                                                    lobbyToNotify = "A";
                                                    interaction.reply(`${interaction.user} ${Options} has been closed in ${TheChannel} for ${Mode} for Lobby ${lobbyToNotify}!`);
                                                    channelToSend.send(`<:squads:917088502909370399> :no_entry:    **${Options} has been closed for ${Mode} in Lobby ${lobbyToNotify}**   :no_entry: <:squads:917088502909370399> `);
                                                    client.db.query("UPDATE squads_lobby_notifications SET `lobby_a`= '0';");
                                                }
                                            }
                                            if(squadRows[0].lobby_b == '0') {
                                                if (TheLobby == '2') {
                                                    lobbyToNotify = "B";
                                                    interaction.reply(`${interaction.user} ${Options} has been opened in ${TheChannel} for ${Mode} for Lobby ${lobbyToNotify}!`);
                                                    channelToSend.send(`<:squads:917088502909370399> :no_entry:    **${Options} has been opened for ${Mode} in Lobby ${lobbyToNotify}**   :no_entry: <:squads:917088502909370399> `);
                                                    client.db.query("UPDATE squads_lobby_notifications SET `lobby_b`= '2';");
                                                }
                                            } else {
                                                if (TheLobby == '2') {
                                                    lobbyToNotify = "B";
                                                    interaction.reply(`${interaction.user} ${Options} has been closed in ${TheChannel} for ${Mode} for Lobby ${lobbyToNotify}!`);
                                                    channelToSend.send(`<:squads:917088502909370399> :no_entry:    **${Options} has been closed for ${Mode} in Lobby ${lobbyToNotify}**   :no_entry: <:squads:917088502909370399> `);
                                                    client.db.query("UPDATE squads_lobby_notifications SET `lobby_b`= '0';");
                                                }
                                            }
                                            if(squadRows[0].lobby_c == '0') {
                                                if (TheLobby == '3') {
                                                    lobbyToNotify = "C";
                                                    interaction.reply(`${interaction.user} ${Options} has been opened in ${TheChannel} for ${Mode} for Lobby ${lobbyToNotify}!`);
                                                    channelToSend.send(`<:squads:917088502909370399> :no_entry:    **${Options} has been opened for ${Mode} in Lobby ${lobbyToNotify}**   :no_entry: <:squads:917088502909370399> `);
                                                    client.db.query("UPDATE squads_lobby_notifications SET `lobby_c`= '3';");
                                                }
                                            } else {
                                                if (TheLobby == '3') {
                                                    lobbyToNotify = "C";
                                                    interaction.reply(`${interaction.user} ${Options} has been closed in ${TheChannel} for ${Mode} for Lobby ${lobbyToNotify}!`);
                                                    channelToSend.send(`<:squads:917088502909370399> :no_entry:    **${Options} has been closed for ${Mode} in Lobby ${lobbyToNotify}**   :no_entry: <:squads:917088502909370399> `);
                                                    client.db.query("UPDATE squads_lobby_notifications SET `lobby_c`= '0';");
                                                }
                                            }
                                            if(squadRows[0].lobby_d == '0') {
                                                if (TheLobby == '4') {
                                                    lobbyToNotify = "D";
                                                    interaction.reply(`${interaction.user} ${Options} has been opened in ${TheChannel} for ${Mode} for Lobby ${lobbyToNotify}!`);
                                                    channelToSend.send(`<:squads:917088502909370399> :no_entry:    **${Options} has been opened for ${Mode} in Lobby ${lobbyToNotify}**   :no_entry: <:squads:917088502909370399> `);
                                                    client.db.query("UPDATE squads_lobby_notifications SET `lobby_d`= '4';");
                                                }
                                            } else {
                                                if (TheLobby == '4') {
                                                    lobbyToNotify = "D";
                                                    interaction.reply(`${interaction.user} ${Options} has been closed in ${TheChannel} for ${Mode} for Lobby ${lobbyToNotify}!`);
                                                    channelToSend.send(`<:squads:917088502909370399> :no_entry:    **${Options} has been closed for ${Mode} in Lobby ${lobbyToNotify}**   :no_entry: <:squads:917088502909370399> `);
                                                    client.db.query("UPDATE squads_lobby_notifications SET `lobby_d`= '0';");
                                                }
                                            }
                                            if(squadRows[0].lobby_e == '0') {
                                                if (TheLobby == '5') {
                                                    lobbyToNotify = "E";
                                                    interaction.reply(`${interaction.user} ${Options} has been opened in ${TheChannel} for ${Mode} for Lobby ${lobbyToNotify}!`);
                                                    channelToSend.send(`<:squads:917088502909370399> :no_entry:    **${Options} has been opened for ${Mode} in Lobby ${lobbyToNotify}**   :no_entry: <:squads:917088502909370399> `);
                                                    client.db.query("UPDATE squads_lobby_notifications SET `lobby_e`= '5';");
                                                }
                                            } else {
                                                if (TheLobby == '5') {
                                                    lobbyToNotify = "E";
                                                    interaction.reply(`${interaction.user} ${Options} has been closed in ${TheChannel} for ${Mode} for Lobby ${lobbyToNotify}!`);
                                                    channelToSend.send(`<:squads:917088502909370399> :no_entry:    **${Options} has been closed for ${Mode} in Lobby ${lobbyToNotify}**   :no_entry: <:squads:917088502909370399> `);
                                                    client.db.query("UPDATE squads_lobby_notifications SET `lobby_e`= '0';");
                                                }
                                            }
                                            if(squadRows[0].lobby_f == '0') {
                                                if (TheLobby == '6') {
                                                    lobbyToNotify = "F";
                                                    interaction.reply(`${interaction.user} ${Options} has been opened in ${TheChannel} for ${Mode} for Lobby ${lobbyToNotify}!`);
                                                    channelToSend.send(`<:squads:917088502909370399> :no_entry:    **${Options} has been opened for ${Mode} in Lobby ${lobbyToNotify}**   :no_entry: <:squads:917088502909370399> `);
                                                    client.db.query("UPDATE squads_lobby_notifications SET `lobby_f`= '6';");
                                                }
                                            } else {
                                                if (TheLobby == '6') {
                                                    lobbyToNotify = "F";
                                                    interaction.reply(`${interaction.user} ${Options} has been closed in ${TheChannel} for ${Mode} for Lobby ${lobbyToNotify}!`);
                                                    channelToSend.send(`<:squads:917088502909370399> :no_entry:    **${Options} has been closed for ${Mode} in Lobby ${lobbyToNotify}**   :no_entry: <:squads:917088502909370399> `);
                                                    client.db.query("UPDATE squads_lobby_notifications SET `lobby_f`= '0';");
                                                }
                                            }
                                            if(squadRows[0].lobby_g == '0') {
                                                if (TheLobby == '7') {
                                                    lobbyToNotify = "G";
                                                    interaction.reply(`${interaction.user} ${Options} has been opened in ${TheChannel} for ${Mode} for Lobby ${lobbyToNotify}!`);
                                                    channelToSend.send(`<:squads:917088502909370399> :no_entry:    **${Options} has been opened for ${Mode} in Lobby ${lobbyToNotify}**   :no_entry: <:squads:917088502909370399> `);
                                                    client.db.query("UPDATE squads_lobby_notifications SET `lobby_g`= '7';");
                                                }
                                            } else {
                                                if (TheLobby == '7') {
                                                    lobbyToNotify = "G";
                                                    interaction.reply(`${interaction.user} ${Options} has been closed in ${TheChannel} for ${Mode} for Lobby ${lobbyToNotify}!`);
                                                    channelToSend.send(`<:squads:917088502909370399> :no_entry:    **${Options} has been closed for ${Mode} in Lobby ${lobbyToNotify}**   :no_entry: <:squads:917088502909370399> `);
                                                    client.db.query("UPDATE squads_lobby_notifications SET `lobby_g`= '0';");
                                                }
                                            }
                                            if(squadRows[0].lobby_h == '0') {
                                                if (TheLobby == '8') {
                                                    lobbyToNotify = "H";
                                                    interaction.reply(`${interaction.user} ${Options} has been opened in ${TheChannel} for ${Mode} for Lobby ${lobbyToNotify}!`);
                                                    channelToSend.send(`<:squads:917088502909370399> :no_entry:    **${Options} has been opened for ${Mode} in Lobby ${lobbyToNotify}**   :no_entry: <:squads:917088502909370399> `);
                                                    client.db.query("UPDATE squads_lobby_notifications SET `lobby_h`= '8';");
                                                }
                                            } else {
                                                if (TheLobby == '8') {
                                                    lobbyToNotify = "H";
                                                    interaction.reply(`${interaction.user} ${Options} has been closed in ${TheChannel} for ${Mode} for Lobby ${lobbyToNotify}!`);
                                                    channelToSend.send(`<:squads:917088502909370399> :no_entry:    **${Options} has been closed for ${Mode} in Lobby ${lobbyToNotify}**   :no_entry: <:squads:917088502909370399> `);
                                                    client.db.query("UPDATE squads_lobby_notifications SET `lobby_h`= '0';");
                                                }
                                            }
                                            if(squadRows[0].lobby_i == '0') {
                                                if (TheLobby == '9') {
                                                    lobbyToNotify = "I";
                                                    interaction.reply(`${interaction.user} ${Options} has been opened in ${TheChannel} for ${Mode} for Lobby ${lobbyToNotify}!`);
                                                    channelToSend.send(`<:squads:917088502909370399> :no_entry:    **${Options} has been opened for ${Mode} in Lobby ${lobbyToNotify}**   :no_entry: <:squads:917088502909370399> `);
                                                    client.db.query("UPDATE squads_lobby_notifications SET `lobby_i`= '9';");
                                                }
                                            } else {
                                                if (TheLobby == '9') {
                                                    lobbyToNotify = "I";
                                                    interaction.reply(`${interaction.user} ${Options} has been closed in ${TheChannel} for ${Mode} for Lobby ${lobbyToNotify}!`);
                                                    channelToSend.send(`<:squads:917088502909370399> :no_entry:    **${Options} has been closed for ${Mode} in Lobby ${lobbyToNotify}**   :no_entry: <:squads:917088502909370399> `);
                                                    client.db.query("UPDATE squads_lobby_notifications SET `lobby_i`= '0';");
                                                }
                                            }
                                        } else if (Options == 'Registration') {
                                            if(squadRows[0].squad_register == '0') {
                                                interaction.reply(`${interaction.user} ${Options} has been opened in ${TheChannel} for ${Mode}`);
                                                channelToSend.send(`${Options} has been opened for ${Mode}!`);
                                                client.db.query("UPDATE squads_lobby_notifications SET `squad_register`= '1' WHERE guild_ID= '" + interaction.guild.id + "';");
                                            } else {
                                                interaction.reply(`${interaction.user} ${Options} has been closed in ${TheChannel} for ${Mode}`);
                                                channelToSend.send(`${Options} has been closed for ${Mode}!`);
                                                client.db.query("UPDATE squads_lobby_notifications SET `squad_register`= '0' WHERE guild_ID= '" + interaction.guild.id + "';");
                                            }
                                        }
                                    } else if (Mode == 'Scrims') {
                                        if(Options == 'CheckIn') {
                                            if(scrims[0].channels_scrims == '0') {
                                                interaction.reply(`${interaction.user} ${Options} has been opened in ${TheChannel} for ${Mode}!`);
                                                channelToSend.send(`${Options} has been opened for ${Mode}!`);
                                                client.db.query("UPDATE guild_settings SET `channels_scrims`= '1' WHERE guild_ID= '" + interaction.guild.id + "';");
                                            } else {
                                                interaction.reply(`${interaction.user} ${Options} has been closed in ${TheChannel} for ${Mode}!`);
                                                channelToSend.send(`${Options} has been closed for ${Mode}!`);
                                                client.db.query("UPDATE guild_settings SET `channels_scrims`= '0' WHERE guild_ID= '" + interaction.guild.id + "';");
                                            }
                                        } else if (Options == 'Registration') {
                                            if(scrims[0].scrim_registration == '0') {
                                                interaction.reply(`${interaction.user} ${Options} has been opened in ${TheChannel} for ${Mode}`);
                                                channelToSend.send(`${Options} has been opened for ${Mode}!`);
                                                client.db.query("UPDATE guild_settings SET `scrim_registration`= '1' WHERE guild_ID= '" + interaction.guild.id + "';");
                                            } else {
                                                interaction.reply(`${interaction.user} ${Options} has been closed in ${TheChannel} for ${Mode}`);
                                                channelToSend.send(`${Options} has been closed for ${Mode}!`);
                                                client.db.query("UPDATE guild_settings SET `scrim_registration`= '0' WHERE guild_ID= '" + interaction.guild.id + "';");
                                            }
                                        }
                                    }else if (Mode == '1v1 Event') {
                                        if(scrims[0].one_v_one == '0') {
                                            if(Options == 'Registration') {
                                                interaction.reply(`${interaction.user} ${Options} has been opened in ${TheChannel} for our Who Wants the Smoke 1v1 Tournament!`);
                                                channelToSend.send(`${Options} has been opened for Who Wants the Smoke 1v1 Tournament!`);
                                                client.db.query("UPDATE guild_settings SET `one_v_one`= '1' WHERE guild_ID= '" + interaction.guild.id + "';");
                                            }
                                        } else {
                                            if(Options == 'Registration') {
                                                interaction.reply(`${interaction.user} ${Options} has been closed in ${TheChannel} for our Who Wants the Smoke 1v1 Tournament!`);
                                                channelToSend.send(`${Options} has been closed for Who Wants the Smoke 1v1 Tournament!`);
                                                client.db.query("UPDATE guild_settings SET `one_v_one`= '0' WHERE guild_ID= '" + interaction.guild.id + "';");
                                            }
                                        }
                                    }
                                }
                            });
                        });
                    });
                });
            }
        }
}