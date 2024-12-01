const  mongoose = require('mongoose');

const voteSchema = mongoose.Schema({
    voter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'department',
        required: true
    },
    candidate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate',
        required: true
    },

})

module.exports = mongoose.model('vote',voteSchema);