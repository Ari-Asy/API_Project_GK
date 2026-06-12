const db = require("../models");
const user = db.user;

const checkAdmin = (req, res, next) => {
    const roleUser = req.user.role;
    if (roleUser !== 'admin') {
        return res.status(403).json({
            message: "Access denied: Admin"
        });
    }

    next();
};

module.exports = { checkAdmin };