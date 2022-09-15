require('dotenv').config();
const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9')
const { Client, MessageEmbed, Intents, Collection, member } = require('discord.js');
const canvas = require('@napi-rs/canvas');
const axios = require('axios');
const format = require('string-format');
format.extend(String.prototype, {});
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_SCHEDULED_EVENTS,
        Intents.FLAGS.GUILD_WEBHOOKS
    ]
});
const { mysql_host, mysql_user, mysql_password, mysql_database } = require('./config.json');
const discordModals = require('discord-modals');
discordModals(client);

const mysql = require('mysql2');
client.db = mysql.createPool({
    connectionLimit : 10,
    host: (mysql_host.includes(":") ? mysql_host.split(":")[0] : mysql_host),
    port: (mysql_host.includes(":") ? mysql_host.split(":")[1] : '3306'),
     user: mysql_user,
     password: mysql_password,
    database: mysql_database,
    multipleStatements: true
});

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const commands = [];
client.commands = new Collection();
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
}


//Check in Automation
const CronJob = require('cron').CronJob;
const monScrimReminder = new CronJob("0 0 9 12 Aug Fri", () => {
    const staffChannel = client.guilds.user.cache.get('868597865910517811');
    staffChannel.send('Today is Friday Squad Scrims! Dont forget to post your notifications today!')
});

//Role Reactions
const addReactions = (message, reactions) => {
    message.react(reactions[0])
    reactions.shift()
    if (reactions.length > 0) {
      setTimeout(() => addReactions(message, reactions), 750)
    }
}

//First Message
async function firstmessage (id, text, reactions) {
    const channel = await client.channels.fetch(id)
  
    channel.messages.fetch().then((messages) => {
        if (messages.size === 0) {
            // Send a new message
            channel.send(text).then((message) => {
            addReactions(message, reactions)
            })
        } else {
            // Edit the existing message
            for (const message of messages) {
            message[1].edit(text)
            addReactions(message[1], reactions)
            }
        }
    });
}

//Reaction Roles
async function roleClaim() {
    const channelId = '901829105299902495'

    const getEmoji = (emojiName) =>
        client.emojis.cache.find((emoji) => emoji.name === emojiName)

    const emojis = {
        squads: 'Scrims',
        oneEmote: 'Stream_Notifications',
        pop1logo: 'Population One',
        contractors: 'Contractors',
        gunRaiders: 'Gun Raiders'
    }

    const reactions = []

    let emojiText = 'Click the corresponding emoji with the role you would like to receive.\nWe have more roles coming to UGL in the very near future. In order to see all of this server you must have the roles of the channels you would like to see.\n\n'
    for (const key in emojis) {
        const emoji = getEmoji(key)
        reactions.push(emoji)

        const role = emojis[key]
        emojiText += `${emoji} - ${role}\n`
    }

    firstmessage(channelId, emojiText, reactions)

    const handleReaction = (reaction, user, add) => {
        if (user.id === '988206258614059068') {
        return
        }

        const emoji = reaction._emoji.name

        const { guild } = reaction.message

        const roleName = emojis[emoji]
        if (!roleName) {
        return
        }

        const role = guild.roles.cache.find((role) => role.name === roleName)
        const member = guild.members.cache.find((member) => member.id === user.id)

        if (add) {
        member.roles.add(role).catch(console.log)
        } else {
        member.roles.remove(role).catch(console.log)
        }
    }

    client.on('messageReactionAdd', (reaction, user) => {
        if (reaction.message.channel.id === channelId) {
        handleReaction(reaction, user, true)
        }
    })

    client.on('messageReactionRemove', (reaction, user) => {
        if (reaction.message.channel.id === channelId) {
        handleReaction(reaction, user, false)
        }
    })
}

