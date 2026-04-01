const { OAuth2Client } = require("google-auth-library");
const Student = require("../models/Student");
const { generateToken } = require("../utils");

function getClient() {
  const id = process.env.GOOGLE_CLIENT_ID;
  if (!id) return null;
  return new OAuth2Client(id);
}

module.exports = {
  async store(req, res) {
    const client = getClient();
    if (!client) {
      return res.status(503).send({ error: "Login Google não configurado no servidor" });
    }

    const { credential } = req.body;
    if (!credential) {
      return res.status(400).send({ error: "Credencial Google ausente" });
    }

    try {
      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const sub = payload.sub;
      const email = payload.email;
      const name = (payload.name || "").trim() || email.split("@")[0];
      const picture = payload.picture || null;

      if (!email) {
        return res
          .status(400)
          .send({ error: "Email não disponível na conta Google" });
      }

      let student = await Student.findOne({ where: { google_id: sub } });

      if (!student) {
        student = await Student.findOne({ where: { email } });
        if (student) {
          if (student.google_id && student.google_id !== sub) {
            return res.status(403).send({
              error: "Este email já está vinculado a outra conta Google",
            });
          }
          student.google_id = sub;
          if (picture && !student.image) {
            student.image = picture;
          }
          await student.save();
        }
      }

      if (!student) {
        student = await Student.create({
          google_id: sub,
          email,
          name,
          image: picture,
          password: null,
          ra: null,
        });
      }

      const token = generateToken({
        studentId: student.id,
        studentName: student.name,
      });

      return res.status(201).send({
        student: {
          studentId: student.id,
          studentName: student.name,
          ra: student.ra,
          email: student.email,
          image: student.image,
        },
        token,
      });
    } catch (err) {
      console.error(err);
      return res
        .status(401)
        .send({ error: "Não foi possível validar o login Google" });
    }
  },
};
