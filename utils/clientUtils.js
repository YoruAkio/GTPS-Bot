const { version } = require('../package.json');
// const client = require('../index');
const botData = require('../data/botData.json');
const fs = require('fs');

module.exports = class ClientUtils {
    /**
     * Return bot version
     * @returns {string} The bot version.
     */
    static getVersion() {
        return version;
    }

    /**
     * @param {string} key
     * @param {any} value
     */
    static changeBotData(key, value) {
        botData[key] = value;
        fs.writeFileSync('./data/botData.json', JSON.stringify(botData));
    }
    /**
     * @param {string} key
     * @returns {any} The value of the key.
     */
    static getBotData(key) {
        return botData[key];
    }

    /**
     * @param {string} search
     * @param {Boolean} exact
     */
    static async resolveUsers(search, exact = false) {
        if (!search || typeof search !== 'string') return [];
        const users = [];

        // check if userId is passed
        const patternMatch = search.match(/(\d{17,20})/);
        if (patternMatch) {
            const id = patternMatch[1];
            const fetched = await client.users
                .fetch(id, { cache: true })
                .catch(() => {}); // check if mentions contains the ID
            if (fetched) {
                users.push(fetched);
                return users;
            }
        }
    }

    /**
     * Returns remaining time in days, hours, minutes and seconds
     * @param {number} timeInSeconds
     */
    static timeformat(timeInSeconds) {
        const days = Math.floor((timeInSeconds % 31536000) / 86400);
        const hours = Math.floor((timeInSeconds % 86400) / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = Math.round(timeInSeconds % 60);
        return (
            (days > 0 ? `${days} days, ` : '') +
            (hours > 0 ? `${hours} hours, ` : '') +
            (minutes > 0 ? `${minutes} minutes, ` : '') +
            (seconds > 0 ? `${seconds} seconds` : '')
        );
    }

    static getTimeNow() {
        const time = new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Jakarta',
        });

        return time;
    }

    /**
     * Get bot's invite
     */
    static getInvite() {
        return client.generateInvite({
            scopes: ['bot', 'applications.commands'],
            permissions: [
                'Administrator',
                'AddReactions',
                'AttachFiles',
                'BanMembers',
                'ChangeNickname',
                'Connect',
                'DeafenMembers',
                'EmbedLinks',
                'KickMembers',
                'ManageChannels',
                'ManageGuild',
                'ManageMessages',
                'ManageNicknames',
                'ManageRoles',
                'ModerateMembers',
                'MoveMembers',
                'MuteMembers',
                'PrioritySpeaker',
                'ReadMessageHistory',
                'SendMessages',
                'SendMessagesInThreads',
                'Speak',
                'ViewChannel',
            ],
        });
    }
};
