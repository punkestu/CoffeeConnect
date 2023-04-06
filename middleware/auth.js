const { body } = require("express-validator");
const { user } = require("../prisma/db");
const { compare } = require("bcrypt");

module.exports = {
  required: {
    fullname: body("fullname")
      .notEmpty()
      .withMessage("Nama Lengkap harus diisi"),
    username: body("username").notEmpty().withMessage("Username harus diisi"),
    email: body("email").notEmpty().withMessage("Email harus diisi"),
    password: body("password").notEmpty().withMessage("Password harus diisi"),
  },
  struct: {
    username: body("username")
      .isString()
      .withMessage("Username harus string")
      .isLength({ min: 8 })
      .withMessage("Username minimal 8 karakter"),
    email: body("email").isEmail().withMessage("Email tidak valid"),
    password: body("password")
      .isLength({ min: 8 })
      .withMessage("Password minimal 8 karakter")
      .isAlphanumeric()
      .withMessage("Password harus terdiri dari huruf dan angka"),
  },
  match: {
    userPassword: body("password").custom(async (password, { req }) => {
      if (req.User) {
        const pwValid = await compare(password, req.User.password);
        if (!pwValid) {
          throw new Error("Password salah");
        }
      }
    }),
  },
  exist: {
    username: body("username").custom(async (username, {req}) => {
      req.User = await user.findFirst({
        where: {
          username,
        },
      });
      if (!req.User) {
        throw new Error("Username tidak terdaftar");
      }
    }),
    email: body("email").custom(async (email, {req}) => {
      req.User = await user.findFirst({
        where: {
          email,
        },
      });
      if (!req.User) {
        throw new Error("Email tidak ditemukan");
      }
    }),
  },
  notExist: {
    username: body("username").custom(async (username) => {
      const User = await user.findFirst({
        where: {
          username,
        },
      });
      if (User) {
        throw new Error("Username sudah terdaftar");
      }
    }),
    email: body("email").custom(async (email) => {
      const User = await user.findFirst({
        where: {
          email,
        },
      });
      if (User) {
        throw new Error("Email sudah terdaftar");
      }
    }),
  },
};
