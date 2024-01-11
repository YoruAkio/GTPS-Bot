const fs = require('fs');
const path = require('path');
const serverData = require('../data/serverData.json');

module.exports = client => {
    if (client.config.botStatus) {
        const folderPlayers = path.join(
            __dirname,
            client.config.gtpsMisc.folderPlayers,
        );
        const folderWorlds = path.join(
            __dirname,
            client.config.gtpsMisc.folderWorlds,
        );
        const onlineFile = path.join(
            __dirname,
            client.config.gtpsMisc.onlineFile,
        );

        if (!fs.existsSync(folderPlayers)) {
            console.log(`Folder player doesn't exist, creating...`);
        } else if (!fs.existsSync(folderWorlds)) {
            console.log(`Folder worlds doesn't exist, creating...`);
        } else if (!fs.existsSync(onlineFile)) {
            console.log(`File online.txt doesn't exist, creating...`);
        }

        setInterval(() => {
            serverData.online = fs.readFileSync(onlineFile, 'utf8');
            serverData.players = fs.readdirSync(folderPlayers).length;
            serverData.worlds = fs.readdirSync(folderWorlds).length;
        }, 5000);
    } else {
        // outout using gradient-string red
        console.log('Bot status is disabled, setting the bot as normal bot...');
    }
};
