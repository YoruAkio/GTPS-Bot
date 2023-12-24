require('dotenv').config();

const {
    Client,
    GatewayIntentBits,
    ActivityType,
    Collection,
    Partials,
} = require('discord.js');

const client = new Client({
    // Status of the bot
    presence: {
        status: 'idle',
        afk: true,
        activities: [
            {
                name: 'Doing something with discord stuff',
                type: ActivityType.Competing,
            },
        ],
    },

    // Required in Discord.js v14
    intents: [Object.keys(GatewayIntentBits).filter(i => isNaN(i))],
    partials: [Object.keys(Partials).filter(i => isNaN(i))],
    restRequestTimeout: 30000,
});

module.exports = client;

client.commands = new Collection();
client.aliases = new Collection();
client.slashCommands = new Collection();

client.colors = require('./conf.js').Colors;
client.config = require('./conf.js').Bot;
client.logger = require('./utils/Logger.js');

require('./utils/consoleRunning');
require('./handlers/index')(client);
require('./utils/databaseUtils').connect(client);

client.login(process.env.TOKEN);
