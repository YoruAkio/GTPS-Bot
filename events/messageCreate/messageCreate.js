const prefixModel = require('../../models/Guild');
const { Permissions, EmbedBuilder } = require('discord.js');
const { commands } = require('../../index');

module.exports = {
    name: 'messageCreate',

    /**
     * @type {import("discord.js").Client} client
     * @type {import("discord.js").Message} message
     */
    kioEventRun: async (client, message) => {
        client.prefix = async function (message) {
            let custom;

            const data = await prefixModel
                .findOne({ Guild: message.guild.id })
                .catch(err => console.log(err));

            if (data) {
                custom = data.Prefix;
            } else {
                custom = client.config.defaultPrefix;
            }

            return custom;
        };

        const prefixData = await client.prefix(message);

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

        if (commands.testOnly) {
            if (!(message.guild.id === client.config.Bot.testServer)) {
                return message.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle('Test Server Only')
                            .setDescription('This command cannot be ran here.')
                            .setColor(client.colors.PINK),
                    ],
                });
            }
        }

        if (command.isNsfw) {
            if (!message.channel.nsfw) {
                return message.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle('NSFW Channel Only')
                            .setDescription(
                                'This command can only be ran in an NSFW channel.',
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

        if (command.botPermissions?.length) {
            for (const permission of command.botPermissions) {
                if (!message.guild.me.permissions.has(permission)) {
                    return message.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setTitle('Missing Permissions')
                                .setDescription(
                                    `I don't have permission(s) \`${permission}\` to run this command`,
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
