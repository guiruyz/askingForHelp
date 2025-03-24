const Sequelize = require("sequelize");
const connection = require("./database");

const question = connection.define('questions',{
    title:{
        type: Sequelize.STRING,
        allowNull:false
    },
    description:{
        type: Sequelize.TEXT,
        allowNull:false
    }
});

question.sync({force: false}).then(() => {
    console.log("Tabela Criada!!")
});

module.exports = question;