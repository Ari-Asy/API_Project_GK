'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * คือส่วนที่ใช้ในการกำหนดความสัมพันธ์ระหว่างโมเดลต่าง ๆ ในฐานข้อมูล
     * ไฟล์ `models/index` จะเรียกใช้วิธีนี้โดยอัตโนมัติเมื่อโหลดโมเดลทั้งหมด
     */
    static associate(models) {
      // ความสัมพันธ์ระหว่างโมเดลต่าง ๆ สามารถกำหนดได้ที่นี่
      User.hasMany(models.Post, {
        foreignKey: 'userId',
        as: 'posts'
      });
    }
  }
  User.init({// กำหนดฟิลด์และประเภทข้อมูลของโมเดล User
    userName: {
      type: DataTypes.STRING,
      allowNull: false, // กำหนดว่าต้องไม่เป็น null
      unique: true // กำหนดว่าให้ไม่ซ้ำกัน
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true // ตรวจสอบว่าเป็นรูปแบบอีเมลที่ถูกต้อง
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 100] // กำหนดความยาวของรหัสผ่านให้มีอย่างน้อย 6 ตัวอักษร
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });
  return User;
};