const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const redirectIfAuth = require('../middleware/redirectIfAuth')

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'กรุณาระบุชื่อผู้ใช้']
    },
    password: {
        type: String,
        required: [true, 'กรุณาระบุรหัสผ่าน']
    },
    email: {
        type: String,
        required: [true, 'กรุณาระบุอีเมล']
    },
    gender: {
        type: String,
        enum: ['male', 'female'], // ใช้ enum เพื่อจำกัดค่า
        required: [true, 'กรุณาระบุเพศ']
    },
    weight: {
        type: Number,
        required: [true, 'กรุณาระน้ำหนัก']
    },
    height: {
        type: Number,
        required: [true, 'กรุณาระบุส่วนสูง']
    },
    age: {
        type: Number,
        required: [true, 'กรุณาระบุอายุ']
    },
    activity: {
        type: String,
        enum: ['Sedentary', 'Light', 'Moderate', 'Active' ,'VeryActive'],
        required: [true, 'กรุณาเลือกระดับการออกกำลังกาย']
    },
    bmi: {
        type: Number,
        default: null // ฟิลด์ BMI
    },
    bmr: {
        type: Number,
        default: null // ฟิลด์ BMR
    },
    tdee: {
        type: Number,
        default: null // ฟิลด์ TDEE
    },
    target: {
        type: String,
        enum: ['GainWeight', 'LoseWeight', 'MaintainWeight'],
        default: null
    },
    weight_target: {
        type: Number,
        default: null // เป้าหมายของน้ำหนัก
    },
    weight_loss_rate: {
        type: Number,
        default: null // อัตราการลดน้ำหนัก
    },
    weight_gain_rate: {
        type: Number,
        default: null // อัตราการเพิ่มน้ำหนัก
    }
})

// ฟังก์ชันคำนวณค่า BMI, BMR, TDEE
const calculateMetrics = (user) => {
    // คำนวณ BMI
    const heightInMeters = user.height / 100; // แปลงส่วนสูงจากเซนติเมตรเป็นเมตร
    user.bmi = parseFloat((user.weight / (heightInMeters * heightInMeters)).toFixed(2)); // ปัดเศษทศนิยม 2 ตำแหน่ง

    // คำนวณ BMR
    if (user.gender === 'male') {
        user.bmr = parseFloat((10 * user.weight + 6.25 * user.height - 5 * user.age + 5).toFixed(2)); // ปัดเศษทศนิยม 2 ตำแหน่ง
    } else {
        user.bmr = parseFloat((10 * user.weight + 6.25 * user.height - 5 * user.age - 161).toFixed(2)); // ปัดเศษทศนิยม 2 ตำแหน่ง
    }

    // คำนวณ TDEE
    let activityMultiplier;
    switch (user.activity) {
        case 'Sedentary':
            activityMultiplier = 1.2;
            break;
        case 'Light':
            activityMultiplier = 1.375;
            break;
        case 'Moderate':
            activityMultiplier = 1.55;
            break;
        case 'Active':
            activityMultiplier = 1.725;
            break;
        case 'VeryActive':
            activityMultiplier = 1.9;
            break;
        default:
            activityMultiplier = 1.2; // ค่าปกติ
    }

    user.tdee = parseFloat((user.bmr * activityMultiplier).toFixed(2)); // ปัดเศษทศนิยม 2 ตำแหน่ง
};

UserSchema.pre('save', function(next) {
    const user = this

    bcrypt.hash(user.password, 10).then(hash => {
        user.password = hash
        calculateMetrics(user)
        next()
    }).catch(error => {
        console.error(error)
    })
})

const User = mongoose.model('User', UserSchema)
module.exports = User