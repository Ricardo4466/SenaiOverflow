const express = require("express");

require("./database");

//IMPORTA O EXPRESS
const { request, response } = require("express");

// IMPORTAR AS ROTAS 
const routes = require("./routes")

// CRIA A APLICAÇÃO EXPPRESS
const app = express();

app.use(express.json());



app.use(routes);





 


module.exports = app;