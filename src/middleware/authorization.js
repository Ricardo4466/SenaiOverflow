const jwt = require("jsonwebtoken");
const auth = require("../config/auth.json")
module.exports = (req, res, next) =>
{
    // pegando o capo autorização do cabealho da requisição
    const{ authorization } = req.headers;

    // verifica se o campo foi informado, se nao retorna erro
    if(!authorization)
        return res.status(401).send({error:"Token não informado!"});

    //separa o prefixo do token
    const [bearer, token] = authorization.split(" ");

    //verifica se o token está presente, se não retorna erro
    if(!token)
        return res.status(401).send({error:"Token mal formatado!"});

    try 
    {
        //verifica se o token é valido, se não cai no catch
        const payLoad = jwt.verify(token, auth.secret);

        //coloca o id do aluno na requisição
        req.studentId = payLoad.studentId;

        // envia a reuquisição para frente (controller)
        return next();

    } catch (error) 
    {
        // retorna erro do token invalido
        res.status(401).send({error: "Token Invalido"});
    }

}
