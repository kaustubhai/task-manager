const express = require('express')
const Router = new express.Router()
const Tasks = require('../models/tasks');

Router.post('/', async (req, res) => {
    const getTask = new Tasks(req.body)
    // task.save().then(() => {
    //     res.send(task)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
    try {
        const task = await getTask.save()
        if (!task)
            return res.status(400).send('No Task Founded')
        res.send(task)
    }
    catch (e) {
        res.status(500).send()
    }
})


Router.get('/tasks', async (req, res) => {
    // Tasks.find().then((task) => {
    //     res.send(task)
    // }).catch((err) => {
    //     res.status(404).send('No Task found')
    // })
    try {
        const tasks = await Tasks.find()
        if (!tasks)
            return res.send(404).send('No Task Found')
        res.send(tasks)
    }
    catch (e) {
        res.status(500).send()
    }
})

Router.get('/task/:id', async (req, res) => {
    const id = req.params.id;
    // Tasks.findById(id).then((tasks) => {
    //     res.send(tasks)
    // }).catch((err) => {
    //     res.status(404).send('No Task found')
    // })
    try {
        const task = await Tasks.findById(id)
        if (!task)
            return res.status(404).send('No Task Found')
        res.send(task)
    }
    catch (e) {
        res.status(500).send()
    }
})

Router.patch('/task/:id', async (req, res) => {
    const id = req.params.id;
    const inc = ['completed', 'desc']
    const chk = Object.keys(req.body)
    
    if (chk.every((c) => inc.includes(c))) {
        try {
            const updatedTask = await Tasks.findByIdAndUpdate(id, req.body, { new: true, runValidators: true, useFindAndModify: false })
            if (!updatedTask)
                return res.status(400).send('No User Found')
            res.send(updatedTask)
        }
        catch (e) {
            res.send(e)
        }
    }
    else {
        res.status(400).send('Invalid Request')
    }
    }
)

Router.delete('/task/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const del = await Tasks.findByIdAndDelete(id)
        if (!del)
            res.status(400).send('No User Found')
        res.send(del)
    }
    catch (e) {
        res.status(500).send()
    }
})

module.exports = Router