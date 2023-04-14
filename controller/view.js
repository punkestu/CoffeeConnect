const {user, kedai_Profile} = require("../prisma/db");
module.exports = {
    login: function (req, res) {
        if (!req.session.user) {
            const errors = req.session.error;
            const payload = req.session.payload;
            delete req.session.error;
            delete req.session.payload;
            res.render("user/login", {errors, payload});
        } else {
            return res.redirect("/");
        }
    },
    register: function (req, res) {
        if (!req.session.user) {
            const errors = req.session.error;
            const payload = req.session.payload;
            delete req.session.error;
            delete req.session.payload;
            res.render("user/register", {
                errors,
                payload,
                endpoint: "/register",
                role: "Pembeli"
            });
        } else {
            return res.redirect("/");
        }
    },
    registerpenjual: function (req, res) {
        if (!req.session.user) {
            const errors = req.session.error;
            const payload = req.session.payload;
            delete req.session.error;
            delete req.session.payload;
            return res.render("user/register",
                {errors, payload, endpoint: "/registerpenjual", role: "Penjual"});
        } else {
            return res.redirect("/");
        }
    },
    userprofile: function (req, res) {
        user.findFirst({
            where: {
                username: req.params.username
            },
            include: {
                profile: true
            }
        }).then(User => {
            res.render("user/profile", {useHeader: true, profile: User, user: req.session.user});
        })
    },
    edituserprofile: function (req, res) {
        if (req.session.user) {
            const errors = req.session.error;
            const payload = req.session.payload;
            delete req.session.error;
            delete req.session.payload;
            res.render("user/profile", {useHeader: true, user: req.session.user, editMode: true, errors, payload});
        } else {
            res.redirect("/login");
        }
    },
    kedaiprofile: function (req, res) {
        kedai_Profile.findFirst({
            where: {
                name: req.params.namakedai
            },
            include: {
                user: true
            }
        }).then(Kedai => {
            return res.render("kedai/profile", {useHeader: true, user: req.session.user, kedai: Kedai});
        }, _ => {
            return res.send(404);
        });
    },
    editkedaiprofile: function (req, res) {
        if (req.session.user) {
            if (req.session.user.role.role_name === "Penjual") {
                res.render("kedai/profile", {
                    useHeader: true,
                    user: req.session.user,
                    kedai: req.session.user.Kedai_Profile,
                    editMode: true
                });
            } else {
                res.redirect("/");
            }
        } else {
            res.redirect("/login");
        }
    }
}