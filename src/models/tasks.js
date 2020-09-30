const mongoose = require('mongoose')

const Tasks = mongoose.model('Tasks', {
    desc: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = Tasks