const Student = require("../models/Student");
const bcrypt = require("bcryptjs");

const { generateToken } = require("../utils");

module.exports = {
  async store(req, res) {
    const { email, password } = req.body;

    try {
      const student = await Student.findOne({
        where: {
          email,
        },
      });
      if (
        !student ||
        !student.password ||
        !bcrypt.compareSync(password, student.password)
      ) {
        return res.status(403).send({ error: "Usuario e/ou senha invalidos" });
      }

      const token = generateToken({
        studentId: student.id,
        studentName: student.name,
      });

      res.status(201).send({
        student: {
          studentId: student.id,
          studentName: student.name,
          ra: student.ra,
          email: student.email,
          image: student.image,
        },
        token,
      });

    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
