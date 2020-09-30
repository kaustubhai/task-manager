const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number,
        validate(value){
            if (value <= 0)
                throw new Error("You are too small to be on this app");
        }
    },
    email: {
        type: String,
        validate(value) {
            if (!validator.isEmail(value))
                throw new Error('invalid Email address')
        },
        required: true
    },
    password: {
        type: String,
        minLength: 6,
        trim: true, 
        required: true,
        validate(value) {
            if (value.includes('password'))
                throw new Error('Password cant containe the word password')
        }
    }
})

module.exports = User