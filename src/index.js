const express = require('express');
require('./database/mongoose')
const User = require('./models/user');
const Tasks = require('./models/tasks');

const app = express();

const port = process.env.port || 3000;

app.use(express.json())

app.get('', (req, res) => {
    res.send('Hello')
})

app.post('/login', (req, res) => {
    const user = new User(req.body);
    user.save().then(() => {
        res.send(user)
    }).catch((err) => {
        res.status(400).send(err)
    })
})

app.post('/', (req, res) => {
    const task = new Tasks(req.body)
    task.save().then(() => {
        res.send(task)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

app.listen(port)