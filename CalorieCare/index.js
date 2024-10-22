const express = require('express')
const app = express()
const ejs = require('ejs')
const mongoose = require('mongoose')
const expressSession = require('express-session')
const flash = require('connect-flash')

// MongoDB Connection
mongoose.connect('mongodb+srv://test:1234@cluster0.7bf6f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    //useUnifiedTopology: true,
    // useNewUrlParser: true // ไม่ต้องใช้ตัวเลือกนี้อีกต่อไป
}).then(() => {
    console.log('MongoDB connected successfully');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

global.loggedIn = null

// Controllers
const indexController = require('./controllers/indexController')
const loginController = require('./controllers/loginController')
const registerController = require('./controllers/registerController')
const storeUserController = require('./controllers/storeUserController')
const loginUserController = require('./controllers/loginUserController')
const logoutController = require('./controllers/logoutController')
const homeController = require('./controllers/homeController')
const profileController = require('./controllers/profileController')
const excerciseController = require('./controllers/excerciseController')
const historyController = require('./controllers/historyController')
const targetController = require('./controllers/targetController')
const calculatorController = require('./controllers/calculatorController')

// Middleware
const redirectIfAuth = require('./middleware/redirectIfAuth')
const authMiddleware = require('./middleware/authMiddleware')

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())
app.use(flash())
app.use(expressSession({
    secret: "node secret"
}))
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId
    next()
})
app.set('view engine', 'ejs')

app.get('/', indexController)
app.get('/home', authMiddleware, homeController)
app.get('/login', redirectIfAuth, loginController)
app.get('/register', redirectIfAuth, registerController)
app.post('/user/register', redirectIfAuth, storeUserController)
app.post('/user/login', redirectIfAuth, loginUserController)
app.get('/logout', logoutController)
app.get('/profile', profileController)
app.get('/excercise', authMiddleware, excerciseController)
app.get('/history', authMiddleware, historyController)
app.get('/target', authMiddleware, targetController)
app.get('/calculator', authMiddleware, calculatorController)

app.listen(4000, () => {
    console.log("App listening on port 4000")
})