const {required, struct, exist, match, notExist, isAuth} = require("../middleware/auth");
const {web} = require("../middleware/errorHandle");
const {user, user_Profile} = require("../prisma/db");
const router = require("express").Router();

router.get("/", function (req, res) {
    res.render("index", {user: req.session.user});
});

router.get("/logout", function (req, res) {
    req.session.destroy();
    res.redirect("/login");
})

router.get("/login", function (req, res) {
    if (!req.session.user) {
        const errors = req.session.error;
        const payload = req.session.payload;
        delete req.session.error;
        delete req.session.payload;
        res.render("user/login", {errors, payload});
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
            req.session.payload = req.body;
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
    function (req, res) {
        if (!req.session.user) {
            const errors = req.session.error;
            const payload = req.session.payload;
            delete req.session.error;
            delete req.session.payload;
            res.render("user/register", {
                errors,
                payload,
                endpoint: "/register"
            });
        } else {
            return res.redirect("/");
        }
    }
)

router.post("/register",
    [required.fullname, required.username, required.email, required.password],
    [struct.username, struct.email, struct.password],
    [notExist.username, notExist.email],
    web,
    function (req, res) {
        if (req.session.error) {
            req.session.payload = req.body;
            return res.redirect("/register");
        }
        user.create({
            data: {
                full_name: req.body.fullname,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                role: {
                    connectOrCreate: {
                        create: {
                            role_name: "Pembeli"
                        },
                        where: {
                            role_name: "Pembeli"
                        }
                    }
                }
            },
            include: {
                role: true
            }
        }).then(User => {
            delete req.session.error;
            req.session.user = User;
            return res.redirect("/");
        }, err => {
            return res.redirect("/register");
        })
    }
);

router.get("/registerpenjual",
    [required.fullname, required.username, required.email, required.password],
    [struct.username, struct.email, struct.password],
    [notExist.username, notExist.email],
    web,
    function (req, res) {
        if (!req.session.user) {
            return res.render("register", {errors: req.session.errors, endpoint: "/registerpenjual"});
        } else {
            return res.redirect("/");
        }
    }
);

router.get("/p/:username", function (req, res) {
    user.findFirst({
        where: {
            username: req.params.username
        },
        include: {
            profile: true
        }
    }).then(User => {
        res.render("user/profile", {profile: User, user: req.session.user || {}});
    })
});

router.post("/p/:username", function (req, res) {
    user_Profile.upsert({
        where: {
            Id: req.session.user.Id
        },
        update: {
            address: req.body.address,
            birth_date: new Date(req.body.birthdate),
            phone: req.body.phone
        },
        create: {
            user: {
              connect:{
                  Id: req.session.user.Id
              }
            },
            address: req.body.address,
            birth_date: new Date(req.body.birthdate),
            phone: req.body.phone
        }
    }).then(uProfile => {
        res.redirect(`/p/${req.session.user.username}`);
    })
})

router.get("/editProfile", function (req, res) {
    if (req.session.user) {
        user.findFirst({
            where: {
                username: req.session.user.username
            },
            include: {
                profile: true
            }
        }).then(User => {
            res.render("user/profile", {profile: User, user: req.session.user || {}, editMode: true});
        })
    } else {
        res.redirect("/login");
    }
})

module.exports = router;