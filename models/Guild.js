const { Schema, model } = require('mongoose');

const guildSchema = new Schema({
    guildId: {
        type: String,
        required: true,
        unique: true,
    },
    prefix: {
        type: String,
        required: true,
        default: '-',
    },
    language: {
        type: String,
        required: true,
        default: 'en',
    },
    levelLogs: {
        type: String,
        required: false,
        default: null,
    },
});

module.exports = model('Guild', guildSchema);
