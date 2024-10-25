const User = require("../models/User")

module.exports = (req, res) => {
    let username = ""
    let password = ""
    let email = ""
    let gender = ""
    let weight = ""
    let height = ""
    let age = ""
    let activity = ""
    let data = req.flash('data')[0]
    let validationError = ""

    // ตรวจสอบข้อมูลก่อนเรนเดอร์
    if (typeof data !== "undefined") {
        username = data.username
        password = data.password
        email = data.email
        gender = data.gender
        weight = data.weight
        height = data.height
        age = data.age
        activity = data.activity

        // ตรวจสอบข้อมูลที่จำเป็น
        if (!username || !password || !email || !gender || !weight || !height || !age || !activity) {
            validationError = "กรุณากรอกข้อมูลให้ครบทุกช่อง"
        }
    }

    res.render('register', {
        errors: validationError, // ส่งข้อความเตือนเพียงหนึ่งประโยค
        username: username,
        password: password,
        email: email,
        weight: weight,
        height: height,
        age: age,
        gender: gender,
        activity: activity
    })
}
