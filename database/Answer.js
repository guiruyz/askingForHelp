const Sequelize = require("sequelize");
const connection = require("./database");
const question = require("./question");

const Answer = connection.define("Answers",{
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    questionId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Answer.sync({force: false}).then(() => {
    console.log("Tabela Criada!!")
});


module.exports = Answer;