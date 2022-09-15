const { SlashCommandBuilder } = require('@discordjs/builders');
const { time } = require('cron');
const { Interaction, MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('opt')
        .setDescription('Opt in for lobbies')
        .addSubcommand(subcommand =>
            subcommand
                .setName('host')
                .setDescription('Opt in to get a lobby for the week')
                .addStringOption(option =>
                    option
                        .setName('lobby_host')
                        .setDescription('Pick Which Lobby you are hosting')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Lobby A', value: '1' },
                            { name: 'Lobby B', value: '2'},
                            { name: 'Lobby C', value: '3' },
                            { name: 'Lobby D', value: '4'},
                            { name: 'Lobby E', value: '5' },
                            { name: 'Lobby F', value: '6'},
                            { name: 'Lobby G', value: '7' },
                            { name: 'Lobby H', value: '8' },
                            { name: 'Lobby I', value: '9' },
                        )
                ),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('caster')
                .setDescription('Opt to get code for a lobby')
                .addStringOption(option =>
                    option
                        .setName('lobby_caster')
                        .setDescription('Pick Which Lobby you are Casting')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Lobby A', value: '1' },
                            { name: 'Lobby B', value: '2'},
                            { name: 'Lobby C', value: '3' },
                            { name: 'Lobby D', value: '4'},
                            { name: 'Lobby E', value: '5' },
                            { name: 'Lobby F', value: '6'},
                            { name: 'Lobby G', value: '7' },
                            { name: 'Lobby H', value: '8' },
                            { name: 'Lobby I', value: '9' },
                        )
                )
                .addStringOption(option =>
                    option
                        .setName('league_caster')
                        .setDescription('Pick Which Lobby you are Casting')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Solos', value: 'Solos' },
                            { name: 'Duos', value: 'Duos'},
                            { name: 'Squads', value: 'Squads' },
                            { name: 'Scrims', value: 'Scrims' },
                            { name: '1v1', value: '1v1' },
                        )
                ),
        ),

        async execute(interaction, client) {
            const LobbyHost = interaction.options.getString('lobby_host');

            const LobbyCaster = interaction.options.getString('lobby_caster');
            const LeagueCaster = interaction.options.getString('league_caster');

            if(interaction.options.getSubcommand() === 'host') {
                client.db.query("SELECT * FROM opt_in WHERE discordID= '" + interaction.user.id + "';", async function (err,hosts) {
                    var host = "";
                    if(LobbyHost == '1') {
                        host = "A";
                        interaction.reply(`${interaction.user} you have opted in to host Lobby ${host}`)
                    }

                    if(LobbyHost == '2') {
                        host = "B";
                        interaction.reply(`${interaction.user} you have opted in to host Lobby ${host}`)
                    }

                    if(LobbyHost == '3') {
                        host = "C";
                        interaction.reply(`${interaction.user} you have opted in to host Lobby ${host}`)
                    }

                    if(LobbyHost == '4') {
                        host = "D";
                        interaction.reply(`${interaction.user} you have opted in to host Lobby ${host}`)
                    }

                    if(LobbyHost == '5') {
                        host = "E";
                        interaction.reply(`${interaction.user} you have opted in to host Lobby ${host}`)
                    }

                    if(LobbyHost == '6') {
                        host = "F";
                        interaction.reply(`${interaction.user} you have opted in to host Lobby ${host}`)
                    }

                    if(LobbyHost == '7') {
                        host = "G";
                        interaction.reply(`${interaction.user} you have opted in to host Lobby ${host}`)
                    }

                    if(LobbyHost == '8') {
                        host = "H";
                        interaction.reply(`${interaction.user} you have opted in to host Lobby ${host}`)
                    }

                    if(LobbyHost == '9') {
                        host = "I";
                        interaction.reply(`${interaction.user} you have opted in to host Lobby ${host}`)
                    }
                });
            } else if(interaction.options.getSubcommand() === 'caster') {
                client.db.query("SELECT * FROM opt_in WHERE discordID= '" + interaction.user.id + "';", async function (err,casters) {
                    var caster = "";

                    if(LobbyCaster == '1') {
                        caster = "A";
                        interaction.reply(`${interaction.user} you have opted in to cast Lobby ${caster}`)
                        client.db.query("INSERT INTO opt_in (discordID,league,caster_opt) VALUES ('" + interaction.user.id + "','" + LeagueCaster + "','1');");
                    }

                    if(LobbyCaster == '2') {
                        caster = "B";
                        interaction.reply(`${interaction.user} you have opted in to cast Lobby ${caster}`)
                        client.db.query("INSERT INTO opt_in (discordID,league,caster_opt) VALUES ('" + interaction.user.id + "','" + LeagueCaster + "','2');");
                    }

                    if(LobbyCaster == '3') {
                        caster = "C";
                        interaction.reply(`${interaction.user} you have opted in to cast Lobby ${caster}`)
                        client.db.query("INSERT INTO opt_in (discordID,league,caster_opt) VALUES ('" + interaction.user.id + "','" + LeagueCaster + "','3');");
                    }

                    if(LobbyCaster == '4') {
                        caster = "D";
                        interaction.reply(`${interaction.user} you have opted in to cast Lobby ${caster}`)
                        client.db.query("INSERT INTO opt_in (discordID,league,caster_opt) VALUES ('" + interaction.user.id + "','" + LeagueCaster + "','4');");
                    }

                    if(LobbyCaster == '5') {
                        caster = "E";
                        interaction.reply(`${interaction.user} you have opted in to cast Lobby ${caster}`)
                        client.db.query("INSERT INTO opt_in (discordID,league,caster_opt) VALUES ('" + interaction.user.id + "','" + LeagueCaster + "','5');");
                    }

                    if(LobbyCaster == '6') {
                        caster = "F";
                        interaction.reply(`${interaction.user} you have opted in to cast Lobby ${caster}`)
                        client.db.query("INSERT INTO opt_in (discordID,league,caster_opt) VALUES ('" + interaction.user.id + "','" + LeagueCaster + "','6');");
                    }

                    if(LobbyCaster == '7') {
                        caster = "G";
                        interaction.reply(`${interaction.user} you have opted in to cast Lobby ${caster}`)
                        client.db.query("INSERT INTO opt_in (discordID,league,caster_opt) VALUES ('" + interaction.user.id + "','" + LeagueCaster + "','7');");
                    }

                    if(LobbyCaster == '8') {
                        caster = "H";
                        interaction.reply(`${interaction.user} you have opted in to cast Lobby ${caster}`)
                        client.db.query("INSERT INTO opt_in (discordID,league,caster_opt) VALUES ('" + interaction.user.id + "','" + LeagueCaster + "','8');");
                    }

                    if(LobbyCaster == '9') {
                        caster = "I";
                        interaction.reply(`${interaction.user} you have opted in to cast Lobby ${caster}`)
                        client.db.query("INSERT INTO opt_in (discordID,league,caster_opt) VALUES ('" + interaction.user.id + "','" + LeagueCaster + "','9');");
                    }
                });
            }
        }
}