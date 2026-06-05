const bcrypt = require('bcrypt');
const db = require('../models');
const jwt = require('jsonwebtoken');
const User = db.User;

const register = async(req, res) => {
    try {
        const { username, email, password } = req.body;
        const data = {
            username,
            email,
            password: await bcrypt.hash(password, 10),
        };
        const user = await User.create(data);

        //
        if (user){
            let token = jwt.sign({ id: user.id }, process.env.secretKey,{
                expiresIn: 86400
            });

            res.cookie("jwt", token, { maxAge: 86400000, httpOnly:true });
            console.log("user", JSON.stringify(user, null, 2));
            console.log(token);

            // ไม่ส่งค่าการแสดง Password
            const userData = user.toJSON();
            delete userData.password;

            return res.status(201).json(userData);
        } else {
            return res.status(409).json("ไม่ถูกต้อง");
        }
    } catch (error) {
        console.log(error);
    }
};

//
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({
            where: {
                email: email
            }
        });

        if(user){
            const isSame = await bcrypt.compare(password, user.password);

            if(isSame){
                let token = jwt.sign({ id: user.id }, process.env.secretKey, {
                    expiresIn: 86400
                });

                res.cookie("jwt", token, { maxAge: 86400000, httpOnly: true});
                console.log("user", JSON.stringify(user, null, 2));
                console.log(token);

                //ไม่ส่งค่า Password กลับ
                const userData = user.toJSON();
                delete userData.password;

                return res.status(200).json(userData);
            } else {
                return res.status(401).json("Authentication ล้มเหลว");
            } 
        } else {
            return res.status(401).json("Authentication ล้มเหลว");
        }
    } catch(error) {
        console.log(error);
    }
};

module.exports = {
    register,
    login,
};