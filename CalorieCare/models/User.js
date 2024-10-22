const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

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
    }
})

UserSchema.pre('save', function(next) {
    const user = this

    bcrypt.hash(user.password, 10).then(hash => {
        user.password = hash
        next()
    }).catch(error => {
        console.error(error)
    })
})

const User = mongoose.model('User', UserSchema)
module.exports = User