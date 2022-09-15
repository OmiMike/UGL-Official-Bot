const { GoogleSpreadsheet } = require('google-spreadsheet');
const doc = new GoogleSpreadsheet('1jiLxptxovxNNQ3j-D9Av1DB4bb52KpSlhHEvQYa0oJg');
const gSheetsCreds = require('../wired-effort-294316-b31a593738b4.json');


const { SlashCommandBuilder } = require('@discordjs/builders');
const { Interaction, MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('UGL Announcement Command'),

        async execute(interaction, client) {
            await doc.useServiceAccountAuth({
                client_email: gSheetsCreds.client_email,
                private_key: gSheetsCreds.private_key,
            });
            await doc.loadInfo();
            console.log(doc.title);
            const sheet = doc.sheetsByIndex[9];
            await sheet.loadCells('A1:AQ60');
            console.log(sheet.cellStats);
            const a1 = await sheet.getCell(9, 7);
            const rows = await sheet.getRows();
            console.log(rows[7]);
            //await interaction.reply(a1.value);
        }
}