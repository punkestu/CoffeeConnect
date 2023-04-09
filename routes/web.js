const {required, struct, exist, match} = require("../middleware/auth");
const {web} = require("../middleware/errorHandle");
const router = require("express").Router();

router.get("/", function (req, res) {
    res.render("index", {user: req.session.user});
});

router.get("/login", function (req, res) {
    if (!req.session.user) {
        return res.render("login", {errors: req.session.error});
    } else {
        return res.redirect("/");
    }
});

router.get("/logout", function(req,res){
    req.session.destroy();
    res.redirect("/login");
})

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

module.exports = router;