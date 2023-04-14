const {required, struct, exist, match, notExist, encrypt} = require("../middleware/auth");
const {web} = require("../middleware/errorHandle");

const viewCtrl = require("../controller/view");
const authCtrl = require("../controller/auth");
const kedaiCtrl = require("../controller/kedai");
const router = require("express").Router();

router.get("/", function (req, res) {
    res.render("index", {useHeader: true, user: req.session.user});
});

router.get("/logout", function (req, res) {
    req.session.destroy();
    res.redirect("/login");
})

router.get("/login", viewCtrl.login);
router.post("/login",
    [required.username, required.password],
    [struct.username, struct.password],
    [exist.username],
    [match.userPassword],
    web,
    authCtrl.web.login
);

router.get("/register", viewCtrl.register);
router.post("/register",
    [required.fullname, required.username, required.email, required.password],
    [struct.username, struct.email, struct.password],
    [notExist.username, notExist.email],
    web,
    encrypt.password,
    authCtrl.web.register
);

router.get("/registerpenjual", viewCtrl.registerpenjual);
router.post("/registerpenjual",
    [required.fullname, required.username, required.email, required.password],
    [struct.username, struct.email, struct.password],
    [notExist.username, notExist.email],
    web,
    encrypt.password,
    authCtrl.web.registerpenjual
);

router.get("/p/:username", viewCtrl.userprofile);
router.post("/p",
    [struct.birthdate, struct.address, struct.phone],
    web,
    authCtrl.web.postprofile
);
router.get("/editprofile", viewCtrl.edituserprofile);

router.get("/k/:namakedai", viewCtrl.kedaiprofile);
router.post("/k",
    [struct.address, struct.phone],
    kedaiCtrl.web.postkedai
);
router.get("/editkedai", viewCtrl.editkedaiprofile);

module.exports = router;