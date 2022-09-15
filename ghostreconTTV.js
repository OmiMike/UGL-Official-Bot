const { Discord, MessageEmbed } = require("discord.js");
const config = require("./stormConfig.js");
const TwitchAPI = require('node-twitch').default;
const twitch = new TwitchAPI({
    client_id: config.twitchClientID,
    client_secret: config.twitchClientSecret
});

module.exports = async (client) => {
    client.db.query("SELECT * FROM guild_settings WHERE guild_ID= '899801075786342480';", async function (err, streamRows) {
        const streamers = "nmc_ghost_recon_ttv";
        const streams = await twitch.getStreams({ channels: streamers });
        const result = streams.data[0];
        console.log(streams);

        if(result == null) {
            channelIsLive = false;
        } else { 
            channelIsLive = true;
        }
        let channelSend = client.channels.cache.get('901828570203193424');
        let reconSend = client.channels.cache.get('934189524102307880');

        if(channelIsLive == false) {
            if(streamRows[0].isLive_storm == 1) {
                client.db.query("UPDATE guild_settings SET `isLive_storm` = '0' WHERE guild_ID= '899801075786342480';");
                console.log("Notifications turned off")
            }
        } else {
            //<@&${config.otherPing}> 
            if(streamRows[0].isLive_storm == 0) {
                const streamEmbed = new MessageEmbed()
                .setTitle(result.title)
                .setURL(`https://www.twitch.tv/${result.user_name}`)
                .setDescription(`**Game Name** : ${result.game_name}`)
                .setImage(result.getThumbnailUrl())
                .setThumbnail(client.user.avatarURL())
                .addField("Info", "Streamer Name: " + result.user_name + "\nLive Viewers: " + result.viewer_count)
                channelSend.send(`<@&${config.otherPing}> ${result.user_name} is now live playing ${result.game_name}. Go hang out and say whats up!`)
                channelSend.send({ embeds: [ streamEmbed ] })

                reconSend.send(`<@&934462987257921576> ${result.user_name} is now live playing ${result.game_name}. Go hang out and say whats up!`)
                reconSend.send({ embeds: [ streamEmbed ] })
                client.db.query("UPDATE guild_settings SET `isLive_storm` = '1' WHERE guild_ID= '899801075786342480';");
            }
        }
    });
}