const express = require('express');
const app = express();
const ejs = require('ejs');
const mongoose = require('mongoose');
const expressSession = require('express-session');
const flash = require('connect-flash');

// MongoDB Connection
mongoose.connect('mongodb+srv://test:1234@cluster0.7bf6f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

// Controllers
const indexController = require('./controllers/indexController');
const loginController = require('./controllers/loginController');
const registerController = require('./controllers/registerController');
const storeUserController = require('./controllers/storeUserController');
const loginUserController = require('./controllers/loginUserController');
const logoutController = require('./controllers/logoutController');
const homeController = require('./controllers/homeController');
const profileController = require('./controllers/profileController');
const editUserController = require('./controllers/editUserController');
const excerciseController = require('./controllers/excerciseController');
const historyController = require('./controllers/historyController');
const targetController = require('./controllers/targetController');
const targetUserController = require('./controllers/targetUserController');
const editTargetController = require('./controllers/editTargetController');
const currentTargetController = require('./controllers/currentTargetController');
const calculatorController = require('./controllers/calculatorController');
const addmenuUserController = require('./controllers/addmenuUserController');
const forgetPasswordController = require('./controllers/forgetPasswordController')
const forgetController = require('./controllers/forgetController')

// Middleware
const redirectIfAuth = require('./middleware/redirectIfAuth');
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfGoal = require('./middleware/redirectIfGoal');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(expressSession({
    secret: "node secret",
    resave: false,
    saveUninitialized: false
}));

// Store logged-in user ID in res.locals
app.use("*", (req, res, next) => {
    res.locals.loggedIn = req.session.userId; // แทนที่ global
    next();
});

// Flash messages middleware
app.use((req, res, next) => {
    res.locals.messages = {
        error: req.flash('error'),
    };
    next();
});

// View engine setup
app.set('view engine', 'ejs');

// Define routes
app.get('/', indexController);
app.get('/home', authMiddleware, homeController);
app.get('/login', redirectIfAuth, loginController);
app.get('/register', redirectIfAuth, registerController);
app.post('/user/register', redirectIfAuth, storeUserController);
app.post('/user/login', redirectIfAuth, loginUserController);
app.get('/logout', logoutController);
app.get('/profile', profileController);
app.post('/user/edit', editUserController);
app.get('/excercise', authMiddleware, excerciseController);
app.get('/history', authMiddleware, historyController);
app.get('/target', redirectIfGoal, targetController);
app.post('/user/target', authMiddleware, targetUserController);
app.post('/user/edittarget', editTargetController);
app.get('/currentTarget', authMiddleware, currentTargetController);
app.get('/calculator', authMiddleware, calculatorController);
app.post('/user/addmenu', authMiddleware, addmenuUserController.addMenu);
app.get('/forgetPassword', forgetPasswordController)
app.post('/user/forgetPassword', forgetController)

app.get('/home', authMiddleware, (req, res) => {
    res.render('home', { messages: req.flash() });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!'); // ส่งข้อความข้อผิดพลาด
});

// Start server
app.listen(4000, () => {
    console.log("App listening on port 4000");
});
