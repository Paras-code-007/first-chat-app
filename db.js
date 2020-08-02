const sequelize= require('sequelize')
const {DataTypes}= require('sequelize')

const db= new sequelize('heroku_2663f36e43cfe75','b8fe07dad9b205','8acd1cd3',{
    // host: 'localhost',
    host: 'us-cdbr-east-02.cleardb.com',
    dialect: 'mysql'
})

const Messages= db.define('message',{
    socketid:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    message: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

db.sync({alter: true}).then(()=> console.log("database has been synced"))

module.exports= {
    Messages, db
}