const { EmbedBuilder } = require('discord.js');
const clientUtils = require('../../../utils/clientUtils');

/**
 * @type {import("@structures/Command")}
 */
module.exports = {
    name: 'prefix',
    description: 'Get or change the prefix of the bot on your server',
    category: 'guild',
    devOnly: false,
    isNsfw: false,

    kioRun: async (client, message, args) => {
        if (!message.member.permissions.has('MANAGE_GUILD'))
            return message.reply({
                content:
                    "You don't have the `MANAGE_GUILD` permission to use this command!",
                allowedMentions: { repliedUser: false },
            });

        const prefix = args[0];

        if (!prefix) {
            return message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle('Prefix')
                        .setDescription(
                            `My prefix for this server is \`${clientUtils.getBotData(
                                'prefix',
                            )}\``,
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
        } else {
            if (prefix.length > 5)
                return message.reply({
                    content: 'The prefix cannot be longer than 5 characters!',
                    allowedMentions: { repliedUser: false },
                });

            clientUtils.changeBotData('prefix', prefix);

            const embed = new EmbedBuilder()
                .setTitle('Prefix')
                .setDescription(
                    `Successfully changed the prefix to \`${prefix}\``,
                )
                .setColor(client.colors.PINK)
                .setFooter({
                    text: `Triggered by ${message.author.tag}`,
                    iconURL: message.author.displayAvatarURL({
                        dynamic: true,
                    }),
                })
                .setTimestamp();

            message.reply({
                embeds: [embed],
            });

            message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle('Prefix')
                        .setDescription(
                            `Successfully changed the prefix to \`${prefix}\``,
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
    },
};
