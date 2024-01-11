const { EmbedBuilder } = require('discord.js');

/**
 * @type {import("@structures/Command")}
 */
module.exports = {
    name: 'online',
    description: 'Get the online players of Growtopia Private Server',
    category: 'gtps',
    devOnly: false,
    isNsfw: false,

    kioRun: async (client, message, args) => {
        message.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle('Growtopia Private Server')
                    .setThumbnail(message.guild.iconURL())
                    .addFields(
                        {
                            name: '**Online**',
                            value: client.serverData.online,
                            inline: true,
                        },
                        {
                            name: '**Players**',
                            value: client.serverData.players,
                            inline: true,
                        },
                        {
                            name: '**Worlds**',
                            value: client.serverData.worlds,
                            inline: true,
                        },
                    )
                    .setColor(client.colors.PINK)
                    .setTimestamp()
                    .setFooter({
                        text: `Triggered by ${message.author.tag}`,
                        iconURL: message.author.displayAvatarURL({
                            dynamic: true,
                        }),
                    }),
            ],
        });
    },
};
