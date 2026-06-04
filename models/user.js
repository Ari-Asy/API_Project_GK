'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    /**
     * คือส่วนที่ใช้ในการกำหนดความสัมพันธ์ระหว่างโมเดลต่าง ๆ ในฐานข้อมูล
     * ไฟล์ `models/index` จะเรียกใช้วิธีนี้โดยอัตโนมัติเมื่อโหลดโมเดลทั้งหมด
     */
    static associate(models) {
      // define association here
      // ความสัมพันธ์ระหว่างโมเดลต่าง ๆ สามารถกำหนดได้ที่นี่
    }
  }
  User.init({
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};