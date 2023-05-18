const userM = require("../../model/user");

module.exports = {
    login: function (req, res) {
        if (req.session.error) {
            req.session.payload = req.body;
            return res.redirect("/login");
        }
        if (req.User) {
            delete req.session.error;
            if (req.User.profile && req.User.profile.birth_date) {
                req.User.profile.birth_date = req.User.profile.birth_date.toISOString().split("T")[0];
            }
            req.session.user = req.User;
            return res.redirect(req.session.back || "/");
        }
    },
    register: function (req, res) {
        if (req.session.error) {
            req.session.payload = req.body;
            return res.redirect("/register");
        }
        userM.create({
            fullname: req.body.fullname,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            role_name: "Pembeli"
        }).then(User => {
            delete req.session.error;
            req.session.user = User;
            return res.redirect(req.session.back || "/");
        }, e => {
            console.log(e);
            return res.redirect("/register");
        })
    },
    registerpenjual: function (req, res) {
        if (req.session.error) {
            req.session.payload = req.body;
            return res.redirect("/registerpenjual");
        }
        userM.create({
            fullname: req.body.fullname,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            role_name: "Penjual"
        }).then(User => {
            delete req.session.error;
            req.session.user = User;
            return res.redirect("/");
        }, _ => {
            return res.redirect("/registerpenjual");
        })
    }
};
