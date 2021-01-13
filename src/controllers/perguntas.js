const Question = require("../models/Question");
const Student = require("../models/Student");

module.exports = 
{
    index(req, res)
    {
        
        

    },

    
    async store(req, res)
    {
        const{titulo, descricao, imagem, gist } = req.body;

        const alunoId = req.headers.authorization;


        try 
        {
            // BUSCA O ALUNO PELO ID

            let aluno = await Student.findByPk(alunoId);

            // SE O ALUNO NÃO EXISTIR RETORNA ERRO

            if(!aluno)
                return res.status(404).send({erro:"Aluno não encontrado"});

            // CRIO A PERGUNTA PARA O ALUNO
            let pergunta = await aluno.createQuestion({titulo, descricao, imagem, gist });

            // RETORNO DE SUCESSO

            res.status(201).send(pergunta);
        } 
        catch (error) 
        {
            console.log(error);
            res.status(500).send(error);
            
        }
        
    },

    find(req, res)
    {

    },

    async update(req, res)
    {
        // recuperar id da pergunta a ser deletada

        const{titulo, descricao, imagem, gist } = req.body;

        const questionId = req.params.id;

        const studentId = req.headers.authorization

        try 
        {
            const question = await Question.findByPk(questionId);

            if(!question)
                res.status(404).send({erro:"Pergunta não encontrada"});


            const student = await Student.findByPk(studentId);

            if(!student)
                res.status(404).send({erro:"aluno não encontrada"});
           
                question.titulo = titulo,
                question.descricao = descricao
              
                
                question.save();
                res.status(204).send("dados atualizados!")
            
        } 
        catch (error) 
        {
            console.log(error);
            res.status(404).send(error);
        }
    },

    async delete(req, res)
    {
        const questionId = req.params.id;

        const studentId = req.headers.authorization;

        try 
        {
            const question = await Question.findOne
            ({
                where:
                {
                    id:questionId,  
                    aluno_id: studentId
                }
            });

            if(!question)
                res.status(404).send({erro:"Pergunta não encontrada"});

                await question.destroy();
                res.status(204).send({sucess:"dados deletados!"});
        } 
        catch (error) 
        {
            console.log(error);
            res.status(500).send(error);
        }
    }
}