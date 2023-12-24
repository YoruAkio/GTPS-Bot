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
                    .setTitle(
                        'Growtopia Private Server',
                        message.guild.iconURL(),
                    )
                    .setDescription(
                        `**Online Players:** ${client.gtps.getOnlinePlayers()}`,
                    )
                    .setColor(client.colors.PINK)
                    .setTimestamp()
                    .setFooter({
                        text: 'Growtopia Private Server',
                        iconURL: message.guild.iconURL(),
                    }),
            ],
        });
    },
};
