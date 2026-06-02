const {Sequelize,DataTypes} = require('sequelize');//นำเข้า Sequelize และ DataTypes จากไลบรารี sequelize
const sequelize = new Sequelize('mydatabase','myuser','mypassword',{
    host: 'localhost',
    port: 5432,
    dialect: 'postgres'
});// คือการเชื่อมต่อฐานข้อมูล PostgreSQL โดยใช้ Sequelize ORM

sequelize.authenticate().then(() => {
    console.log('Database เชื่อมต่อสำเร็จ')
}).catch((err) => {
    console.error(err);
})

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//นำเข้าโมเดล User จากไฟล์ userModel.js และเก็บไว้ใน db.User
db.User = require('./userModel')(sequelize,DataTypes);

//ซิงค์โมเดลกับฐานข้อมูล โดยการสร้างตารางถ้ายังไม่มีอยู่
sequelize.sync().then(() => {
    console.log('ตารางในฐานข้อมูลถูกสร้างเรียบร้อยแล้ว');
}).catch((err) => {
    console.error('เกิดข้อผิดพลาดในการสร้างตาราง:', err);
});

module.exports = db;