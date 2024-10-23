const bcrypt = require('bcrypt');
const User = require('../models/User')

module.exports = (req, res) => {
    User.create(req.body).then((user) => {
        if (user) {
            req.session.userId = user._id;
            res.redirect('/home');
        }
        console.log("User registered successfully!")
    }).catch((error) => {
        // console.log(error.errors)
        if (error) {
            const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
            req.flash('validationErrors', validationErrors)
            req.flash('data', req.body)
            return res.redirect('/register')
        }
    })
}