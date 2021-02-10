
const Question = require("../models/Question");

module.exports=
{
    async index (req, res)
    {
        try 
        {
            // const answer = req.body.answer
            // const questionId = req.params.id;
            // const studentId  = req.headers.authorization;
    
            const feed = await Question.findAll
            ({
               
                attributes:
                [
                    "id", "title","description", "image", "gist", "created_at"
                ],
                include:
                [
                    {
                        association: "Student",
                        attributes: ["id", "name", "image"]
                    },
                    {
                        association: "Answers",
                        attributes: ["id", "answer","created_at" ],
                        include:
                        {
                            association: "Student",
                            attributes: ["id", "name", "image"]
                        }
                    },
                    {
                        association: "Categories",
                        through:{attributes:[]},
                        attributes: ["id", "description"]
                    }
                ],
                order:[["created_at", "DESC"]]
                
            });
            res.send(feed);
        } 
        catch (error) 
        {
            console.log(error);
            res.status(500).send({error})
        }
    }
}

