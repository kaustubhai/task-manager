const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
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
        unique: true,
        validate(value) {
            if (!validator.isEmail(value))
                throw new Error('invalid Email address')
        },
        required: true
    },
    password: {
        type: String,
        minlength: 6,
        trim: true, 
        required: true,
        validate(value) {
            if (value.includes('password'))
                throw new Error('Password cant containe the word password')
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }]
})

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email: email })
    if (!user) {
        throw new Error('No account found')
    }
    const valid = await bcrypt.compare(password, user.password)

    if (!valid)
        throw new Error('Unable to login')
    
    return user
}

userSchema.methods.generateAuthToken = async function() {
    const token = await jwt.sign({data: this._id.toString()}, 'kaustubh229')
    this.tokens = this.tokens.concat({'token': token})
    await this.save()
    return token
}

userSchema.pre('save', async function (next) {

    if (this.isModified('password'))
        this.password = await bcrypt.hash(this.password, 8)
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User