const express = require("express");
const db = require("../models");
const User = db.User;

const saveUser = async(req, res, next) => {
    try {
        // เช็ค username ซ้ำ
        const username = await User.findOne({
            where: {
                username: req.body.username,
            },
        });
        if(username){
            return res.status(409).json({
                message: "username ซ้ำกัน"
            });
        }

        // เช็ค email ซ้ำ
        const emailcheck = await User.findOne({
            where: {
                email: req.body.email,
            },
        });
        if(emailcheck){
            return res.status(409).json({
                message: "ตรวจสอบล้มเหลว"
            });
        }

        next();
    } catch(error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    saveUser,
};