//YouTube Notifications
const twitchConfig = require('./stormConfig.js');
const db = require("quick.db");
const request = new (require("rss-parser"))();
async function youtubeNotif() {
    if (db.fetch(`postedVideos`) === null) db.set(`postedVideos`, []);
    setInterval(() => {
        request.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${twitchConfig.channel_id}`)
        .then(data => {
            if (db.fetch(`postedVideos`).includes(data.items[0].link)) return;
            else {
                db.set(`videoData`, data.items[0]);
                db.push("postedVideos", data.items[0].link);
                let parsed = db.fetch(`videoData`);
                let channel = client.channels.cache.get(twitchConfig.channel);
                if (!channel) return;
                let message = twitchConfig.messageTemplate
                    .replace(/{author}/g, parsed.author)
                    .replace(/{title}/g, Discord.Util.escapeMarkdown(parsed.title))
                    .replace(/{url}/g, parsed.link);
                channel.send(message);
                console.log("New video was posted to discord");
            }
        });
    }, twitchConfig.watchInterval);
}

//Twitch Notifications
const uglStorm = require('./ghostreconTTV.js');
const uglKotic = require('./kotic.js');
const uglCaptain = require('./captain.js');
const uglAussie = require('./aussie.js');
const uglMitchell = require('./claxton.js');

client.once("ready", () => {
    console.log('UGL Offical is Online! Scanning Servers');
    client.user.setPresence({ activities: [{ name: 'on ' + client.guilds.cache.size + ' servers' }] });
    const CLIENT_ID = client.user.id;
    if(client.guilds.cache.get('981772358618583092') == '981772358618583092') {
        let Guild = client.guilds.cache.get('981772358618583092');
        if(!Guild) return false;
        return Guild.leave();
    }

    if(client.guilds.cache.get("741709634754314362") == '741709634754314362') {
        let BB = client.guilds.cache.get('741709634754314362');
        if(!BB) return false;
        return BB.leave();
    }

    //1009172922755203242
    if(client.guilds.cache.get("1009172922755203242") == '1009172922755203242') {
        let VRVIP = client.guilds.cache.get('1009172922755203242');
        if(!VRVIP) return false;
        return VRVIP.leave();
    }

    const guild = client.guilds.cache.get("899801075786342480");

    //client.application.commands.set([]);
    
    //guild.commands.set([]);
    
    console.log(client.guilds.cache.map((guild) => guild.name).join('\n'))
    const Guilds = client.guilds.cache.map(guild => guild.id).join('\n');
    console.log(Guilds);
    roleClaim();
    setInterval(() => {
        uglStorm(client);
        uglKotic(client);
        uglCaptain(client);
        uglAussie(client);
        uglMitchell(client);
        //hostReminder();
    }, twitchConfig.watchInterval);

    //Promotional Chat
    const promoChannel = client.channels.cache.get('899801075786342482')
    setInterval(() => {
        const promoEmbed = new MessageEmbed()
        .setTitle('Promotional Content')
        .setDescription('Hey everyone! Thanks for being apart of UGL and its many events! We would like to tell you all about our sponsorships and how you could help support UGL.\n\nFor a 10% discount on ULTI Energy Suppliments go to our affiliate link and help bring more revenue for UGL and its events.\n\n[Affiliate Link](https://ultisupps.rfrl.co/5d9r1)\n\nGet your VR accessories with a decent discount with VR Cover today!\n\n[Affiliate Link](https://vrcover.com/#UGLOFFICIAL)')
        .setColor("RED")
        .setThumbnail(client.user.displayAvatarURL())
        promoChannel.send({ embeds: [promoEmbed] }).then ((msg) => {
            setTimeout(() => {
                msg.delete();
            }, 172800000);
        });
    }, 172800000);

    //Merch
    setInterval(() => {
        const promoEmbed = new MessageEmbed()
        .setTitle('Merch Post')
        .setDescription('Hey everyone! We have merch!\n\nMake sure to check out our merch store and support UGL for bigger pots and more tournaments. We would like to keep our modes as free as possible but we need you all to help keep that possible.')
        .setColor("RED")
        .addField("Links", `[UGL Merch](https://store.streamelements.com/nmc_stormxshadow84) | [UGL Website](https://uglofficial.com)\n[UGL Twitch](https://twitch.tv/uglofficialvr) | [UGL Donations](https://www.patreon.com/uglofficial?fan_landing=true)`)
        .setThumbnail(client.user.displayAvatarURL())
        promoChannel.send({ embeds: [promoEmbed] }).then ((msg) => {
            setTimeout(() => {
                msg.delete();
            }, 21600000);
        });
    }, 21600000);

    //Host Reminders
    //Monday Reminders
    monScrimReminder.start();

    //Scrim Reminders
    
    const rest = new REST({
        version: '9'
    }).setToken(process.env.TOKEN);
    

    (async () => {
        try {
            if (process.env.ENV === 'production') {
                await rest.put(Routes.applicationCommands(CLIENT_ID), {
                    body: commands
                });
                console.log('All commands have been registered globally!');
            } else {
                await rest.put(Routes.applicationCommands(CLIENT_ID), {
                    body: commands
                });
                console.log('All commands have been registered locally!');
            }
        } catch (err) {
            if (err) console.log(err);
        }
    })();
    
});

