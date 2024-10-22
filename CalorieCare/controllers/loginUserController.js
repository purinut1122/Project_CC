const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = (req, res) => {
    const { username, password } = req.body;

    User.findOne({ username: username }).then((user) => {
        console.log(user);

        if (user) {
            // เปรียบเทียบรหัสผ่าน
            bcrypt.compare(password, user.password).then((match) => {
                if (match) {
                    req.session.userId = user._id;
                    res.redirect('/home');
                } else {
                    // ถ้ารหัสผ่านไม่ตรงกัน ให้เก็บข้อผิดพลาดและรีไดเร็กต์ไปหน้าแรก
                    req.flash('error', 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้องโปรดลองอีกครั้ง!');
                    res.redirect('/');
                }
            }).catch(err => {
                // จัดการข้อผิดพลาดที่เกิดจาก bcrypt
                req.flash('error', 'เกิดข้อผิดพลาดในการตรวจสอบรหัสผ่าน!');
                res.redirect('/');
            });
        } else {
            // ถ้าไม่พบผู้ใช้
            req.flash('error', 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้องโปรดลองอีกครั้ง!');
            res.redirect('/');
        }
    }).catch(err => {
        // จัดการข้อผิดพลาดที่เกิดจากการค้นหาในฐานข้อมูล
        req.flash('error', 'เกิดข้อผิดพลาดในการค้นหาผู้ใช้!');
        res.redirect('/');
    });
};
