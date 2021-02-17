
const Question = require("../models/Question");

module.exports=
{
    async index (req, res)
    {
        const limitId = 5;
        const page = 1;
        try 
        {
            // const answer = req.body.answer
            // const questionId = req.params.id;
            // const studentId  = req.headers.authorization;
    
            const feed = await Question.findAll
            ({
               
                attributes:
                [
                    "id", "title","description", "image", "gist", "created_at", "StudentId",
                ],
                include: [
                    {
                        association: "Student",
                        attributes: ["id", "name", "image"]
                    },
                    {
                        association: "Answers",
                        attributes: ["id", "answer", "created_at"],
                        include : {
                            association: "Student",
                            attributes: ["id", "name", "image"]
                        }
                    },
                    {
                        association: "Categories",
                        attributes: ["id", "description"],
                        through: {attributes: []}
                    },
                ],
                order:[["created_at", "DESC"]],
                limit: 5,
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

