const fs = require('fs');

module.exports = class GtpsUtils {
    constructor(client) {
        this.client = client;
    }
    /**
     * @returns {string}
     */
    getOnlinePlayers() {
        return fs.readFileSync(this.client.config.gtpsMisc.onlineFile, 'utf8');
    }
    /**
     * @returns {number}
     */
    getDataPlayers() {
        const folder = this.client.config.gtpsMisc.folderPlayers;

        return fs.readdirSync(folder).length;
    }
    getDataWorlds() {
        const folder = this.client.config.gtpsMisc.folderWorlds;

        return fs.readdirSync(folder).length;
    }
};
