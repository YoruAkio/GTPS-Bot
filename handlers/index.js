const fs = require('fs');
const path = require('path');
const { REST, Routes, PermissionsBitField } = require('discord.js');

/**
 * @param {Client} client
 */
module.exports = client => {
    const eventsDir = path.join(__dirname, '../events/');
    const commandsDir = path.join(__dirname, '../commands/messages/');

    if (!fs.existsSync(eventsDir)) {
        client.logger.error(
            'Handler',
            `Directory does not exist: ${eventsDir}`,
        );
        return process.exit();
    } else if (!fs.existsSync(commandsDir)) {
        client.logger.error(
            'Handler',
            `Directory does not exist: ${commandsDir}`,
        );
        return process.exit();
    }

    for (const dir of fs.readdirSync(eventsDir)) {
        const dirPath = path.join(eventsDir, dir);
        for (const file of fs.readdirSync(dirPath)) {
            const filePath = path.join(dirPath, file);
            const files = require(filePath);

            if (files.name) {
                if (files.once) {
                    client.once(files.name, (...args) =>
                        files.kioEventRun(client, ...args),
                    );
                    client.logger.info(
                        'Handler',
                        `Loaded once event ${files.name}`,
                    );
                } else {
                    client.on(files.name, (...args) =>
                        files.kioEventRun(client, ...args),
                    );
                    client.logger.info('Handler', `Loaded event ${files.name}`);
                }
            } else {
                client.logger.error(
                    'Handler',
                    `No name provided for event ${file}`,
                );
            }
        }
    }

    for (const dir of fs.readdirSync(commandsDir)) {
        const dirPath = path.join(commandsDir, dir);
        for (const file of fs.readdirSync(dirPath)) {
            const filePath = path.join(dirPath, file);
            const files = require(filePath);

            if (files.name) {
                client.commands.set(files.name, files);
                if (files.aliases && Array.isArray(files.aliases)) {
                    files.aliases.forEach(alias => {
                        client.aliases.set(alias, files.name);
                    });
                }
                client.logger.info(
                    'Handler',
                    `Loaded command ${files.name} with aliases ${
                        files.aliases ? files.aliases : 'Not set'
                    }`,
                );
            } else {
                client.logger.error(
                    'Handler',
                    `No name provided for command ${file}`,
                );
            }
        }
    }
};
