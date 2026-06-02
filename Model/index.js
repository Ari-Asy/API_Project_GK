const {Sequelize,DataTypes} = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:1234@localhost:5432/postgres',{dialect:"postgres"});

sequelize.authenticate().then(() => {
    console.log('Database เชื่อมต่อสำเร็จ')
}).catch((err) => {
    console.error(err);
})

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;