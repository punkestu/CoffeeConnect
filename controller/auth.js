const { user } = require("../prisma/db");
const { hash } = require("bcrypt");
const { sign } = require("jsonwebtoken");

const createUser = async function (data, role_name) {
  const password = await hash(data.password, process.env.SALT);
  return user
    .create({
      data: {
        full_name: data.fullname,
        username: data.username,
        email: data.email,
        password,
        role: {
          connectOrCreate: {
            create: {
              role_name,
            },
            where: {
              role_name,
            },
          },
        },
      },
    })
    .then(
      (User) => {
        return sign(User, process.env.JWT_KEY);
      },
      (err) => {
        throw { code: 500, err };
      }
    );
};

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
  register: {
    pembeli: async function (req, res) {
      try {
        createUser(req.body, "Pembeli")
          .then((token) => res.send({ data: { token } }))
          .catch((err) => res.status(err.code).send({ errors: err.err }));
      } catch (e) {
        res.status(500).send({ errors: e });
      }
    },
    kedai: async function (req, res) {
      try {
        createUser(req.body, "Penjual")
          .then((token) => res.send({ data: { token } }))
          .catch((err) => res.status(err.code).send({ errors: err.err }));
      } catch (e) {
        res.status(500).send({ errors: e });
      }
    },
  },
};
