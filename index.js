require('dotenv').config();

const {
    Client,
    GatewayIntentBits,
    ActivityType,
    Collection,
    Partials,
} = require('discord.js');
const gtpsUtils = require('./utils/gtpsUtils');

const client = new Client({
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
client.serverData = require('./data/serverData.json');
client.logger = require('./utils/Logger.js');
client.gtps = new gtpsUtils(client);

require('./utils/consoleRunning');
require('./handlers/index')(client);
require('./utils/serverDataGrabber')(client);

client.login(process.env.TOKEN);
