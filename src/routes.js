const express = require("express");
const Multer = require("multer")

const multer = Multer()
const answerValidator = require("./validators/answerValidator");
const studentValidator = require("./validators/studentValidator");
const questionValidator = require("./validators/questionValidator");

const authMiddleware = require("./middleware/authorization");
const uploadQuestions = require("./services/firebase")

const feedController = require("./controllers/feed");
const answersController = require("./controllers/answers");
const studentController = require("./controllers/students");
const sessionController = require("./controllers/sessions");
const questionController = require("./controllers/questions");
const categoriesController = require("./controllers/categories");

const routes = express.Router();

//const upload  = multer.single("arquivo");


// routes.post("/upload",  (req, res) => {
    
//     const handleError = (error) => {
//         if(error){
//             res.status(400).send({error: "Arquivo inválido"})
//         }
//         console.log(req.file);
//         res.send(req.file);
        
//     }

//     upload(res, res, handleError)
// });


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
routes.delete("/students/:id", studentController.delete);

// CONFIGURAÇÃO DA ROTA DE PERGUNTAS
routes.get("/questions", questionController.index);
routes.get("/questions/:id", questionController.find);
routes.put("/questions/:id", questionController.update);
routes.delete("/questions/:id", questionController.delete);
routes.post("/questions",multer.single("image"), uploadQuestions, questionValidator.create, questionController.store);

// CONFIGURAÇÃO DA ROTA DE RESPOSTAS
routes.post("/questions/:id/answers", answerValidator.create, answersController.store);

// CONFIGURAÇÃO DA ROTA DO FEED
routes.get("/feed", feedController.index);

// ROTAS DE CATEGORIAS

routes.get("/categories", categoriesController.index);

module.exports = routes;