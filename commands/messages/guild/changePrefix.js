const { EmbedBuilder } = require('discord.js');
const prefixModel = require('../../../models/Guild');

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
                            `My prefix for this server is \`${await client.prefix(
                                message,
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

            try {
                let data = await prefixModel.findOne({
                    Guild: message.guild.id,
                });

                if (data) {
                    await prefixModel.findOneAndDelete({
                        Guild: message.guild.id,
                    });

                    let newData = new prefixModel({
                        Guild: message.guild.id,
                        Prefix: prefix,
                    });

                    await newData.save();
                    client.logger.info(
                        'Database',
                        `Change data prefix to ${prefix}`,
                    );
                } else if (!data) {
                    let newData = new prefixModel({
                        Guild: message.guild.id,
                        Prefix: prefix,
                    });

                    await newData.save();
                    client.logger.info('Database', 'Created new data.');
                }
            } catch (err) {
                client.logger.error('Database', `Error: ${err}`);
            }

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
