const router = require("express").Router();

const authV = require("../../controller/view/auth");
const authC = require("../../controller/logic/auth");
const {required, struct, exist, match, notExist, encrypt, isAuth, isGuest} = require("../../middleware/auth");
const errorHandle = require("../../middleware/errorHandle");

router.get("/logout", isAuth, function (req, res) {
    req.session.destroy();
    res.redirect("/login");
});

router.get("/login", isGuest, authV.login);
router.post("/login",
    isGuest,
    required.username, required.password,
    struct.username, struct.password,
    exist.username,
    match.userPassword,
    errorHandle,
    authC.login
);

router.get("/register", isGuest, authV.register);
router.post("/register",
    isGuest,
    required.fullname, required.username, required.email, required.password,
    struct.username, struct.email, struct.password,
    notExist.username, notExist.email,
    errorHandle,
    encrypt.password,
    authC.register
);

router.get("/registerpenjual", isGuest, authV.registerpenjual);
router.post("/registerpenjual",
    isGuest,
    required.fullname, required.username, required.email, required.password,
    struct.username, struct.email, struct.password,
    notExist.username, notExist.email,
    errorHandle,
    encrypt.password,
    authC.registerpenjual
);

module.exports = router;