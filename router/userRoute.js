const router = require('express').Router();
// เชื่อม route user กับ controller user
const userController = require('../Controllers/userController');
const checkRole = require('../Middlewares/checkRole');
const userAuth = require('../Middlewares/userAuth');
const verifyToken = require('../Middlewares/verifyToken');

// Register
router.post('/register', userAuth.saveUser, userController.register);

// Login
router.post('/login', userController.login);

// Delete
router.delete('/:id', verifyToken, checkRole.checkAdmin, userController.deleteUser);

module.exports = router;