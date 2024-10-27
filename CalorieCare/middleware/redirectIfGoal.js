const User = require('../models/User'); // โมเดลที่มีข้อมูลผู้ใช้

module.exports = async (req, res, next) => {
    const userId = req.session.userId;

    if (userId) {
        try {
            const user = await User.findById(userId);
            if (user && user.target) {
                // ถ้าผู้ใช้มีการตั้งเป้าหมายแล้วให้ redirect ไปหน้า home
                return res.redirect('/currentTarget');
            }
        } catch (error) {
            console.error("Error finding user:", error);
            return res.redirect('/home'); // หรือคุณสามารถแสดงหน้า error แทน
        }
    }

    next(); // ถ้ายังไม่มีการตั้งเป้าหมายให้ไปต่อ
}
