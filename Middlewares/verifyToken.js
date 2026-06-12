// import json-web-token
const jwt = require('jsonwebtoken');

// สร้างตัวแปร Middleware ตรวจจับ Token
const verifyToken = (req, res, next) => {    
    const authHeader = req.headers.authorization; // อ่านค่า header ที่ชื่อ authorization
    const token = authHeader?.split(" ")?.[1]; // แยกด้วยช่องว่าง และเอาข้อความแค่ตัว token ที่เป็น array ที่สอง
    
    // ตรวจสอบ Client การส่ง authHeader ว่าส่งมาไหม
    if (!authHeader) {
        return res.status(401).json({
            message: "No token provided"
        });
    }
    // ตรวจสอบว่าแยก token มาได้ไหม รูปแบบผิดไหม
    if (!token) {
        return res.status(401).json({
            message: "Invalid token format"
        });
    }

    try {
        // ตรวจสอบ Token ว่า token ปลอมหรือหมดอายุไปแล้ว หรือว่าตัว SECRETKEY ไม่ตรง
        const decoded = jwt.verify(token, process.env.SECRETKEY);
        req.user = decoded; // คืนค่าการถอดรหัสภาษาเอเลี่ยนให้เป็นภาษาปกติ ไปเก็บไว้ใน req.user
        
        next();
    } catch (error) { // กรณีเช็ค jwt.verify ติด error
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
};

module.exports = verifyToken;