const mongoose = require('mongoose');

const dashboardItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,

    },
    dateOfBirth: {
        type: Date,
        required: true
    }
});

module.exports = Dash = mongoose.model('dashboard', dashboardItemSchema);
