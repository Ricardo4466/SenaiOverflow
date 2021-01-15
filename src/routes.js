const express = require("express");

const routes = express.Router();

const alunoController =  require("./controllers/alunos");
const perguntaController =  require("./controllers/perguntas");
const answersController = require("./controllers/answers");


// CONFIGURAÇÃO DA ROTA DE ALUNOS
routes.get("/alunos", alunoController.listarAlunos);
routes.put("/alunos/:id", alunoController.editarAluno);
routes.get("/alunos/:id", alunoController.buscarAluno);
routes.post("/alunos", alunoController.adicionarAlunos);
routes.delete("/alunos/:id", alunoController.deletarAluno);


// CONFIGURAÇÃO DA ROTA DE PERGUNTAS
routes.post("/perguntas", perguntaController.store);
routes.get("/perguntas/:id", perguntaController.index);
routes.put("/perguntas/:id", perguntaController.update);
routes.delete("/perguntas/:id", perguntaController.delete);

// CONFIGURAÇÃO DA ROTA DE RESPOSTAS
routes.post("/perguntas/:id/respostas", answersController.store);




module.exports = routes;