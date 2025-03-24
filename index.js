const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const connection = require("./database/database")
const questionModel = require("./database/question")
const answerModel = require("./database/Answer");
const Answer = require("./database/Answer");
//database
connection
    .authenticate()
    .then(() => {
        console.log("Successfull connection!!")
    })
    .catch((msgErro) => {
        console.log("error:"+msgErro);
    })
//Set type of view
app.set('view engine', 'ejs');
app.use(express.static('public'));
//Body parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
//Rotes
app.get("/", (req,res) => {
    questionModel.findAll({ raw: true, order:[
        ['id','DESC'] // ASC
    ]}).then(questions => {
    //SELECT * ALL FROM question
        res.render("index", {
        questions: questions
        });
    });
});

app.get("/perguntar",(req, res) => {
    res.render("perguntar")
})

app.post("/savequestion", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    console.log("titulo:" + titulo + "\n" + "descricao:" + descricao)
    questionModel.create({
        title: titulo,
        description: descricao
    }).then(() => {
        res.redirect("/")
    });
})

app.get("/pergunta/:id",(req ,res) =>{
    var id = req.params.id;
    questionModel.findOne({
        where: {id: id}
    }).then(questions => {
        if (questions != undefined){
            res.render("pergunta",{
                questions: questions
            });
        }else{
            res.redirect("/")
        }
    });
});

app.post("/responder",(req ,res) => {
    var body = req.body.body;
    var questionId = req.body.question;
    answerModel.create({
        body: body,
        questionId: questionId
    }).then(() => {
        res.redirect("/pergunta/" + questionId);
    });
});

app.listen(8080,()=>{console.log("rodando!!");});