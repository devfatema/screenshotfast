const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        default: null
    },
    type: {
        type: String,
        default: 'user'
    },
    username: {
        type: String,
        required: false 
    },
    email: {
        type: String,
        required: true
    },
    plan_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Plan',
        default: null
    },
    password: {
        type: String,
        default: null
    },
    avatar: {
        type: String,
        default: null
    },
    email_verification_at: {
        type: Date,
        default: null
    },
    will_expire: {
        type: Date,
        default: null
    },
    status: {
        type: String,
        required: true,
        default: 'active'
    },
    account_type: {
        type: String,
        default: 'free'
    },
    remember_token: {
        type: String,
        default: null
    },
    verify_token: {
        type: Date,
        default: null
    },
    data: {
        type: Object,
        default: null
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)
