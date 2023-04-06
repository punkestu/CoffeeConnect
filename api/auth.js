const router = require("express").Router();
const {
  required,
  struct,
  exist,
  match,
  notExist,
} = require("../middleware/auth");
const { register, login } = require("../controller/auth");
const errorHandler = require("../middleware/errorHandle");

router.post(
  "/register",
  [required.fullname, required.username, required.email, required.password],
  [struct.username, struct.email, struct.password],
  [notExist.username, notExist.email],
  errorHandler,
  register.pembeli
);

router.post(
  "/registerpenjual",
  [required.fullname, required.username, required.email, required.password],
  [struct.username, struct.email, struct.password],
  [notExist.username, notExist.email],
  errorHandler,
  register.kedai
);

router.post(
  "/login",
  [required.username, required.password],
  [struct.username, struct.password],
  [exist.username],
  [match.userPassword],
  errorHandler,
  login
);

module.exports = router;
