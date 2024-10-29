const Foodlog = require('../models/Foodlog');

module.exports = async (req, res) => {
    try {
        const userId = req.session.userId; // ดึง userId จาก session
        const foodLogs = await Foodlog.find({ user: userId }).sort({ date: -1 }); // ดึงข้อมูลจากฐานข้อมูลตาม userId

        res.render('history', { loggedIn: req.session.userId, foodLogs }); // ส่งข้อมูลไปยัง view
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};
