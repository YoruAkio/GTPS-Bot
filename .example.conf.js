module.exports = {
    Bot: {
        defaultPrefix: '-',
        test_server: [''],
        client_id: '',
        devs: [''],
        Server: {
            commandChannel: [''],
            logChannel: '',
            errorChannel: '',
        },
        mongo: {
            isActive: false,
            MONGO_URI: '', // https://www.mongodb.com/cloud/atlas
        },
    },
    Colors: {
        BOT_EMBED: '#068ADD',
        TRANSPARENT: '#36393F',
        SUCCESS: '#00A56A',
        ERROR: '#D61A3C',
        WARNING: '#F7E919',
        PINK: '#FF91A4',
    },
    Webhooks: {
        ERROR_LOGS: '',
    },
};
