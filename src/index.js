const express = require('express');
require('./database/mongoose')
const userRouter = require('./router/user')
const taskRouter = require('./router/task')
const jwt = require('jsonwebtoken')
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

app.listen(port)