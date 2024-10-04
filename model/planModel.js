const mongoose = require('mongoose')

const planSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    duration_type: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    popular: {
        type: Boolean,
        default: false
    },
    free_trial: {
        type: Boolean,
        default: false
    },
    free_trail_limit: {
        type: Number,
        default: 14
    },
    data: {
        type: Object,
        default: null
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Plan', planSchema)
