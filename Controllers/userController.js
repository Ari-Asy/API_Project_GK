const bcrypt = require('bcrypt');
const db = require('../models');
const jwt = require('jsonwebtoken');
const User = db.User;

// register function
const register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const data = {
            username,
            email,
            password: await bcrypt.hash(password, 10),
            role: 'user',
        };
        const user = await User.create(data);

        if (user) { 

            // ไม่ส่งค่าการแสดง Password
            const userData = user.toJSON();
            delete userData.password;

            return res.status(201).json(userData);// 201 Created: สร้างข้อมูลสำเร็จ
        } else {
            return res.status(409).json({
                message: "Incorrect"
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
            const payload = { id: user.id, username: user.username, role: user.role };

            if (isSame) {
                // Token คือการยืนยันสิทธิ์ตัวตนเองตัวเองใน server
                // JWT คือเหมือนลายเซ็นดิจิทัลของ server ป้องกันการถูกแอบแก้ไขข้อมูล
                // X = header ,Y = payload ,Z = SECRETKEY
                let token = jwt.sign(payload, process.env.SECRETKEY, {
                    expiresIn: 86400 // ระยะเวลา 1 วัน
                });

                //ไม่ส่งค่า Password กลับ
                const userData = user.toJSON();
                delete userData.password;

                return res.status(200).json({
                    token: token,   // แสดง Token
                    user: userData
                });// 200 OK:สำเร็จทั่วไป
            } else {
                return res.status(401).json({
                    message: "Authentication fail"
                });// 401 Unauthorized: ยืนยันตัวตนไม่ผ่าน
            }
        } else {
            return res.status(401).json({
                message: "Authentication fail"
            });
        }
    } catch (error) {
        console.log(error);
    }
};

// ลบ user ทิ้ง
const deleteUser = async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if(!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }
    
    if(user.role?.toLowerCase() === 'admin') {
        return res.status(403).json({
            message: "Forbidden"
        });
    }

    await user.destroy();
    res.status(200).json({
        message: "User Deleted"
    });
};

module.exports = {
    register,
    login,
    deleteUser,
};