const Question = require("../models/Question");
const Student = require("../models/Student");

module.exports =
{
    async index(req, res)
    {

    },

    async store(req, res)
    {
        const questionId = req.params.id;
        const {studentId}  = req;
        const {answer} = req.body;

        try 
        {
            const student = await Student.findByPk(studentId);
            console.log(student)
            const question = await Question.findByPk(questionId);


            if(!student)
                return res.status(404).send({error:"Aluno não encontrado"});
            if(!question)
                return res.status(404).send({error:"Pergunta Não encontrada"});
            
            const anwer = await question.createAnswer({answer, student_id: studentId});



           

            res.status(201).send(anwer);

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