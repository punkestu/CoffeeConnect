const {user, kedai_Profile, produk} = require("../prisma/db");
module.exports = {
    timeline: function (req, res) {
        produk.findMany({
            include: {
                kedai: {
                    include: {
                        user: true
                    }
                }
            }
        }).then(Feeds => {
            req.session.back = req.originalUrl;
            return res.render("index", {useHeader: true, feeds: Feeds, user: req.session.user});
        })
    },
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
            req.session.back = req.originalUrl;
            res.render("user/profile", {useHeader: true, profile: User, user: req.session.user});
        })
    },
    edituserprofile: function (req, res) {
        if (req.session.user) {
            const errors = req.session.error;
            const payload = req.session.payload;
            delete req.session.error;
            delete req.session.payload;
            req.session.back = req.originalUrl;
            res.render("user/profile", {useHeader: true, user: req.session.user, editMode: true, errors, payload});
        } else {
            req.session.back = req.originalUrl;
            res.redirect("/login");
        }
    },
    kedaiprofile: function (req, res) {
        kedai_Profile.findFirst({
            where: {
                name: req.params.namakedai
            },
            include: {
                user: true,
                Produk: true
            }
        }).then(Kedai => {
            req.session.back = req.originalUrl;
            return res.render("kedai/profile", {useHeader: true, user: req.session.user, kedai: Kedai});
        }, _ => {
            return res.send(404);
        });
    },
    editkedaiprofile: function (req, res) {
        if (req.session.user) {
            if (req.session.user.role.role_name === "Penjual") {
                req.session.back = req.originalUrl;
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
            req.session.back = req.originalUrl;
            res.redirect("/login");
        }
    },
    detailproduk: function (req, res) {
        produk.findFirst({
            where: {
                AND: [
                    {Id: parseInt(req.params.produkId)},
                    {
                        kedai: {
                            name: req.params.kedaiId
                        }
                    },
                ]
            },
            include: {
                kedai: {
                    include: {
                        user: true
                    }
                }
            }
        }).then(Produk => {
            if (Produk) {
                Produk.updatedAt = new Date(Produk.updatedAt).toLocaleString();
                req.session.back = req.originalUrl;
                res.render("kedai/detailproduk", {
                    useHeader: true,
                    user: req.session.user,
                    kedai: req.session.user && req.session.user.Kedai_Profile,
                    produk: Produk
                });
            } else {
                res.render("error/404", {
                    useHeader: true,
                    user: req.session.user,
                    kedai: req.session.user && req.session.user.Kedai_Profile
                });
            }
        });
    },
    formproduk: function (req, res) {
        if (req.session.user) {
            if (req.session.user.role.role_name === "Penjual") {
                res.render("kedai/formproduk", {
                    endpoint: "/produk",
                    useHeader: true,
                    user: req.session.user,
                    kedai: req.session.user.Kedai_Profile
                });
            } else {
                res.redirect("/");
            }
        } else {
            req.session.back = req.originalUrl;
            res.redirect("/login");
        }
    },
    formeditproduk: function (req, res) {
        if (req.session.user) {
            if (req.session.user.role.role_name === "Penjual") {
                produk.findFirst({
                    where: {
                        Id: parseInt(req.params.produkId),
                        kedai: {
                            Id: req.session.user.Id
                        }
                    }
                }).then(Produk => {
                    if (Produk) {
                        Produk.picture = "/picture/" + Produk.picture;
                        req.session.back = req.originalUrl;
                        res.render("kedai/formproduk", {
                            endpoint: `/produk/${req.params.produkId}`,
                            useHeader: true,
                            user: req.session.user,
                            kedai: req.session.user.Kedai_Profile,
                            produk: Produk,
                            editMode: true
                        });
                    } else {
                        res.render("error/404", {
                            useHeader: true,
                            user: req.session.user,
                            kedai: req.session.user.Kedai_Profile,
                        })
                    }
                });
            } else {
                res.redirect("/");
            }
        } else {
            req.session.back = req.originalUrl;
            res.redirect("/login");
        }
    },
    notfound: function (req, res) {
        res.render("error/404", {
            useHeader: true,
            user: req.session.user,
            kedai: req.session.user && req.session.user.Kedai_Profile
        });
    }
}