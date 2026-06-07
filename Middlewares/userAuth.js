const express = require("express");
const db = require("../models");
const User = db.User;

const saveUser = async(req, res, next) => {
    try {
        const username = await User.findOne({
            where: {
                username: req.body.username,
            },
        });
        if(username){
            return res.status(409).json("username ซ้ำกัน");
        }

        const emailcheck = await User.findOne({
            where: {
                email: req.body.email,
            },
        });
        if(emailcheck){
            return res.status(409).json("ตรวจสอบล้มเหลว")
        }

        next();
    } catch(error){
        console.log(error);
    }
};

module.exports = {
    saveUser,
};