const express = require('express');
const { ObjectId } = require('mongodb');
const auth = require('../auth');
const Router = new express.Router()
const Tasks = require('../models/tasks')

//To Add Task in the Database
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

//To get all the tasks
Router.get('/tasks', auth, async (req, res) => {

    const check = {}

    if (req.query.completed) {
        var query = req.query.completed === 'true' ? true : false;
        check.completed= query
    }
    try {
        await req.user.populate({
            path: 'tasks',
            match: check,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt((req.query.page-1)*3)
            }
        }).execPopulate();
        if (!req.user.tasks || req.user.tasks.length === 0)
            return res.status(404).send('No Task Found')
        res.send(req.user.tasks)
    }
    catch (e) {
        res.status(500).send()
    }
})

//Get Specific task details
Router.get('/task/:id', auth, async (req, res) => {
    const id = req.params.id;
        const task = await Tasks.find({owner: req.user._id, _id: ObjectId(id)})
        if (!task || task.length === 0)
            res.status(404).send('No Task Founded')
        else {
            res.send(task)
        }

})

//Update specific task details
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

//Delete Specific task
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