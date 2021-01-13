const Student = require("../models/Student");
module.exports = {

    // FUNCÃO QUE VAI SE EXECUTADA PELA ROTA
    async listarAlunos(req, res){
        
        try {
            const alunos = await Student.findAll(); 

            res.send(alunos);

        } catch (error) {

            console.log(error);
            res.status(500).send({error})
            
        }

    
      
    },

    async buscarAluno(req, res){
        // recuperar o id do aluno
        const alunoId = req.params.id;
     try {
         let aluno = await Student.findByPk(alunoId, {
            attributes:["ra", "nome", "email", ]
        
        });
            if(!aluno)
                return res.status(404).send({erro:" aluno não encontrado"});
        res.send(aluno);

     } catch (error) {
        console.log(error);
        res.status(404).send({error});
     }
     

    },
     
    async adicionarAlunos(req, res){
         
         //receber os dados no body
         const{ra, nome, email, senha} = req.body;
        try {
            let aluno = await Student.findOne
            ({
                where:
                {
                    ra
                }
            });

            if(aluno)
                return res.status(400).send({erro:" 'Ra ja cadastrado'!"});

            aluno = await Student.create({ra, nome, email, senha});
            res.status(201).send(aluno);

        } catch (error) {
           console.log(error);
           res.status(404).send(error);
           
        }
        


     
        //  // incrementa o id para o registro
        //  const nextid = alunos.length > 0 ? alunos[alunos.length-1].id +1 : 1;
     
        //  //adicionar o aluno na lista 
        //  alunos.push({id:nextid, RA, nome, email, senha});
     
         //retorna resposta de sucesso
         res.status(201).send({id: aluno.id});
    },
     
    async deletarAluno(req, res){
         // Recuperar o id do aluno a ser deletado
     
         const alunoId = req.params.id;

         try {
             
            let aluno = await Student.findByPk(alunoId);

            if(!aluno)
                return res.status(404).send({erro:"aluno não encontrado"})

            await aluno.destroy();

            res.status(204).send()
         } catch (error) {
            console.log(error);
            res.status(404).send(error);
         }
     
         // retirar esse aluno da lista
     
        //  alunos = alunos.filter(a => a.id.toString() !== alunoId);
     
        //  // devolver resposta de sucesso
        //  res.status(204).send();
    },
     
    async editarAluno(req, res){
         // Recuperar o id do aluno a ser deletado
         const alunoId = req.params.id;
     
         //Recuperar os dados do corpo
         const{nome, email} = req.body
     
        try {
            
            let aluno = await Student.findByPk(alunoId);

            if(!aluno)
                res.status(404).send({erro:"Student não encontrado"});

            aluno.nome = nome,
            aluno.email = email

            aluno.save();
            res.status(204).send()
        } catch (error) {
            console.log(error);
            res.status(404).send(error);
        }
    }
}


// let aluno = await Student.create.find( ra => ra.ra ({ra, nome, email, senha})=== aluno.ra);