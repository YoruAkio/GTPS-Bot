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
        return message.channel.send(
            new EmbedBuilder()
                .setTitle('Pong!')
                .setDescription(`🏓 | **Latency**: ${client.ws.ping}ms`)
                .setColor(client.colors.info)
                .setTimestamp(),
        );
    },
};
