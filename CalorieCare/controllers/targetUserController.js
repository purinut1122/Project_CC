const express = require('express'); 
const router = express.Router();
const User = require('../models/User'); // โมเดลที่มีข้อมูลผู้ใช้

router.post('/user/target', (req, res) => {
    const userId = req.session.userId; // ใช้ userId จาก session

    const target = req.body.target; // รับข้อมูลเป้าหมายจากฟอร์ม
    const weight_target = parseFloat(req.body.weight_target); // รับน้ำหนักเป้าหมาย
    const activity = req.body.activity; // รับความถี่ในการออกกำลังกาย
    const weight_loss_rate = req.body.weight_loss_rate; // รับอัตราการลดน้ำหนัก
    const weight_gain_rate = req.body.weight_gain_rate;

    User.findById(userId)
        .then((user) => {
            if (!user) {
                req.flash('error', 'ไม่พบผู้ใช้');
                return res.redirect('/target'); // หากไม่พบผู้ใช้
            }

            // ตรวจสอบน้ำหนักเป้าหมาย
            if (weight_target <= 0) {
                req.flash('error', 'น้ำหนักเป้าหมายต้องมากกว่า 0');
                return res.redirect('/target');
            }

            // คำนวณ BMR
            const { weight, height, age, gender } = user; // รับข้อมูลน้ำหนัก, ส่วนสูง, อายุ, เพศจากผู้ใช้
            let BMR;

            if (gender === 'male') {
                BMR = 10 * weight + 6.25 * height - 5 * age + 5;
            } else {
                BMR = 10 * weight + 6.25 * height - 5 * age - 161;
            }

            // กำหนด Activity Factor
            let activityFactor;
            switch (activity) {
                case 'never':
                    activityFactor = 1.2;
                    break;
                case 'sometimes':
                    activityFactor = 1.375;
                    break;
                case 'often':
                    activityFactor = 1.55;
                    break;
                case 'usually':
                    activityFactor = 1.725;
                    break;
                case 'always':
                    activityFactor = 1.9;
                    break;
                default:
                    activityFactor = 1.2; // ค่าเริ่มต้น
            }

            // คำนวณ TDEE
            const TDEE = BMR * activityFactor;
            let adjustedTDEE;

            // คำนวณการขาดแคลอรีหรือเกินแคลอรีตามเป้าหมาย
            if (target === "LoseWeight") {
                let dailyCaloricDeficit;
                switch (weight_loss_rate) {
                    case '0.25':
                        dailyCaloricDeficit = 250; // 0.25 kg/week
                        break;
                    case '0.5':
                        dailyCaloricDeficit = 500; // 0.5 kg/week
                        break;
                    case '0.75':
                        dailyCaloricDeficit = 750; // 0.75 kg/week
                        break;
                    case '1':
                        dailyCaloricDeficit = 1000; // 1 kg/week
                        break;
                    default:
                        dailyCaloricDeficit = 0; // ไม่มีการลดน้ำหนัก
                }
                adjustedTDEE = TDEE - dailyCaloricDeficit;
            } else if (target === "MaintainWeight") {
                adjustedTDEE = TDEE; // รักษาน้ำหนัก
            } else if (target === "GainWeight") {
                let dailyCaloricSurplus;
                switch (weight_gain_rate) {
                    case '0.25':
                        dailyCaloricSurplus = 250; // 0.25 kg/week
                        break;
                    case '0.5':
                        dailyCaloricSurplus = 500; // 0.5 kg/week
                        break;
                    case '0.75':
                        dailyCaloricSurplus = 750; // 0.75 kg/week
                        break;
                    case '1':
                        dailyCaloricSurplus = 1000; // 1 kg/week
                        break;
                    default:
                        dailyCaloricSurplus = 500; // ค่าเริ่มต้น
                }
                adjustedTDEE = TDEE + dailyCaloricSurplus;
            }

            // คำนวณ BMI
            const heightInMeters = height / 100; // แปลงส่วนสูงเป็นเมตร
            const BMI = weight / (heightInMeters * heightInMeters);

            // ปรับค่าให้เป็นทศนิยม 2 ตำแหน่ง
            const formattedBMR = parseFloat(BMR.toFixed(2));
            const formattedTDEE = parseFloat(adjustedTDEE.toFixed(2));
            const formattedBMI = parseFloat(BMI.toFixed(2));

            // เพิ่มการล็อกเพื่อดูค่าที่คำนวณได้
            console.log("BMR:", formattedBMR);
            console.log("TDEE:", formattedTDEE);
            console.log("BMI:", formattedBMI);

            // อัปเดตข้อมูลในฐานข้อมูล
            User.findByIdAndUpdate(userId, { 
                target, 
                weight_target, 
                activity, 
                weight_loss_rate,
                weight_gain_rate,
                bmr: formattedBMR, 
                tdee: formattedTDEE, // อัปเดต TDEE ที่ปรับแล้ว
                bmi: formattedBMI // อัปเดตค่า BMI
            }, { new: true, runValidators: true })
            .then(() => {
                console.log("Target has been updated!");
                req.flash('success', 'อัปเดตข้อมูลเรียบร้อยแล้ว!');
                return res.redirect('/currentTarget'); // เปลี่ยนเส้นทางไปที่หน้าโปรไฟล์
            })
            .catch((error) => {
                req.flash('error', 'เกิดข้อผิดพลาดในการอัปเดตผู้ใช้!');
                return res.redirect('/target');
            });
        })
        .catch((error) => {
            req.flash('error', 'เกิดข้อผิดพลาดในการค้นหาผู้ใช้!');
            return res.redirect('/target');
        });
});

module.exports = router;
