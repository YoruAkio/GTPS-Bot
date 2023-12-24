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
        const categories = [
            ...new Set(client.commands.map(cmd => cmd.category)),
        ];

        const row = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
                .setCustomId('select')
                .setPlaceholder('Select a category')
                .addOptions(
                    categories.map(category => {
                        return {
                            label: category,
                            description: `Show ${category} commands`,
                            value: category,
                        };
                    }),
                ),
        );

        const embed = new EmbedBuilder()
            .setTitle('Help Menu')
            .setDescription('Select a category to view commands.')
            .setColor('#0099ff');

        await message.reply({ embeds: [embed], components: [row] });

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

        collector.on('end', collected =>
            console.log(`Collected ${collected.size} interactions.`),
        );
    },
};
