const express = require("express");
const db = require("../models");
const Product = db.product;

// เช็คการแก้ไขไม่ให้แก้ไข ID
const checkIdProduct = async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if(!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        } if(req.body.id) {
            return res.status(400).json({
                message: "Cannot update product id"
            });
        }

        next();
    } catch(error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

// เช็คชื่อ Product ซ้ำตอนสร้าง
const existingProduct = async (req, res, next) => {
    try {
        const existingProduct = await Product.findOne({
            where: {
                name: req.body.name
            }
        });

        if(existingProduct){
            return res.status(400).json({
                message: "Already have product"
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
    checkIdProduct,
    existingProduct,
};