const { Schema, model } = require('mongoose');

const guildSchema = new Schema({
    Guild: {
        type: String,
        required: true,
        unique: true,
    },
    Prefix: {
        type: String,
        required: true,
        default: '-',
    },
    LevelLogs: {
        type: String,
        required: false,
        default: null,
    },
});

module.exports = model('Guild', guildSchema);
