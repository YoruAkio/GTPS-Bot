const {
    ActionRowBuilder,
    StringSelectMenuBuilder,
    EmbedBuilder,
} = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Get command list',
    category: 'info',
    devOnly: false,
    isNsfw: false,

    kioRun: async (client, message, args) => {
        const emoji = {
            info: '🔍',
            moderation: '🔨',
            fun: '🎮',
            misc: '🔧',
            devs: '👑',
            gtps: '🔫',
        };

        const categories = [
            ...new Set(client.commands.map(cmd => cmd.category)),
        ];

        const row = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
                .setCustomId('select')
                .setPlaceholder('Select a category')
                .addOptions(
                    categories.map(category => {
                        const capitalizedCategory =
                            category.charAt(0).toUpperCase() +
                            category.slice(1);
                        return {
                            label: `${emoji[category]} ${capitalizedCategory}`,
                            description: `Show ${capitalizedCategory} commands`,
                            value: category,
                        };
                    }),
                ),
        );

        const embed = new EmbedBuilder()
            .setTitle('Help Menu')
            .setDescription('Select a category to view commands.')
            .setColor('#0099ff');

        const botMessage = await message.reply({
            embeds: [embed],
            components: [row],
        });

        const filter = i =>
            i.customId === 'select' && i.user.id === message.author.id;
        const collector = message.channel.createMessageComponentCollector({
            filter,
            time: 30000,
        });

        collector.on('collect', async i => {
            const selectedCategory = i.values[0];
            const commands = client.commands.filter(
                cmd => cmd.category === selectedCategory,
            );

            const embed = new EmbedBuilder()
                .setTitle(`${selectedCategory} Commands`)
                .setDescription(
                    commands
                        .map(cmd => `\`${cmd.name}\`: ${cmd.description}`)
                        .join('\n'),
                )
                .setColor('#0099ff');

            await i.update({ embeds: [embed] });
        });

        collector.on('end', async collected => {
            console.log(`Collected ${collected.size} interactions.`);
            await botMessage.edit({
                embeds: [
                    new EmbedBuilder()
                        .setTitle('Help Menu')
                        .setDescription('⚠ | This command is not available.')
                        .setColor('#0099ff'),
                ],
                components: [],
            });
        });
    },
};
