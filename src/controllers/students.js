const Student = require("../models/Student");

module.exports = {

    // FUNCÃO QUE VAI SE EXECUTADA PELA ROTA
    async index(req, res){
        
        try {
            const student = await Student.findAll(); 

            res.send(student);

        } catch (error) {

            console.log(error);
            res.status(500).send({error})
            
        }

    
      
    },

    async find(req, res){
        // recuperar o id do aluno
        const studentId = req.params.id;
     try {
         let student = await Student.findByPk(studentId, {
            attributes:["id", "ra", "name", "email", ]
        
        });
            if(!student)
                return res.status(404).send({erro:" aluno não encontrado"});
        res.send(student);

     } catch (error) {
        console.log(error);
        res.status(500).send({error});
     }
     

    },
     
    async store(req, res){
         
         //receber os dados no body
         const{ra, name, email, password} = req.body;
        try {
            let student = await Student.findOne
            ({
                where:
                {
                    ra
                }
            });

            if(student)
                return res.status(400).send({error:" Ra ja cadastrado!"});

            student = await Student.create({ra, name, email, password});
            res.status(201).send(student);

        } catch (error) {
           console.log(error);
           res.status(500).send(error);
           
        }
        


     
        //  // incrementa o id para o registro
        //  const nextid = alunos.length > 0 ? alunos[alunos.length-1].id +1 : 1;
     
        //  //adicionar o aluno na lista 
        //  alunos.push({id:nextid, RA, nome, email, senha});
     
         //retorna resposta de sucesso
         res.status(201).send({id: student.id});
    },
     
    async delete(req, res){
         // Recuperar o id do aluno a ser deletado
     
         const studentId = req.params.id;

         try {
             
            let student = await Student.findByPk(studentId);

            if(!student)
                return res.status(404).send({error:"aluno não encontrado"})

            await student.destroy();

            res.status(204).send()
         } catch (error) {
            console.log(error);
            res.status(500).send(error);
         }
     
         // retirar esse aluno da lista
     
        //  alunos = alunos.filter(a => a.id.toString() !== alunoId);
     
        //  // devolver resposta de sucesso
        //  res.status(204).send();
    },
     
    async update(req, res){
         // Recuperar o id do aluno a ser deletado
         const studentId = req.params.id;
     
         //Recuperar os dados do corpo
         const{name, email} = req.body
     
        try {
            
            let student = await Student.findByPk(studentId);

            if(!student)
                res.status(404).send({error:"Student não encontrado"});

            student.name = name,
            student.email = email

            student.save();
            res.status(204).send()
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
}


// let aluno = await Student.create.find( ra => ra.ra ({ra, nome, email, senha})=== aluno.ra);