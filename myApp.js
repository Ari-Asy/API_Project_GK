const express = require('express');
const path = require('node:path');
const bcrypt = require('bcrypt');
const { error } = require('node:console');
const { hash } = require('node:crypto');
const { Result } = require('pg');

const MyApp = express();
const port = 5000;

MyApp.use(express.json());// คือการใช้ middleware ของ Express เพื่อแปลงข้อมูลที่ส่งมาจาก client ในรูปแบบ JSON ให้เป็น JavaScript object ที่สามารถใช้งานได้ใน route handler ต่าง ๆ ของแอปพลิเคชัน

// Setting views Template
MyApp.engine('pug', require('pug').__express);
MyApp.set('view engine', 'pug');
MyApp.set('views', path.join(__dirname, 'views'));

// App
MyApp.get('/', (req, res) => {
    res.render('template', {
        title: 'API Project GK',
        message: 'Welcome to my API Project!'
    });
});

//สร้าง API Register & Login
MyApp.post('/register', (req, res) => {
    const user = {
        email:req.body.email,
        password:req.body.password
    }
    // ตรวจสอบความถูกต้องของ email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(!emailRegex.test(user.email)){
        return res.status(400).json({
            message: 'รูปแบบอีเมลไม่ถูกต้อง'
        });
    }

    // ตรวจสอบอีเมลว่าไม่มีการซ้ำกัน
    const duplicate = useSyncExternalStore.find((u) => u.email === user,email)
    if(duplicate){
        return res .status(409).json({
            message:  'มีอีเมลนี้ไปแล้ว'
        });
    }

    //Hash password
    bcrypt.hash(user.password, 10, (err,hash) => {
        if(err){
            console.error('เกิดข้อผิดพลาด Hashing password',err);
            return;
        } else {
            user.password=hash;
            users.push(user);
            return res.status(201).json({
                message: 'สร้าง User'
            })
        }
    })
});

// สร้าง API Login
MyApp.post('/login',(req, res) => {
    const{ email, password } = req.body;
    const user = users.find((u) => u.email === email);
    if(!user){
        return res.status(401).json({
            message: 'รูปแบบ email และ password ไม่ถูกต้อง'
        });
    }
    
    bcrypt.compare(password, user.password, (err, result) => {
        if(err){
            console.error('เกิดข้อผิดพลาดในการเปรียบเทียบรหัสผ่าน:', err);
            return;
        }
        if(result){
            return res.status(200).json({
                message: 'เข้ารหัสสำเร็จ'
            });
        } else {
            return res.status(401).json({
                message: 'Email และ Password ไม่ถูกต้อง'
            });
        }
    });
});

MyApp.get('/users', (req, res) => {
    res.json({
        users
    });
});

MyApp.use((req, res, next) => {
    console.log(`${req.method} request made to ${req.url}`);
    next();
});

MyApp.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});