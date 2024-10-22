const User = require("../models/User")

module.exports = (req, res) => {

    let username = ""
    let password = ""
    let email = ""
    let weight = ""
    let height = ""
    let age = ""
    let data = req.flash('data')[0]

    if (typeof data != "undefined") {
        username = data.username
        password = data.password
        email = data.email
        weight = data.weight
        height = data.height
        age = data.age
    }

    res.render('register', {
        errors: req.flash('validationErrors'),
        username: username,
        password: password,
        email: email,
        weight: weight,
        height: height,
        age: age
    })
}