const express = require('express'); 
const router = express.Router();
const User = require('../models/User'); // โมเดลที่มีข้อมูลผู้ใช้

router.post('/user/edit', (req, res) => {
    const { weight, height, age, gender } = req.body;

    // ทำการอัปเดตข้อมูลในฐานข้อมูลตามข้อมูลที่ได้รับ
    User.findByIdAndUpdate(req.session.userId, { weight, height, age, gender }, { new: true })
        .then(() => {
            req.flash('success', 'อัปเดตข้อมูลเรียบร้อยแล้ว!');
            return res.redirect('/profile'); // เปลี่ยนเส้นทางไปที่หน้าโปรไฟล์
        })
        .catch((error) => {
            req.flash('error', 'เกิดข้อผิดพลาดในการอัปเดตข้อมูล!');
            return res.redirect('/edit'); // กลับไปยังหน้าฟอร์มแก้ไข
        });
});

module.exports = router;
