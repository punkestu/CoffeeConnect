const { user } = require("../prisma/db");
const { hash } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
  login: async function (req, res) {
    try {
      if (req.User) {
        const token = sign(req.User, process.env.JWT_KEY);
        res.status(200).send({ data: { token } });
      } else {
        res.status(400).send({ errors: "butuh data user" });
      }
    } catch (e) {
      res.status(500).send({ errors: e });
    }
  },
  register: async function (req, res) {
    try {
      const password = await hash(req.body.password, process.env.SALT);
      user
        .create({
          data: {
            full_name: req.body.fullname,
            username: req.body.username,
            email: req.body.email,
            password,
            role: {
              connectOrCreate: {
                create: {
                  role_name: "Pembeli",
                },
                where: {
                  role_name: "Pembeli",
                },
              },
            },
          },
        })
        .then(
          (User) => {
            const token = sign(User, process.env.JWT_KEY);
            res.status(200).send({ data: { token } });
          },
          (err) => {
            console.log("error");
            res.status(500).send({ errors: err });
          }
        );
    } catch (e) {
      res.status(500).send({ errors: e });
    }
  },
};
