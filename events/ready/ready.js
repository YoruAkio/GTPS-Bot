const { ActivityTyoes } = require('discord.js');

module.exports = {
    name: 'ready',
    once: true,
    kioEventRun: async client => {
        console.log(`🖥 ${client.user.tag} Logged into discord!`);

        // Set the client user's activity
        setInterval(() => {
            if (client.config.botStatus) {
                client.user.setPresence({
                    status: 'online',
                    activities: [
                        {
                            name: `Communication with ${client.serverData.online} 🤼 and watching ${client.serverData.worlds} 🌎`,
                            type: 4,
                        },
                    ],
                });
            } else {
                client.user.setPresence({
                    status: 'online',
                    activities: [
                        {
                            name: `Watching whole worlds 🌎`,
                            type: 4,
                        },
                    ],
                });
            }
        });
    },
};
