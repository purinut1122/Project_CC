const express = require('express'); 
const router = express.Router();
const User = require('../models/User'); // โมเดลที่มีข้อมูลผู้ใช้

// Route สำหรับแก้ไข target
router.post('/user/edittarget', (req, res) => {
    const userId = req.session.userId; // ใช้ userId จาก session

    User.findById(userId)
        .then((user) => {
            if (!user) {
                req.flash('error', 'ไม่พบผู้ใช้');
                return res.redirect('/target'); // หากไม่พบผู้ใช้
            }

            // ตั้งค่า target, weight_target, weight_loss_rate, weight_gain_rate เป็น null
            user.target = null;
            user.weight_target = null;
            user.weight_loss_rate = null;
            user.weight_gain_rate = null;

            // บันทึกการเปลี่ยนแปลง
            user.save()
                .then(() => {
                    req.flash('success', 'ตั้งค่าถูกรีเซ็ตแล้ว');
                    return res.redirect('/target'); // เปลี่ยนเส้นทางไปที่หน้า target
                })
                .catch((error) => {
                    console.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล:", error);
                    req.flash('error', 'เกิดข้อผิดพลาดในการบันทึกข้อมูล');
                    return res.redirect('/target');
                });
        })
        .catch((error) => {
            console.error("เกิดข้อผิดพลาดในการค้นหาผู้ใช้:", error);
            req.flash('error', 'เกิดข้อผิดพลาดในการค้นหาผู้ใช้');
            return res.redirect('/target');
        });
});

module.exports = router;
