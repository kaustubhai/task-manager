const express = require('express');
require('./database/mongoose')
const userRouter = require('./router/user')
const taskRouter = require('./router/task')

const app = express();

const port = process.env.port || 3000;

app.use(express.json())

app.use(userRouter)
app.use(taskRouter)

app.get('', (req, res) => {
    res.send('Hello')
})

app.get('*', (req, res) => {
    res.status(404).send('404 -> File not found. Go Back')
})

app.listen(port)