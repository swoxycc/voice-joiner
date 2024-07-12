const fs = require('fs');
const { Client, GatewayIntentBits, Events } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const axios = require('axios');

console.log("                                      ");
console.log("    ╔═╗╦ ╦╔═╗═╗ ╦╦ ╦   ╦╔═╗╦╔╗╔╔═╗╦═╗ ");
console.log("    ╚═╗║║║║ ║╔╩╦╝╚╦╝   ║║ ║║║║║║╣ ╠╦╝ ");
console.log("    ╚═╝╚╩╝╚═╝╩ ╚═ ╩   ╚╝╚═╝╩╝╚╝╚═╝╩╚═ ");
console.log("                                      ");

const tokensFile = fs.readFileSync('tokens.txt', 'utf8');
const tokenLines = tokensFile.split('\n').map(line => line.trim());

tokenLines.forEach(line => {
    if (line === '') return;
    const [token, channelId] = line.split(':');
    const client = new Client({
        intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
    });

    client.once(Events.ClientReady, async (client) => {
        console.log('\x1b[32m', "[+] Botlarınız Başarıyla Sese Bağlandı");

        // Botun durumunu "rahatsız etmeyin" olarak ayarlayın
        client.user.setPresence({
            status: 'dnd',
            activities: [{ name: 'Swoxy Code <3' }],
        });

        try {
            console.log('\x1b[32m', "---------------------------------------");
            const channel = client.channels.cache.get(channelId);

            if (channel) {
                joinVoiceChannel({
                    selfDeaf: true,
                    selfMute: true,
                    group: client.user.id,
                    channelId: channel.id,
                    guildId: channel.guild.id,
                    adapterCreator: channel.guild.voiceAdapterCreator,
                });
            } else {
                console.log('\x1b[31m', "[-] Kanal Bulunamadı");
            }
        } catch (error) {
            console.log('\x1b[31m', "[API] APİ BAKIMDA veya erişilemiyor");
            console.error(error);
        }
    });

    client.login(token);
});
