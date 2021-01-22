const express = require("express");
const { errors } = require("celebrate");

require("./database");

//IMPORTA O EXPRESS
const { request, response } = require("express");

// IMPORTAR AS ROTAS 
const routes = require("./routes");

// CRIA A APLICAÇÃO EXPPRESS
const app = express();

app.use(express.json());

// DEFINIMOS A PASTA UPLOADS COMO PÚBLICA, SERVINDO ARQUIVOS ESTÁTICOS
app.use("/uploads",express.static("uploads"));

app.use(routes);

app.use(errors());


module.exports = app;