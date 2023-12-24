const mongoose = require('mongoose');

module.exports = class Database {
    /**
     * Connect to the database
     * @param {object} client - The client object
     */
    static async connect(client) {
        if (client.config.mongo.isActive) {
            try {
                mongoose.set('strictQuery', false);
                await mongoose.connect(client.config.mongo.MONGO_URI, {
                    keepAlive: true,
                });
                client.logger.info('Database', '🧶 Connected to DB.');
            } catch (error) {
                client.logger.info('Database', `Error: ${error}`);
            }
        } else {
            client.logger.error('Database', 'Database is disabled.');
        }
    }
};
