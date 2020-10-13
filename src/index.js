const express = require('express');
require('./database/mongoose')
const userRouter = require('./router/user')
const taskRouter = require('./router/task')
const jwt = require('jsonwebtoken');
const User = require('./models/user');
const app = express();

const port = process.env.port || 3000;

// app.use((req, res, next) => {
//     if(req.method === 'GET')
//         res.send('Get Mat Karo')
//     else
//         next()
// })

app.use(express.json())

app.use(userRouter)
app.use(taskRouter)

app.get('*', (req, res) => {
    res.status(404).send('404 -> File not found. Go Back')
})

// const main = async () => {

//     // const task = await Tasks.findById('5f857160a993d45be05c6d3a')
//     // console.log(task)

//     const user = await User.findById('5f8569e856f7615630922a91')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }

// main();

app.listen(port)