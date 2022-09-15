const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('checkin')
        .setDescription('Competitive Check In')
        .addSubcommand((subcommand) =>
            subcommand
                .setName('solos')
                .setDescription('Register for solos')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('duos')
                .setDescription('Info about the server')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('squads')
                .setDescription('Info about the server')
        ),

        async execute(interaction,client) {
            //duos
            const duo = interaction.options.getString('duos');
            //squads
            const squad = interaction.options.getString('squads');
            
            if(interaction.options.getSubcommand() === 'solos') {
                if(interaction.channel.id == '986222732419170304') {
                    client.db.query("SELECT * FROM solos_lobby_notifications;", async function (err,soloLobby) {
                        client.db.query("SELECT * FROM solos_season_four WHERE discordID= '" + interaction.user.id + "';", async function (err,solos) {
                            if(soloLobby[0].lobby_a == solos[0].lobby){
                                interaction.reply(`${interaction.user} has checked in!`);
                            } else if(soloLobby[0].lobby_b == solos[0].lobby){
                                interaction.reply(`${interaction.user} has checked in!`);
                            } else if(soloLobby[0].lobby_c == solos[0].lobby){
                                interaction.reply(`${interaction.user} has checked in!`);
                            } else if(soloLobby[0].lobby_d == solos[0].lobby){
                                interaction.reply(`${interaction.user} has checked in!`);
                            } else if(soloLobby[0].lobby_e == solos[0].lobby){
                                interaction.reply(`${interaction.user} has checked in!`);
                            } else if(soloLobby[0].lobby_f == solos[0].lobby){
                                interaction.reply(`${interaction.user} has checked in!`);
                            } else if(soloLobby[0].lobby_g == solos[0].lobby){
                                interaction.reply(`${interaction.user} has checked in!`);
                            } else if(soloLobby[0].lobby_h == solos[0].lobby){
                                interaction.reply(`${interaction.user} has checked in!`);
                            } else if(soloLobby[0].lobby_i == solos[0].lobby){
                                interaction.reply(`${interaction.user} has checked in!`);
                            } else {
                                interaction.reply(`${interaction.user} your lobby has not opened for check in yet.`);
                            }
                        });
                    });
                } else {
                    interaction.reply(`${interaction.user} please use the correct channel for checkins.`);
                }
            } else if(interaction.options.getSubcommand() === 'duos') {
                if(interaction.channel.id == '985595684986191953') {
                    client.db.query("SELECT * FROM duos_lobby_notifications;", async function(err,duosLobby) {
                        client.db.query("SELECT * FROM duos_season_two WHERE discordID= '" + interaction.user.id + "' OR team_mateID= '" + interaction.user.id + "';", async function(err,duos) {
                            if(duosLobby[0].lobby_a == duos[0].lobby){
                                interaction.reply(`${interaction.user} ${duos[0].team_name} has checked in!`);
                            } else if(duosLobby[0].lobby_b == duos[0].lobby){
                                interaction.reply(`${interaction.user} ${duos[0].team_name} has checked in!`);
                            } else if(duosLobby[0].lobby_c == duos[0].lobby){
                                interaction.reply(`${interaction.user} ${duos[0].team_name} has checked in!`);
                            } else if(duosLobby[0].lobby_d == duos[0].lobby){
                                interaction.reply(`${interaction.user} ${duos[0].team_name} has checked in!`);
                            } else if(duosLobby[0].lobby_e == duos[0].lobby){
                                interaction.reply(`${interaction.user} ${duos[0].team_name} has checked in!`);
                            } else if(duosLobby[0].lobby_f == duos[0].lobby){
                                interaction.reply(`${interaction.user} ${duos[0].team_name} has checked in!`);
                            } else if(duosLobby[0].lobby_g == duos[0].lobby){
                                interaction.reply(`${interaction.user} ${duos[0].team_name} has checked in!`);
                            } else if(duosLobby[0].lobby_h == duos[0].lobby){
                                interaction.reply(`${interaction.user} ${duos[0].team_name} has checked in!`);
                            } else if(duosLobby[0].lobby_i == duos[0].lobby){
                                interaction.reply(`${interaction.user} ${duos[0].team_name} has checked in!`);
                            } else {
                                interaction.reply(`${interaction.user} your lobby has not opened for check in yet.`);
                            }
                        });
                    });
                } else {
                    interaction.reply(`${interaction.user} please use the correct channel for checkins.`);
                }
            } else if(interaction.options.getSubcommand() === 'squads') {
                if(interaction.channel.id == '1016521707424600135') {
                    client.db.query("SELECT * FROM squads_lobby_notifications;", async function(err,squadsLobby) {
                        client.db.query("SELECT * FROM squads WHERE player_one= '" + interaction.user.id + "' OR player_two= '" + interaction.user.id + "' OR player_three= '" + interaction.user.id + "';", async function(err,squads) {
                            if(squadsLobby[0].lobby_a == squads[0].lobby){
                                interaction.reply(`${interaction.user} ${squads[0].team_name} has checked in!`);
                            } else if(squadsLobby[0].lobby_b == squads[0].lobby){
                                interaction.reply(`${interaction.user} ${squads[0].team_name} has checked in!`);
                            } else if(squadsLobby[0].lobby_c == squads[0].lobby){
                                interaction.reply(`${interaction.user} ${squads[0].team_name} has checked in!`);
                            } else if(squadsLobby[0].lobby_d == squads[0].lobby){
                                interaction.reply(`${interaction.user} ${squads[0].team_name} has checked in!`);
                            } else if(squadsLobby[0].lobby_e == squads[0].lobby){
                                interaction.reply(`${interaction.user} ${squads[0].team_name} has checked in!`);
                            } else if(squadsLobby[0].lobby_f == squads[0].lobby){
                                interaction.reply(`${interaction.user} ${squads[0].team_name} has checked in!`);
                            } else if(squadsLobby[0].lobby_g == squads[0].lobby){
                                interaction.reply(`${interaction.user} ${squads[0].team_name} has checked in!`);
                            } else if(squadsLobby[0].lobby_h == squads[0].lobby){
                                interaction.reply(`${interaction.user} ${squads[0].team_name} has checked in!`);
                            } else if(squadsLobby[0].lobby_i == squads[0].lobby){
                                interaction.reply(`${interaction.user} ${squads[0].team_name} has checked in!`);
                            } else {
                                interaction.reply(`${interaction.user} your lobby has not opened for check in yet.`);
                            }
                        });
                    });
                } else {
                    interaction.reply(`${interaction.user} please use the correct channel for checkins.`);
                }
            }
        }
}