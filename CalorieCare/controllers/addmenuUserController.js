const Foodlog = require('../models/Foodlog');
const User = require('../models/User');

exports.addMenu = async (req, res) => {
    try {
        const userId = req.session.userId; // ดึง userId จาก session
        const user = await User.findById(userId); // หาผู้ใช้จากฐานข้อมูล

        // ดึงรายการอาหารจาก body
        const { menuItems } = req.body;

        // ตรวจสอบว่า menuItems ถูกส่งมาหรือไม่
        if (!menuItems || !Array.isArray(menuItems) || menuItems.length === 0) {
            req.flash('error', "ไม่มีรายการอาหารที่ถูกส่งมา");
            return res.redirect('/home');
        }

        // คำนวณแคลอรี่รวม
        const totalCalories = menuItems.reduce((acc, item) => {
            const calories = item.price; // ใช้ price เป็น calories
            return acc + (isNaN(calories) ? 0 : calories);
        }, 0);

        console.log('Total Calories:', totalCalories); // ตรวจสอบค่าที่คำนวณได้

        // ตรวจสอบว่าแคลอรี่รวมเกินค่า TDEE หรือไม่
        if (totalCalories > user.tdee) {
            req.flash('error', "ไม่สามารถบันทึกอาหารได้เพราะเป็นการกินอาหารเกินค่า TDEE");
            return res.redirect('/home');
        }

        // บันทึกอาหารในฐานข้อมูล
        const foodLogEntries = menuItems.map(item => {
            const quantity = item.count; // ใช้ count เป็น quantity
            const name = item.name; // ใช้ name ตรงๆ

            if (isNaN(quantity) || quantity <= 0) {
                console.log(`Invalid quantity for item ${name}:`, quantity);
                return null; // คืนค่า null เพื่อกรองในขั้นตอนถัดไป
            }

            return {
                user: userId,
                date: new Date(),
                name: name,
                quantity: quantity, // ใช้ quantity ที่ดึงมา
                calories: item.price // ใช้ price เป็น calories
            };
        }).filter(Boolean);
        
        // ตรวจสอบว่ามีรายการอาหารที่ถูกต้องหรือไม่
        if (foodLogEntries.length === 0) {
            req.flash('error', "ไม่มีรายการอาหารที่ถูกต้องในการบันทึก");
            return res.redirect('/home');
        }

        await Foodlog.insertMany(foodLogEntries); // บันทึกข้อมูลลงใน Foodlog

        // อัปเดตค่า TDEE
        user.tdee = parseFloat((user.tdee - totalCalories).toFixed(2)); // ลดค่า TDEE และจำกัดทศนิยม
        await user.save(); // บันทึกการเปลี่ยนแปลงในฐานข้อมูล

        // ตรวจสอบค่า TDEE ใหม่
        console.log('Updated TDEE:', user.tdee); // ตรวจสอบค่า TDEE ใหม่

        req.flash('success', "บันทึกอาหารสำเร็จ");
        res.redirect('/home'); // Redirect ไปที่ /home เมื่อบันทึกสำเร็จ
    } catch (error) {
        console.error(error);
        req.flash('error', "เกิดข้อผิดพลาดในการบันทึกอาหาร");
        res.redirect('/home'); // Redirect ไปที่ /home เมื่อเกิดข้อผิดพลาด
    }
};
