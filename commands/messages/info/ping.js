const { EmbedBuilder } = require('discord.js');

/**
 * @type {import("@structures/Command")}
 */
module.exports = {
    name: 'ping',
    description: "Get the bot's ping",
    category: 'info',
    devOnly: false,
    isNsfw: false,

    kioRun: async (client, message, args) => {
        const msg = await message.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle('Pinging...')
                    .setColor(client.colors.PINK)
                    .setTimestamp(),
            ],
        });

        msg.edit({
            embeds: [
                new EmbedBuilder()
                    .setTitle('Pong!')
                    .setDescription(
                        `**Bot Latency:** ${Math.floor(
                            msg.createdTimestamp - message.createdTimestamp,
                        )}ms\n**API Latency:** ${Math.round(client.ws.ping)}ms`,
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
