const mongoose = require('mongoose');

const candidateSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'department',
        required: true,
    },
    bio: {
        type: String,
        default: ''
    },
    image_url: {
        type: String,
        default: ''
    },
    vote_count: {
        type: Number,
        default: 0
    },
    
})

module.exports =  mongoose.model('candidate', candidateSchema);