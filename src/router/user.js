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
        res.status(201).send({account: account.protectedData(account), token})
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
        res.status(401).send('Email Password incorrect');
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
    res.send({user: req.user.protectedData(req.user)})
})

//update user information
Router.patch('/user/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    try {
        updates.forEach(update => {
            req.user[update] = req.body[update]
        });
            req.user.save()
            res.send({updatedUser: req.user.protectedData(req.user)})
    }
    catch (error) {
        res.send(error)
    }
})

//delete user information
Router.delete('/user/me', auth, async (req, res) => {
    try {
        res.send({ user: req.user.protectedData(req.user) })
        req.user.remove()
    }
    catch (e) {
        res.status(500).send()
    }
})
module.exports = Router