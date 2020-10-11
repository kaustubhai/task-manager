// const jwt = require('jsonwebtoken');
// const User = require('./models/user');

// const auth = async (req, res, next) => {
//     try {
//         const token = req.header('Authorization').replace('Bearer ', '')
//         const verified = jwt.verify(token, 'kaustubh229')
//         const user = await User.findOne({ '_id': verified.data, 'tokens.token': token })
//         if (!user)
//             throw new Error('Cant login right now')
//         req.token = token;
//         req.user = user;
//         next();
//     }
//     catch (e) {
//         res.status(400).send('Authentication Error')
//     }
// }

// module.exports = auth;

const jwt = require('jsonwebtoken')
const User = require('./models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'kaustubh229')
        const user = await User.findOne({ _id: decoded.data, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }

        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth