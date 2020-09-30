const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

// const User = mongoose.model('User', {
//     name: {
//         type: String
//     },
//     age: {
//         type: Number,
//         validate(value){
//             if (value <= 0)
//                 throw new Error("You are too small to be on this app");
//         }
//     },
//     email: {
//         type: String,
//         validate(value) {
//             if (!validator.isEmail(value))
//                 throw new Error('invalid Email address')
//         },
//         required: true
//     },
//     password: {
//         type: String,
//         minLength: 6,
//         trim: true, 
//         required: true,
//         validate(value) {
//             if (value.includes('password'))
//                 throw new Error('Password cant containe the word password')
//         }
//     }
// })

// const me = new User({
//     name: 'Ankush bharadwaj',
//     age: 29,
//     email: 'abba123@yahoo.com',
//     password: 'pass123'
// })

// const Tasks = mongoose.model('Tasks',{
//     desc: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     }
// })

// const first = new Tasks({
//     desc: 'Say hi to Stanley',
// })