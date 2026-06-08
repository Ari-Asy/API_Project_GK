const bcrypt = require('bcrypt');
const db = require('../models');
const jwt = require('jsonwebtoken');
const User = db.User;

// register function
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const data = {
            username,
            email,
            password: await bcrypt.hash(password, 10),
        };
        const user = await User.create(data);

        if (user) { 
                // Token คือการยืนยันสิทธิ์ตัวตนเองตัวเองใน server
                // JWT คือเหมือนลายเซ็นดิจิทัลของ server ป้องกันการถูกแอบแก้ไขข้อมูล
            // let token = jwt.sign({ id: user.id }, process.env.secretKey, {
            //     expiresIn: 86400
            // });

                // Cookie ใช้จดจำข้อมูลผู้ใช้
            // res.cookie("jwt", token, { maxAge: 86400000, httpOnly: true });
            // console.log("user", JSON.stringify(user, null, 2));
            // console.log(token);

            // ไม่ส่งค่าการแสดง Password
            const userData = user.toJSON();
            delete userData.password;

            return res.status(201).json(userData);// 201 Created: สร้างข้อมูลสำเร็จ
        } else {
            return res.status(409).json({
                message: "ไม่ถูกต้อง"
            });// 409 Conflict: ข้อมูลชนกัน/ซ้ำกัน
        }
    } catch (error) {
        console.log(error);
    }
};

// login function
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({
            where: {
                email: email
            }
        });

        if (user) {
            const isSame = await bcrypt.compare(password, user.password);

            if (isSame) {
                    // Token คือการยืนยันสิทธิ์ตัวตนเองตัวเองใน server
                    // JWT คือเหมือนลายเซ็นดิจิทัลของ server ป้องกันการถูกแอบแก้ไขข้อมูล
                // let token = jwt.sign({ id: user.id }, process.env.secretKey, {
                //     expiresIn: 86400
                // });

                    // Cookie ้ใช้จดจำข้อมูลผู้ใช้
                // res.cookie("jwt", token, { maxAge: 86400000, httpOnly: true });
                // console.log("user", JSON.stringify(user, null, 2));
                // console.log(token);

                //ไม่ส่งค่า Password กลับ
                const userData = user.toJSON();
                delete userData.password;

                return res.status(200).json(userData);// 200 OK:สำเร็จทั่วไป
            } else {
                return res.status(401).json({
                    message: "Authentication ล้มเหลว"
                });// 401 Unauthorized: ยืนยันตัวตนไม่ผ่าน
            }
        } else {
            return res.status(401).json({
                message: "Authentication ล้มเหลว"
            });
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    register,
    login,
};