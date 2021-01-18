const Question = require("../models/Question");
const Student = require("../models/Student");

module.exports = 
{
    async index(req, res)
    {
        try {
            const questions = await Question.findAll(); 

            res.send(questions);

        } catch (error) {

            console.log(error);
            res.status(500).send({error})
            
        }
    },

    
    async store(req, res)
    {
        const{title, description, image, gist, categories } = req.body;

        const studentId = req.headers.authorization;


        try 
        {
            // BUSCA O ALUNO PELO ID

            let student = await Student.findByPk(studentId);

            // SE O ALUNO NÃO EXISTIR RETORNA ERRO

            if(!student)
                return res.status(404).send({error:"Aluno não encontrado"});

            // CRIO A PERGUNTA PARA O ALUNO
            let question = await student.createQuestion({title, description, image, gist });

            await question.addCategories(categories);

            // RETORNO DE SUCESSO

            res.status(201).send(question);
        } 
        catch (error) 
        {
            console.log(error);
            res.status(500).send(error);
            
        }
        
    },

    async find(req, res)
    {
        const questionId = req.params.id;
        try {
            let question = await Question.findByPk(questionId, {
               attributes:["id", "title", "description", "categories", ]
           
           });
               if(!question)
                   return res.status(404).send({error:" aluno não encontrado"});
           res.send(question);
   
        } catch (error) {
           console.log(error);
           res.status(500).send({error});
        }
        
    },

    async update(req, res)
    {
        // recuperar id da pergunta a ser deletada

        const{title, description} = req.body;

        const questionId = req.params.id;

        const studentId = req.headers.authorization

        try 
        {
            const question = await Question.findByPk(questionId);

            if(!question)
                res.status(404).send({error:"Pergunta não encontrada"});


            if(question.StudentId != studentId)
                res.status(404).send({error:" não Autorizado"});

            
           
                question.title = title,
                question.description = description
              
                
                question.save();
                res.status(204).send("dados atualizados!")
            
        } 
        catch (error) 
        {
            console.log(error);
            res.status(500).send(error);
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
                    student_id: studentId
                }
            });

            if(!question)
                res.status(404).send({error:"Pergunta não encontrada"});

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