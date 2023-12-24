const mongoose = require('mongoose');

module.exports = class Database {
    /**
     * Connect to the database
     * @param {object} client - The client object
     */
    static async connect(client) {
        if (client.config.mongoDb.isActive === true) {
            try {
                mongoose.set('strictQuery', false);
                await mongoose
                    .connect(client.config.mongoDb.MONGO_URI)
                    .then(() => {
                        client.logger.info(
                            'Database',
                            'Connected to the database!',
                        );
                    });
            } catch (error) {
                client.logger.info('Database', `Error: ${error}`);
            }
        } else {
            client.logger.error('Database', 'Database is disabled.');
        }
    }
};
