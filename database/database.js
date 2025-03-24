const Sequelize = require('sequelize')

const connection = new Sequelize('askforhelp','root','M@ster2003',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection;

