const express = require('express');  
const router = express.Router();
const User = require('../models/User'); // โมเดลที่มีข้อมูลผู้ใช้

// ฟังก์ชันคำนวณ BMI
const calculateBMI = (weight, height) => {
    return weight / ((height / 100) ** 2);
};

// ฟังก์ชันคำนวณ BMR
const calculateBMR = (weight, height, age, gender) => {
    if (gender === 'male') {
        return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
        return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
};

// ฟังก์ชันคำนวณ TDEE
const calculateTDEE = (bmr, activityLevel) => {
    const activityMultipliers = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        veryActive: 1.9,
    };
    return bmr * (activityMultipliers[activityLevel] || 1.2); // ค่าเริ่มต้นเป็น sedentary
};

router.post('/user/edit', (req, res) => {
    const { weight, height, age, gender, activityLevel } = req.body;

    // คำนวณ BMI, BMR และ TDEE
    const bmi = calculateBMI(weight, height).toFixed(2);
    const bmr = calculateBMR(weight, height, age, gender).toFixed(2);
    const tdee = calculateTDEE(bmr, activityLevel).toFixed(2);

    // อัปเดตข้อมูลในฐานข้อมูล
    User.findByIdAndUpdate(req.session.userId, { 
        weight, 
        height, 
        age, 
        gender, 
        bmi, 
        bmr, 
        tdee 
    }, { new: true })
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
