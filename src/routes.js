const express = require("express");

const routes = express.Router();

const feedController = require("./controllers/feed");
const answersController = require("./controllers/answers");
const studentController =  require("./controllers/students");
const questionController =  require("./controllers/questions");


// CONFIGURAÇÃO DA ROTA DE ALUNOS
routes.get("/students", studentController.index);
routes.post("/students", studentController.store);
routes.get("/students/:id", studentController.find);
routes.put("/students/:id", studentController.update);
routes.delete("/students/:id", studentController.delete);


// CONFIGURAÇÃO DA ROTA DE PERGUNTAS
routes.get("/questions", questionController.index);
routes.post("/questions", questionController.store);
routes.get("/questions/:id", questionController.find);
routes.put("/questions/:id", questionController.update);
routes.delete("/questions/:id", questionController.delete);

// CONFIGURAÇÃO DA ROTA DE RESPOSTAS
routes.post("/questions/:id/anwers", answersController.store);


// CONFIGURAÇÃO DA ROTA DO FEED
routes.get("/feed", feedController.index);


module.exports = routes;