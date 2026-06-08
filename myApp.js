const express = require('express');
const path = require('node:path');
const sequelize = require('sequelize');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const db = require('./models');

// เชื่อม route user กับ controller user
const userController = require('./Controllers/userController');
const { register, login } = userController;
const userAuth = require('./Middlewares/userAuth');

// เชื่อม route product กับ controller product
const productRoute = require('./Middlewares/productRoute');

const MyApp = express();
const port = 5000;

// การตั้งค่า views Template
MyApp.engine('pug', require('pug').__express);
MyApp.set('view engine', 'pug');
MyApp.set('views', path.join(__dirname, 'views'));

// Middleware
MyApp.use(express.json());// คือการใช้ middleware ของ Express เพื่อแปลงข้อมูลที่ส่งมาจาก client ในรูปแบบ JSON ให้เป็น JavaScript object ที่สามารถใช้งานได้ใน route handler ต่าง ๆ ของแอปพลิเคชัน
MyApp.use(express.urlencoded({ extended: false }));// คือการใช้ middleware ของ Express เพื่อแปลงข้อมูลที่ส่งมาจาก client ในรูปแบบ URL-encoded ให้เป็น JavaScript object ที่สามารถใช้งานได้ใน route handler ต่าง ๆ ของแอปพลิเคชัน
MyApp.use(cookieParser());// คือการใช้ middleware ของ Express เพื่อแปลงข้อมูลที่ส่งมาจาก client ในรูปแบบ cookie ให้เป็น JavaScript object ที่สามารถใช้งานได้ใน route handler ต่าง ๆ ของแอปพลิเคชัน

// ล้างข้อมูลทุกครั้งที่รัน Server
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("db has been re sync");
// }); 

// ดักจับทุกครั้งที่มี request เข้ามา
MyApp.use((req, res, next) => {
    console.log(`${req.method} request made to ${req.url}`);
    next();
});

// App หน้าเว็บ
MyApp.get('/', (req, res) => {
    res.render('template', {
        title: 'API Project GK',
        message: 'Welcome to my API Project!'
    });
});

// สร้าง API Register & Login
// คือการเชื่อม route ที่ชื่อว่า register กับ controller ที่ชื่อว่า register และส่งผ่าน middleware ที่ชื่อว่า saveUser
MyApp.post('/register', userAuth.saveUser, register);
MyApp.post('/login', login);

//เชื่อม RouteProduct
MyApp.use('/api/product', productRoute);

// Start server
MyApp.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});