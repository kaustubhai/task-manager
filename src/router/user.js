const express = require('express')
const Router = new express.Router()
const User = require('../models/user');

Router.post('/user', async (req, res) => {
    const user = new User(req.body);
    // user.save().then(() => {
    //     res.send(user)
    // }).catch((err) => {
    //     res.status(400).send(err)
    // })
    try {
        const account = await user.save()
        if (!account)
            return res.status(400).send('No request Found')
        res.status(201).send(account)
    }
    catch (e) {
        res.status(500).send()
    }
})

Router.get('/users', async (req, res) => {
    // User.find({}).then((user) => {
    //     res.send(user)
    // }).catch((err) => {
    //     res.status(404).send(err)
    // })
    try {
        const users = await User.find({})
        if (!users)
            return res.status(404).send('No User Found')
        res.send(users)
    }
    catch (e) {
        res.status(500).send()
    }
})

Router.get('/user/:id', async (req, res) => {
    const _id = req.params.id
    // User.findById(_id).then((user) => {
    //     res.send(user)
    // }).catch((err) => {
    //     res.status(404).send('User not found');
    // })
    try{
        const user = await User.findById(_id)
        if (!user)
            return res.status(404).send('No User Found')
        res.send(user)
    }
    catch (e) {
        res.status(500).send()
    }
})

Router.patch('/user/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, req.body, {new: true, runValidators: true, useFindAndModify: false})
        if (!updatedUser)
            return res.status(404).send('No User Found')
        res.send(updatedUser)
    }
    catch (e) {
        res.send(e)
    }
})

Router.delete('/user/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const del = await User.findByIdAndDelete(id)
        if (!del)
            res.status(400).send('No User Found')
        res.send(del)
    }
    catch (e) {
        res.status(500).send()
    }
})


module.exports = Router