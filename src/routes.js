const express = require("express");
const Multer = require("multer");

const answerValidator = require("./validators/answerValidator");
const studentValidator = require("./validators/studentValidator");
const questionValidator = require("./validators/questionValidator");

const authMiddleware = require("./middleware/authorization");

const feedController = require("./controllers/feed");
const answersController = require("./controllers/answers");
const studentController = require("./controllers/students");
const sessionController = require("./controllers/sessions");
const questionController = require("./controllers/questions")

const routes = express.Router();

const multer = Multer
({
    storage: Multer.diskStorage
    ({
        destination: "uploads/",
        filename: (req, file, callback) =>{
            const filename = Date.now() + "." + file.originalname.split(".").pop();

            return callback(null, filename);
        }
    })
});


routes.post("/upload", multer.single("arquivo"), (req, res) =>{
    console.log(req.file);
    
    res.send(req.file);
    
});


// ROTAS PUBLICAS
routes.post("/sessions", sessionController.store);
routes.post("/students", studentValidator.create, studentController.store);

// MIDDLEWARE
routes.use(authMiddleware);

// CONFIGURAÇÃO DA ROTA DE ALUNOS
routes.get("/students", studentController.index);
routes.get("/students/:id", studentController.find);
routes.put("/students/:id", studentController.update);
routes.delete("/students/:id", studentController.delete);

// CONFIGURAÇÃO DA ROTA DE PERGUNTAS
routes.get("/questions", questionController.index);
routes.get("/questions/:id", questionController.find);
routes.put("/questions/:id", questionController.update);
routes.delete("/questions/:id", questionController.delete);
routes.post("/questions", questionValidator.create, questionController.store);

// CONFIGURAÇÃO DA ROTA DE RESPOSTAS
routes.post("/questions/:id/anwers", answerValidator.create, answersController.store);

// CONFIGURAÇÃO DA ROTA DO FEED
routes.get("/feed", feedController.index);

module.exports = routes;