const { Permissions, EmbedBuilder } = require('discord.js');
const { commands } = require('../../index');
const clientUtils = require('../../utils/clientUtils');

module.exports = {
    name: 'messageCreate',

    /**
     * @type {import("discord.js").Client} client
     * @type {import("discord.js").Message} message
     */
    kioEventRun: async (client, message) => {
        const prefixData = clientUtils.getBotData('prefix');

        if (message.content.includes(`${client.user.id}`)) {
            return message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle('Prefix')
                        .setDescription(
                            `My prefix for this server is \`${prefixData}\``,
                        )
                        .setColor(client.colors.PINK)
                        .setFooter({
                            text: `Triggered by ${message.author.tag}`,
                            iconURL: message.author.displayAvatarURL({
                                dynamic: true,
                            }),
                        })
                        .setTimestamp(),
                ],
            });
        }

        if (
            message.author.bot ||
            !message.guild ||
            !message.content.toLowerCase().startsWith(prefixData)
        )
            return;

        const [cmd, ...args] = message.content
            .slice(prefixData.length)
            .trim()
            .split(/ +/g);

        const command =
            client.commands.get(cmd.toLowerCase()) ||
            client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

        if (!command) return;

        if (command.devOnly || command.onlyDev || command.isDev) {
            if (!client.config.Bot.devs.includes(message.author.id)) {
                return message.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle('Developer Only')
                            .setDescription(
                                'Only developers are allowed to run this command.',
                            )
                            .setColor(client.colors.PINK),
                    ],
                });
            }
        }

        if (command.userPermissions?.length) {
            for (const permission of command.userPermissions) {
                if (!message.member.permissions.has(permission)) {
                    return message.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setTitle('Missing Permissions')
                                .setDescription(
                                    `You do't have permission(s) \`${permission}\` to run this command`,
                                )
                                .setColor(client.colors.PINK),
                        ],
                    });
                }
            }
        }

        await command.kioRun(client, message, args);
    },
};
