const mongoose = require('mongoose');

const departmentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    candidates: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'candidate',
        }
    ]
});

module.exports = mongoose.model('department',departmentSchema);