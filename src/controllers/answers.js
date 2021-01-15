const Question = require("../models/Question");
const Student = require("../models/Student");

module.exports =
{
    async index(req, res)
    {

    },

    async store(req, res)
    {
        const answer = req.body.answer
        const questionId = req.params.id;
        const studentId  = req.headers.authorization;

        try 
        {
            const aluno = await Student.findByPk(studentId);
            console.log(aluno)
            const pergunta = await Question.findByPk(questionId);


            if(!aluno)
                return res.status(404).send({erro:"Aluno não encontrado"});
            if(!pergunta)
                return res.status(404).send({erro:"Pergunta Não encontrada"});
            
            const resposta = await pergunta.createAnswer({answer, student_id: studentId});



           

            res.status(201).send(resposta);

        } 
        catch (error) 
        {
            console.log(error);
            res.status(500).send(error);
        }
    },

    async find(req, res)
    {

    },

    async update(req, res)
    {

    },

    async delete(req, res)
    {
        
    }
}