client.on("interactionCreate", async interaction => {
    if (!interaction.isCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    

    try {
        await command.execute(interaction,client,canvas,member);
    } catch (err) {
        if (err) console.error(err);
        await interaction.reply({
            content: 'An error occurred while executing that command',
            ephemeral: true
        });
    }
});

//message event
client.on("messageCreate", async (message) => {
    
});

//member join event
client.on("guildMemberAdd", async (member) => {
    client.db.query("SELECT * FROM guild_settings WHERE `guild_ID`= '" + member.guild.id + "';",async function(AddErr,Addrow){
        if(Addrow[0] == null) {
            console.log(`${member.guild.id} is not setup yet.`)
            client.db.query("INSERT INTO guild_settings (guild_ID) VALUES ('" + member.guild.id + "');");
            console.log(`${member.guild.id} has been entered into the database`)
        }

        if(Addrow[0].moderation == '1'){
            const guild = member.guild
            console.log('Welcome Channel = ' + Addrow[0].welcome + '\n\nWelcome Message = ' + Addrow[0].welcome_message)
            if(Addrow[0].welcome == undefined || Addrow[0].welcome_message == undefined){
                return;
            }else{
                let welcomeChannel = Addrow[0].welcome;
                let welcomeMessage = Addrow[0].welcome_message;
                wchannelc = guild.channels.cache.find(channel => channel.id === welcomeChannel);

                if(!wchannelc){
                    console.log("Welcome message not sent. The server hasnt set it up yet")
                    return;
                }else{
                    var userJoined = { user: member.user.username, mention: "<@" + member.id + ">", created: member.user.createdAt };
                    var serverName = { server: guild.name, count: guild.memberCount };

                    const welcomeEmbed = new MessageEmbed()
                    .setTitle(`${member.user.username} Joined`, `${member.user.displayAvatarURL()}`)
                    .setColor("GREEN")
                    .setThumbnail(member.user.displayAvatarURL())
                    .setDescription(welcomeMessage.format(userJoined, serverName))
                    .setTimestamp(new Date())
                    wchannelc.send({ embeds: [welcomeEmbed] })
                    member.send({ embeds: [welcomeEmbed] });
                }
                if(!wchannelc){
                    console.log(guild.name + " has not setup their welcome channel.")
                    return;
                }
                let guildAdd = Addrow[0].logs;
                if(!guildAdd){
                    console.log(guild.name + " has not setup their log channels")
                    return;
                }else{
                    wlchannelc = guild.channels.cache.find(channel => channel.id === Addrow[0].logs);
                    let wlembed = new MessageEmbed()
                    .setTitle(`${member.user.username} Joined`, `${member.user.displayAvatarURL()}`)
                    .setColor("GREEN")
                    .setThumbnail(member.user.displayAvatarURL())
                    .setDescription(`**${member.user.username} has joined the server!**`)
                    .setTimestamp(new Date())
                    wlchannelc.send({ embeds: [wlembed] });
                }
            }
        } else {
            console.log("No Moderation used");
        }
    });
});

//member leave event
client.on("guildMemberRemove", async (member) => {
    client.db.query("SELECT * FROM guild_settings WHERE `guild_ID`= '" + member.guild.id + "';",function(lerr,lrow){
        if(lrow[0].moderation == '1'){
            if(lrow[0].goodbye == undefined || lrow[0].goodbye_message == undefined){
                return;
            }else{
                let goodbyeChannel = lrow[0].goodbye;
                let goodbyeMessage = lrow[0].goodbye_message;
                gchannelc = member.guild.channels.cache.find(gchan => gchan.id === goodbyeChannel);
                if(!gchannelc) return;
                var userLeft = { user: member.user.username, count: member.guild.memberCount }
                var guildName = { guild: member.guild.name }
                console.log("Goodbye message has been sent in " + member.guild.name + " (" + member.guild.id + ")")

                let leaveEmbed = new MessageEmbed()
                .setTitle(`${member.user.username} Left`, `${member.user.displayAvatarURL()}`)
                .setColor("RED")
                .setThumbnail(member.user.displayAvatarURL())
                .setDescription(goodbyeMessage.format(userLeft, guildName))
                gchannelc.send({ embeds: [leaveEmbed] });

                //let removeLogs = lrow[0].logs;
                glchannelc = member.guild.channels.cache.find(channel => channel.id === lrow[0].logs);
                if(!glchannelc){
                    console.log(member.guild.id + " has not setup a logs channel.")
                }else{
                    let glembed = new MessageEmbed()
                    .setTitle(`${member.user.username} Left`, `${member.user.displayAvatarURL()}`)
                    .setColor("RED")
                    .setThumbnail(member.user.displayAvatarURL())
                    .setDescription(`${member.user.tag} has left the server!`)
                    glchannelc.send({ embeds: [glembed] });
                }
            }
        } else {
            console.log('No Moderation Used')
        }
    });
});

//autorole event
client.on("guildMemberAdd", async (member) => {
    client.db.query("SELECT * FROM guild_settings WHERE guild_ID= '" + member.guild.id + "';", async function(err,rows){
        if(rows[0] == null) {
            return;
        }

        if(rows[0].autorole_check == "1"){
            if(rows[0].autorole == null){
                return;
            }else{
                try{
                    var role = member.guild.roles.cache.find(roleMember => roleMember.id === rows[0].autorole)
                    member.roles.add(role)
                }catch(e){
                    console.log(member.guild.id + " [" + member.guild.name + "]\n" + e)
                }
            }
        } else {
            console.log("No Autorole used");
        }
    });
});

client.on('messageDelete', async (msg) => {
    client.db.query("SELECT * FROM guild_settings WHERE `guild_ID`= '" + msg.guild.id + "';",function(msgderr,msgdrow){
        if (msg.channel.type === 'DM') return;
        if (msg.author.bot) return;
        if(!msgdrow[0].logs){
            return;
        }
        let logs = msgdrow[0].logs;
        let modlog = msg.guild.channels.cache.get('911468692418727976');
        if (!modlog){
            return;
        }else{
            let deleteEmbed = new MessageEmbed()
            .setTitle(msg.guild.name + "    |    Message Deleted    |")
            .setColor("ORANGE")
            .setDescription("**__Message Author__**: " + msg.author.tag + "\n**__In channel__**: <#" + msg.channel.id + ">\n\n**__Deleted Message__**:\n\   " + msg.content)
            .setThumbnail(msg.author.displayAvatarURL())
            .setTimestamp();
            modlog.send({ embeds: [deleteEmbed] });
        }
    });
});

client.on('modalSubmit', async (modal) => {
    if(modal.customId === 'feedback') {
        const nameResponse = modal.getTextInputValue('name');
        const feedbackResponse = modal.getTextInputValue('response')
        const gameMode = modal.getSelectMenuValues('mode');
        const feedbackChannel = client.channels.cache.get('993546609386344529');
        modal.reply(`${modal.user} Your feeback has been sent to the team`);
        feedbackChannel.send(`**__DISCORD USERNAME__**\n${modal.user.username}\n\n**__PLAYER NAME__**\n${nameResponse}\n\n**__FEEDBACK__**\n${feedbackResponse}`);
    }  
});

client.login(process.env.TOKEN);