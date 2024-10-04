const mongoose = require('mongoose')

const optionSchema = mongoose.Schema({
    key: {
        type: String,
        required: true
    },
    value: {
        type: Object,
        required: true
    }
})


module.exports = mongoose.model('Option', optionSchema)