'use strict';

const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const db = {};

const sequelize = new Sequelize('mydatabase','myuser','mypassword',{
    host: 'dbpostgres',
    port: 5432,
    dialect: 'postgres'
});// คือการเชื่อมต่อฐานข้อมูล PostgreSQL โดยใช้ Sequelize ORM

sequelize.authenticate().then(() => {
    console.log('Database เชื่อมต่อสำเร็จ')
}).catch((err) => {
    console.error(err);
})

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;