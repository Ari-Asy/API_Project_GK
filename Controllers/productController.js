const db = require('../models');
const Product = db.product;

// สร้าง Product
const createProduct = async (req, res) => {
    try {
        const product = await Product.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
            category: req.body.category
        });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Product เรียกทั้งหมด
const allProducts = async (req, res) => {
    const products = await Product.findAll();
    res.status(200).json(products);
};

// ดู Product ตาม ID
const getProductByID = async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    } else {
        res.status(200).json(product);
    }
};

// แก้ไข Product
const updateProduct = async (req, res) => {
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

        // เลือกเฉพาะที่จำเป็น
        const { name, description, price, stock, category } = req.body;
        await product.update({
            name,
            description,
            price,
            stock,
            category
        });
        return res.status(200).json({
            message: "Product update",
            product
        });
    } catch(error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

// ลบ Product
const deleteProduct = async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    if(!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    await product.destroy();
    res.status(200).json({
        message: "Product deleted"
    });
};

module.exports = {
    createProduct,
    allProducts,
    getProductByID,
    updateProduct,
    deleteProduct
};