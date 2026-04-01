const { index } = require("./questions");
const Question = require("../models/Question");

module.exports = {
  async index(req, res) {
    const { page } = req.query;

    try {
      const totalQuestion = await Question.count();

      const pageNum = Math.max(1, parseInt(page, 10) || 1);
      const pageSize = 5;

      const feed = await Question.findAll({
        attributes: [
          "id",
          "title",
          "description",
          "image",
          "gist",
          "created_at",
          "StudentId",
        ],
        include: [
          {
            association: "Student",
            attributes: ["id", "name", "image"],
          },
          {
            association: "Categories",
            attributes: ["id", "description"],
            through: { attributes: [] },
          },
          {
            association: "Answers",
            attributes: ["id", "answer", "created_at"],
            include: {
              association: "Student",
              attributes: ["id", "name", "image"],
            },
          },
        ],
        order: [["created_at", "DESC"]],
        limit: pageSize,
        offset: (pageNum - 1) * pageSize,
      });

      res.header("X-Total-Count", String(totalQuestion));
      res.header("Access-Control-Expose-Headers", "X-Total-Count");

      res.send(feed);

    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
