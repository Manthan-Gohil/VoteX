const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: String,
    student_id: {
        type: String,
        required: true,
        unique: true,
    },
    has_voted: {
        type: Boolean,
        default: false,
    },
    voting_status: [
        {
            department:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'department'
            },
            voted: {
                type: Boolean,
                default: false,
            },
        },
    ]
},{timestamps: true});

module.exports =  mongoose.model("user", userSchema);