const { SlashCommandBuilder } = require('@discordjs/builders');
const { Interaction } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('code')
        .setDescription('DMs the Code to the players')
        .addSubcommand(subcommand =>
            subcommand
                .setName('solos')
                .setDescription('Choose Solos')
                .addStringOption(option =>
                    option
                        .setName('lobby')
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
                )
                .addStringOption(option =>
                    option
                        .setName('solos_code')
                        .setDescription('This is the code for Solos')
                        .setRequired(true)
                ),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('duos')
                .setDescription('Choose Duos')
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
                )
                .addStringOption(option =>
                    option
                        .setName('duos_code')
                        .setDescription('This is the code for Solos')
                        .setRequired(true)
                ),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('squads')
                .setDescription('Select this option to send out a DM to specific lobbies')
                .addStringOption(option =>
                    option
                        .setName('squad_lobby')
                        .setDescription('Pick Which Lobby to DM to')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Lobby A', value: '1' },
                            { name: 'Lobby B', value: '2'},
                            { name: 'Lobby C', value: '3' },
                            { name: 'Lobby D', value: '4'},
                            { name: 'Lobby E', value: '5' },
                            { name: 'Lobby F', value: '6'},
                        )
                )
                .addStringOption(option =>
                    option
                        .setName('squad_code')
                        .setDescription('This is the message you are sending to the Lobby')
                        .setRequired(true)
                ),
        ),

    async execute(interaction,client) {
        const solosType = interaction.options.getString('lobby');
        const solosCode = interaction.options.getString('solos_code');

        const duosType = interaction.options.getString('duo_lobby');
        const duosCode = interaction.options.getString('duos_code');

        const squadsType = interaction.options.getString('squad_lobby');
        const squadsCode = interaction.options.getString('squad_code');

        if(interaction.options.getSubcommand() === 'solos') {
            client.db.query("SELECT * FROM solos_season_four WHERE `lobby`= '" + solosType + "';", async function(err,rows) {
                var soloLobby = "";
                if(!interaction.member.roles.cache.some((role) => role.id == '907042996128723036')) {
                    interaction.reply(`You do not have permissions to use this command`)
                } else {
                    rows.forEach(ID => {
                        try {
                            if(ID.checkedin == 0) {
                                const userID = client.users.cache.get(ID.discordID);
                                userID.send(`${solosCode}`);
                                console.log(`${solosCode} \n ${ID.ign} \n`);
                            } else {
                                console.log('Only some were notified because they already checked in');
                            }
                        } catch(err) {
                            console.log(err);
                        }
                    });

                    if(solosType == 1) soloLobby = 'A';
                    if(solosType == 2) soloLobby = 'B';
                    if(solosType == 3) soloLobby = 'C';
                    if(solosType == 4) soloLobby = 'D';
                    if(solosType == 5) soloLobby = 'E';
                    if(solosType == 6) soloLobby = 'F';

                    interaction.reply(`${interaction.user} your message has been sent to all players in Lobby ${soloLobby}`);
                }
            });
        } else if(interaction.options.getSubcommand() === 'duos') {
            client.db.query("SELECT * FROM duos_season_two WHERE `lobby`= '" + duosType + "';", async function(err,DRows) {
                var duoLobby = "";
                if(!interaction.member.roles.cache.some((role) => role.id == '907042996128723036')) {
                    interaction.reply(`You do not have permissions to use this command`)
                } else {
                    DRows.forEach(DUOS => {
                        try {
                            const DUOID = client.users.cache.get(DUOS.discordID);
                            const DUOTEAMMATE = client.users.cache.get(DUOS.team_mateID);
                            DUOID.send(`${duosCode}`);
                            DUOTEAMMATE.send(`${duosCode}`);
                            console.log(`${duosCode} \n ${DUOS.team_name}`);
                        } catch(err) {
                            console.log(err);
                        }
                    });

                    if(duosType == 1) duoLobby = 'A';
                    if(duosType == 2) duoLobby = 'B';
                    if(duosType == 3) duoLobby = 'C';
                    if(duosType == 4) duoLobby = 'D';
                    if(duosType == 5) duoLobby = 'E';
                    if(duosType == 6) duoLobby = 'F';

                    interaction.reply(`${interaction.user} your message has been sent to all players in Lobby ${duoLobby}`);
                }
            });
        } else if(interaction.options.getSubcommand() === 'squads') {
            client.db.query("SELECT * FROM squads WHERE `lobby`= '" + squadsType + "';", async function(err,sRows) {
                var squadLobby = "";
                if(!interaction.member.roles.cache.some((role) => role.id == '907042996128723036')) {
                    interaction.reply(`You do not have permissions to use this command`)
                } else {
                    sRows.forEach(SQUADS => {
                        try {
                            const squadID = client.users.cache.get(SQUADS.player_one);
                            const squadTeammate = client.users.cache.get(SQUADS.player_two);
                            const squadTeammate1 = client.users.cache.get(SQUADS.player_three);
                            squadID.send(`${squadsCode}`);
                            squadTeammate.send(`${squadsCode}`);
                            squadTeammate1.send(`${squadsCode}`);
                            console.log(`${squadsCode} \n ${SQUADS.team_name}`);
                        } catch(err) {
                            console.log(err);
                        }
                    });

                    if(squadsType == 1) squadLobby = 'A';
                    if(squadsType == 2) squadLobby = 'B';
                    if(squadsType == 3) squadLobby = 'C';
                    if(squadsType == 4) squadLobby = 'D';
                    if(squadsType == 5) squadLobby = 'E';
                    if(squadsType == 6) squadLobby = 'F';

                    interaction.reply(`${interaction.user} your message has been sent to all players in Lobby ${squadLobby}`);
                }
            });
        }
    }
}