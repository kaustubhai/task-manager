const express = require('express');
const Router = new express.Router()
const User = require('../models/user');
const auth = require('../auth')

//create user
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
            return res.status(400).send('Invalid Request')
        const token = await user.generateAuthToken()
        res.status(201).send({account, token})
    }
    catch (e) {
        res.status(500).send(e)
    }
})


//Login user
Router.post('/users/login', async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user: user.protectedData(user), token })
    } catch (e) {
        res.status(401).send();
    }
})

//Logout user
Router.post('/user/logout', auth, async (req, res) => {
        req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token)
        await req.user.save()
        
        res.send('User Logged Out')
})

//Logout the user from all the windows
Router.get('/user/logout-all', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send('User logged out from all the windows')
    }
    catch (e) {
        res.status(500).send()
    }
})

//find the user profile
Router.get('/user/me', auth, async (req, res) => {
    // User.find({}).then((user) => {
    //     res.send(user)
    // }).catch((err) => {
    //     res.status(404).send(err)
    // })
    res.send(req.user)
})

//find individual user
Router.get('/user/:id', auth, async (req, res) => {
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

//update user information
Router.patch('/user/:id', auth, async (req, res) => {
    const id = req.params.id;
    const updates = Object.keys(req.body)
    const updatedUser = await User.findById(id)
    try {
        if (!updatedUser)
            res.status(404).send('No User Found')
        else {updates.forEach(update => {
            updatedUser[update] = req.body[update]
        });
            updatedUser.save()
            res.send(updatedUser)
        } 
    }
    catch (error) {
        res.send(error)
    }
})

//delete user information
Router.delete('/user/:id', auth, async (req, res) => {
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