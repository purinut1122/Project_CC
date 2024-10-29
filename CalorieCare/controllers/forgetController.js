const User = require('../models/User');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { toUnicode } = require('punycode');

module.exports = async (req, res) => {
    const { email } = req.body;

    try {
        // ค้นหาผู้ใช้จากอีเมลที่กรอกมา
        let user = await User.findOne({ email });
        if (!user) {
            req.flash('error', 'ชื่อผู้ใช้หรืออีเมลไม่ถูกต้อง โปรดลองอีกครั้ง!');
            return res.redirect('/');
        }

        // สร้างโทเค็นสำหรับรีเซ็ตรหัสผ่าน
        const token = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 ชั่วโมง
        await user.save();

        // ตั้งค่า SMTP ด้วย nodemailer
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: '', // เปลี่ยนเป็นอีเมลของคุณ
                pass: ''   // รหัสผ่านหรือ App password
            }
        });
        

        // สร้างเนื้อหาอีเมล
        let mailOptions = {
            to: user.email,
            from: 'noreply@yourdomain.com',
            subject: 'Password Reset Request',
            text: `คุณได้รับอีเมลนี้เนื่องจากคุณได้ร้องขอการรีเซ็ตรหัสผ่านสำหรับบัญชีของคุณ\n\n
                   กรุณาคลิกลิงก์ด้านล่าง หรือนำลิงก์นี้ไปวางในเบราว์เซอร์เพื่อดำเนินการภายใน 1 ชั่วโมงหลังจากได้รับอีเมลนี้:\n\n
                   http://yourdomain.com/reset-password/${token}\n\n
                   หากคุณไม่ได้ร้องขอการรีเซ็ตรหัสผ่านนี้ กรุณาเพิกเฉยต่ออีเมลนี้และรหัสผ่านของคุณจะไม่ถูกเปลี่ยนแปลง.\n`
        };

        // ส่งอีเมล
        transporter.sendMail(mailOptions, (err, response) => {
            if (err) {
                console.error('เกิดข้อผิดพลาดขณะส่งอีเมล: ', err);
                req.flash('error', 'ไม่สามารถส่งอีเมลได้ กรุณาลองอีกครั้ง.');
                return res.redirect('/');
            } else {
                req.flash('success', 'ส่งอีเมลรีเซ็ตรหัสผ่านเรียบร้อยแล้ว กรุณาตรวจสอบกล่องอีเมลของคุณ.');
                return res.redirect('/');
            }
        });

    } catch (error) {
        console.error('Error in forgetPasswordController: ', error);
        req.flash('error', 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์ กรุณาลองอีกครั้ง.');
        return res.redirect('/');
    }
};
