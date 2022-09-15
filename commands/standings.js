const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('node:timers/promises').setTimeout;
const { MessageAttachment, MessageEmbed } = require("discord.js");

const { GoogleSpreadsheet } = require('google-spreadsheet');
const doc = new GoogleSpreadsheet('1kfA-0wyfrYV3AiDTBa9swRG6ZZrYkKoEnHOLYbzEeKE');
const duoDoc = new GoogleSpreadsheet('18xrAs2A3UQefkvl6NSqR_rPHs74mGql42BXC0SmoeOw');
const gSheetsCreds = require('../wired-effort-294316-b31a593738b4.json');

const { Canvas } = require('@napi-rs/canvas');
const { request } = require('undici');
const { readFile } = require('fs/promises');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('standings')
        .setDescription('Set your teams availability')
        .addSubcommand(subcommand =>
            subcommand
                .setName('solos')
                .setDescription('Register for solos')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('duos')
                .setDescription('Info about the server')
        ),
    async execute(interaction,client,canvas) {
        if(interaction.guild.id != '899801075786342480') {
            interaction.reply(`${interaction.user} this command is used in UGL only!`)
        } else {
            if(interaction.options.getSubcommand() === 'solos') {
                interaction.reply(`Getting Leaderboard Information.....`)
                await doc.useServiceAccountAuth({
                    client_email: gSheetsCreds.client_email,
                    private_key: gSheetsCreds.private_key,
                });
                await doc.loadInfo();
                //console.log(doc.title);
                //await doc.updateProperties({ title: 'Solos - Season 3' });
        
                const sheet = doc.sheetsByIndex[0];
                await sheet.loadCells('A1:Z1000');
                const firstPlace = sheet.getCellByA1('C7');
                const secondPlace = sheet.getCellByA1('C8');
                const thirdPlace = sheet.getCellByA1('C9');
                const forthPlace = sheet.getCellByA1('C10');
                const fifthPlace = sheet.getCellByA1('C11');
                const sixthPlace = sheet.getCellByA1('C12');
                const seventhPlace = sheet.getCellByA1('C13');
                const eighthPlace = sheet.getCellByA1('C14');
                const ninthPlace = sheet.getCellByA1('C15');
                const tenthPlace = sheet.getCellByA1('C16');
                const eleventhPlace = sheet.getCellByA1('C17');
                const twelvthPlace = sheet.getCellByA1('C18');
                const thirteenthPlace = sheet.getCellByA1('C19');
                const fourteenthPlace = sheet.getCellByA1('C20');
                const firstPlacePoints = sheet.getCellByA1('D7');
                const secondPlacePoints = sheet.getCellByA1('D8');
                const thirdPlacePoints = sheet.getCellByA1('D9');
                const forthPlacePoints = sheet.getCellByA1('D10');
                const fifthPlacePoints = sheet.getCellByA1('D11');
                const sixthPlacePoints = sheet.getCellByA1('D12');
                const seventhPlacePoints = sheet.getCellByA1('D13');
                const eighthPlacePoints = sheet.getCellByA1('D14');
                const ninthPlacePoints = sheet.getCellByA1('D15');
                const tenthPlacePoints = sheet.getCellByA1('D16');
                const eleventhPlacePoints = sheet.getCellByA1('D17');
                const twelvthPlacePoints = sheet.getCellByA1('D18');
                const thirteenthPlacePoints = sheet.getCellByA1('D19');
                const fourteenthPlacePoints = sheet.getCellByA1('D20');
        
                const leaderEmbed = new MessageEmbed()
                .setTitle("Solos Leaderboard")
                .setURL('https://docs.google.com/spreadsheets/d/1kfA-0wyfrYV3AiDTBa9swRG6ZZrYkKoEnHOLYbzEeKE/edit#gid=0')
                .setDescription("Season 3 TOP 14")
                .setColor("GREEN")
                .setThumbnail(client.user.avatarURL())
                .addFields("Solos Leaderboard", `**1st** | Player Name : ${firstPlace.value} | Points : ${parseFloat(firstPlacePoints.value).toFixed(2)}\n
                    **2nd** | Player Name : ${secondPlace.value} | Points : ${parseFloat(secondPlacePoints.value).toFixed(2)}\n
                    **3rd** | Player Name : ${thirdPlace.value} | Points : ${parseFloat(thirdPlacePoints.value).toFixed(2)}\n
                    **4th** | Player Name : ${forthPlace.value} | Points : ${parseFloat(forthPlacePoints.value).toFixed(2)}\n
                    **5th** | Player Name : ${fifthPlace.value} | Points : ${parseFloat(fifthPlacePoints.value).toFixed(2)}\n
                    **6th** | Player Name : ${sixthPlace.value} | Points : ${parseFloat(sixthPlacePoints.value).toFixed(2)}\n
                    **7th** | Player Name : ${seventhPlace.value} | Points : ${parseFloat(seventhPlacePoints.value).toFixed(2)}\n
                    **8th** | Player Name : ${eighthPlace.value} | Points : ${parseFloat(eighthPlacePoints.value).toFixed(2)}\n
                    **9th** | Player Name : ${ninthPlace.value} | Points : ${parseFloat(ninthPlacePoints.value).toFixed(2)}\n
                    **10th** | Player Name : ${tenthPlace.value} | Points : ${parseFloat(tenthPlacePoints.value).toFixed(2)}\n
                    **11th** | Player Name : ${eleventhPlace.value} | Points : ${parseFloat(eleventhPlacePoints.value).toFixed(2)}\n
                    **12th** | Player Name : ${twelvthPlace.value} | Points : ${parseFloat(twelvthPlacePoints.value).toFixed(2)}\n
                    **13th** | Player Name : ${thirteenthPlace.value} | Points : ${parseFloat(thirteenthPlacePoints.value).toFixed(2)}\n
                    **14th** | Player Name : ${fourteenthPlace.value} | Points : ${parseFloat(fourteenthPlacePoints.value).toFixed(2)}\n`
                )
                await wait(5000);
                interaction.editReply({ embeds: [ leaderEmbed ] })
                /*const canv = canvas.createCanvas(1920, 1920);
                const context = canv.getContext('2d');
                const applyText = (canvas, text) => {
                    const context = canv.getContext('2d');
                
                    // Declare a base size of the font
                    let fontSize = 70;
                
                    do {
                        // Assign the font to the context and decrement it so it can be measured again
                        context.font = `${fontSize -= 10}px Cinzel Bold`;
                        // Compare pixel width of the text to the canvas minus the approximate avatar size
                    } while (context.measureText(text).width > canvas.width - 1920);
                
                    // Return the result to use in the actual canvas
                    return context.font;
                };

                const backgroundFile = await readFile('./solosLeaderboardCanvas.jpg');
                const background = new canvas.Image();
                background.src = backgroundFile;

                context.drawImage(background, 0, 0, canv.width, canv.height);
                context.strokeStyle = '#0099ff';
                context.strokeRect(0, 0, canv.width, canv.height);
                //const { body } = await request(client.user.avatarURL());
                const avatar = new canvas.Image();
                //avatar.src = Buffer.from(await body.arrayBuffer());
                context.drawImage(avatar, 200, 250, 600, 600);

                //DISPLAY NAME
                context.font = applyText(canvas, 'Testing');
                context.fillStyle = '#ffffff';
                context.textBaseline = 'middle'; 
                context.textAllign = 'right';

                //First Place
                context.font = '40px Cinzel Bold';
                context.fillStyle = '#ffffff';
                context.fillText(`${firstPlace.value}`, canv.width / 4.10, canv.height / 8.95);

                context.font = '40px Cinzel Bold';
                context.fillStyle = '#ffffff';
                context.fillText(`${parseFloat(firstPlacePoints.value).toFixed(2)}`, canv.width / 1.60, canv.height / 8.95);

                const attachment = new MessageAttachment(canv.toBuffer('image/png'), 'profile-image.png');
                await wait(5000);
                interaction.editReply({ files: [attachment] });*/
            } else if(interaction.options.getSubcommand() === 'duos') {
                interaction.reply(`Getting Leaderboard Information.....`)
                await duoDoc.useServiceAccountAuth({
                    client_email: gSheetsCreds.client_email,
                    private_key: gSheetsCreds.private_key,
                });
                await duoDoc.loadInfo();
                //console.log(doc.title);
                //await doc.updateProperties({ title: 'Solos - Season 3' });
        
                const sheet = duoDoc.sheetsByIndex[0];
                await sheet.loadCells('A1:Z1000');
                const firstPlace = sheet.getCellByA1('C7');
                const secondPlace = sheet.getCellByA1('C8');
                const thirdPlace = sheet.getCellByA1('C9');
                const forthPlace = sheet.getCellByA1('C10');
                const fifthPlace = sheet.getCellByA1('C11');
                const sixthPlace = sheet.getCellByA1('C12');
                const seventhPlace = sheet.getCellByA1('C13');
                const eighthPlace = sheet.getCellByA1('C14');
                const ninthPlace = sheet.getCellByA1('C15');
                const firstPlacePoints = sheet.getCellByA1('D7');
                const secondPlacePoints = sheet.getCellByA1('D8');
                const thirdPlacePoints = sheet.getCellByA1('D9');
                const forthPlacePoints = sheet.getCellByA1('D10');
                const fifthPlacePoints = sheet.getCellByA1('D11');
                const sixthPlacePoints = sheet.getCellByA1('D12');
                const seventhPlacePoints = sheet.getCellByA1('D13');
                const eighthPlacePoints = sheet.getCellByA1('D14');
                const ninthPlacePoints = sheet.getCellByA1('D15');
        
                const duoLeaderEmbed = new MessageEmbed()
                .setTitle("Duos Leaderboard")
                .setURL('https://docs.google.com/spreadsheets/d/18xrAs2A3UQefkvl6NSqR_rPHs74mGql42BXC0SmoeOw/edit#gid=0')
                .setDescription("Season 1 TOP 9")
                .setColor("GREEN")
                .setThumbnail(client.user.avatarURL())
                .addFields("Duos Leaderboard", `**1st** | Team Name : ${firstPlace.value} | Points : ${parseFloat(firstPlacePoints.value).toFixed(2)}\n
                    **2nd** | Team Name : ${secondPlace.value} | Points : ${parseFloat(secondPlacePoints.value).toFixed(2)}\n
                    **3rd** | Team Name : ${thirdPlace.value} | Points : ${parseFloat(thirdPlacePoints.value).toFixed(2)}\n
                    **4th** | Team Name : ${forthPlace.value} | Points : ${parseFloat(forthPlacePoints.value).toFixed(2)}\n
                    **5th** | Team Name : ${fifthPlace.value} | Points : ${parseFloat(fifthPlacePoints.value).toFixed(2)}\n
                    **6th** | Team Name : ${sixthPlace.value} | Points : ${parseFloat(sixthPlacePoints.value).toFixed(2)}\n
                    **7th** | Team Name : ${seventhPlace.value} | Points : ${parseFloat(seventhPlacePoints.value).toFixed(2)}\n
                    **8th** | Team Name : ${eighthPlace.value} | Points : ${parseFloat(eighthPlacePoints.value).toFixed(2)}\n
                    **9th** | Team Name : ${ninthPlace.value} | Points : ${parseFloat(ninthPlacePoints.value).toFixed(2)}\n`
                )
                await wait(5000);
                interaction.editReply({ embeds: [ duoLeaderEmbed ] })
            }
        }
    }
}