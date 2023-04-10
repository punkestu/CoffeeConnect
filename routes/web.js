const {required, struct, exist, match, notExist} = require("../middleware/auth");
const {web, api} = require("../middleware/errorHandle");
const router = require("express").Router();

router.get("/", function (req, res) {
    res.render("index", {user: req.session.user});
});

router.get("/logout", function(req,res){
    req.session.destroy();
    res.redirect("/login");
})

router.get("/login", function (req, res) {
    if (!req.session.user) {
        return res.render("login", {errors: req.session.error});
    } else {
        return res.redirect("/");
    }
});

router.post("/login",
    [required.username, required.password],
    [struct.username, struct.password],
    [exist.username],
    [match.userPassword],
    web,
    function (req, res) {
        if (req.session.error) {
            return res.redirect("/login");
        }
        if (req.User) {
            delete req.session.error;
            req.session.user = req.User;
            return res.redirect("/");
        }
    }
);

router.get("/register",
    [required.fullname, required.username, required.email, required.password],
    [struct.username, struct.email, struct.password],
    [notExist.username, notExist.email],
    web,
    function (req, res) {
        return res.render("register", {errors: req.session.errors});
    }
)

module.exports = router;