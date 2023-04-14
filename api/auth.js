const router = require("express").Router();
const {
    required,
    struct,
    exist,
    match,
    notExist,
} = require("../middleware/auth");
const authCtrl = require("../controller/auth");
const {api} = require("../middleware/errorHandle");

router.post(
    "/register",
    [required.fullname, required.username, required.email, required.password],
    [struct.username, struct.email, struct.password],
    [notExist.username, notExist.email],
    api,
    authCtrl.api.register.pembeli
);

router.post(
    "/registerpenjual",
    [required.fullname, required.username, required.email, required.password],
    [struct.username, struct.email, struct.password],
    [notExist.username, notExist.email],
    api,
    authCtrl.api.register.kedai
);

router.post(
    "/login",
    [required.username, required.password],
    [struct.username, struct.password],
    [exist.username],
    [match.userPassword],
    api,
    authCtrl.api.login
);

module.exports = router;
