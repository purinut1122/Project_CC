const User = require('../models/User');
const Foodlog = require('../models/Foodlog'); // นำเข้าโมเดล Foodlog

module.exports = async (req, res) => {
    try {
        const userId = req.session.userId;
        const UserData = await User.findById(userId); // หาผู้ใช้จากฐานข้อมูล
        const foodLogs = await Foodlog.find({ user: userId }); // ดึงรายการอาหารที่บันทึกสำหรับผู้ใช้

        // ตรวจสอบว่าแคลอรี่รวมเกินค่า TDEE หรือไม่
        let totalCalories = 0;
        foodLogs.forEach(log => {
            totalCalories += log.calories;
        });

        if (totalCalories > UserData.tdee) {
            req.flash('error', "ไม่สามารถบันทึกอาหารได้เพราะเป็นการกินอาหารเกินค่า TDEE");
            return res.redirect('/home');
        }

        res.render('home', {
            UserData, // ส่งข้อมูลผู้ใช้ในชื่อ UserData
            foodLogs,
            messages: req.flash() // ส่งข้อความ error ไปด้วย
        });
    } catch (error) {
        console.error(error);
        req.flash('error', 'เกิดข้อผิดพลาดในการโหลดข้อมูล');
        res.redirect('/login'); // Redirect ไปที่หน้าเข้าสู่ระบบถ้ามีปัญหา
    }
};
