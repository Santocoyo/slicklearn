import mongoose, { Schema } from "mongoose"

const User = new Schema({
    username: {
        unique: true,
        required: true,
        type: String
    },

    firstName: {
        required: true,
        type: String
    },

    lastName: {
        required: true,
        type: String
    },

    email: {
        unique: true,
        required: true,
        type: String
    },

    password: {
        required: true,
        type: String
    },

    registeredAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('User', User);