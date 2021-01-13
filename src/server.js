const app = require("./app");

// PORTA DO SERVIDOR HTTP
const PORT = 3333;

// SUBINDO O SERVIDOR NA WEB
app.listen(PORT,()=>{
    console.log(`Servidor rodando na porta ${PORT}`);
});