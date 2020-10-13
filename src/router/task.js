const express = require('express');
const { ObjectId } = require('mongodb');
const auth = require('../auth');
const Router = new express.Router()
const Tasks = require('../models/tasks')

Router.post('/', auth, async (req, res) => {
    const getTask = new Tasks({
        ...req.body,
        owner: req.user._id
    })
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


Router.get('/tasks', auth, async (req, res) => {
    // Tasks.find().then((task) => {
    //     res.send(task)
    // }).catch((err) => {
    //     res.status(404).send('No Task found')
    // })
    try {
        const tasks = await Tasks.find({owner: req.user._id})
        if (!tasks || tasks.length === 0)
            return res.status(404).send('No Task Found')
        res.send(tasks)
    }
    catch (e) {
        res.status(500).send()
    }
})

Router.get('/task/:id', auth, async (req, res) => {
    const id = req.params.id;
    // Tasks.findById(id).then((tasks) => {
    //     res.send(tasks)
    // }).catch((err) => {
    //     res.status(404).send('No Task found')
    // })
        const task = await Tasks.find({owner: req.user._id, _id: ObjectId(id)})
        if (!task || task.length === 0)
            res.status(404).send('No Task Founded')
        else {
            res.send(task)
        }

})

Router.patch('/task/:id', auth, async (req, res) => {
    const id = req.params.id;
    const inc = ['completed', 'desc']
    const chk = Object.keys(req.body)
    
    if (chk.every((c) => inc.includes(c))) {
        try{
            const updatedTask = await Tasks.findOne({ _id: ObjectId(id), owner: req.user._id });
            if (!updatedTask)
                return res.status(400).send('No Task Found')
            
            chk.forEach(value => updatedTask[value] = req.body[value])
            await updatedTask.save()
            res.send(updatedTask)
        }
        catch (e) {
            res.status(500).send(e)
        }
    }
    else {
        res.status(400).send('Invalid Request')
    }
    }
)

Router.delete('/task/:id', auth, async (req, res) => {
    const id = req.params.id;
    try {
        const del = await Tasks.findOneAndDelete({_id: ObjectId(id), owner: req.user._id})
        if (!del)
            return res.status(400).send('No Task Found')
        res.send(del)
    }
    catch (e) {
        res.status(500).send()
    }
})

module.exports = Router