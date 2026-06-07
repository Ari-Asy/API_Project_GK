const express = require('express');
const path = require('node:path');
const sequelize = require('sequelize');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const db = require('./models');

const userController = require('./Controllers/userController');
const { register, login } = userController;
const userAuth = require('./Middlewares/userAuth');

const productRoute = require('./Middlewares/productRoute');

const MyApp = express();
const port = 5000;

// Setting views Template
MyApp.engine('pug', require('pug').__express);
MyApp.set('view engine', 'pug');
MyApp.set('views', path.join(__dirname, 'views'));

//middleware
MyApp.use(express.json());// คือการใช้ middleware ของ Express เพื่อแปลงข้อมูลที่ส่งมาจาก client ในรูปแบบ JSON ให้เป็น JavaScript object ที่สามารถใช้งานได้ใน route handler ต่าง ๆ ของแอปพลิเคชัน
MyApp.use(express.urlencoded({ extended:false }));
MyApp.use(cookieParser());

//จะล้างและสร้าง Database ใหม่ทุกครั้งที่ start server
db.sequelize.sync({ force: true }).then(() => {
    console.log("db has been re sync");
}); 

// App
MyApp.get('/', (req, res) => {
    res.render('template', {
        title: 'API Project GK',
        message: 'Welcome to my API Project!'
    });
});

//สร้าง API Register & Login
MyApp.post('/register', userAuth.saveUser, register);
MyApp.post('/login', login);

//เชื่อม RouteProduct
MyApp.use('/api/product', productRoute);

//listening to server connection
MyApp.use((req, res, next) => {
    console.log(`${req.method} request made to ${req.url}`);
    next();
});

MyApp.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});