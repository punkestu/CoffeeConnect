const produkM = require("../../model/produk");
module.exports = {
    timeline: function (req, res) {
        produkM.findAll()
            .then(Feeds => {
                req.session.back = req.originalUrl;
                return res.render("index", {
                    useHeader: true,
                    feeds: Feeds,
                    user: req.session.user,
                    title: "Home"
                });
            });
    },
    detailproduk: function (req, res) {
        produkM.findFirst({
            produkId: req.params.produkId,
            kedaiId: req.params.kedaiId
        }).then(Produk => {
            if (Produk) {
                Produk.updatedAt = new Date(Produk.updatedAt).toLocaleString();
                req.session.back = req.originalUrl;
                res.render("kedai/detailproduk", {
                    useHeader: true,
                    user: req.session.user,
                    kedai: req.session.user && req.session.user.Kedai_Profile,
                    produk: Produk, title: `${Produk.kedai.name} | ${Produk.name}`
                });
            } else {
                res.render("error/404", {
                    useHeader: true,
                    user: req.session.user,
                    kedai: req.session.user && req.session.user.Kedai_Profile, title: "Not Found"
                });
            }
        });
    },
    formproduk: function (req, res) {
        if (req.session.user.role.role_name === "Penjual") {
            res.render("kedai/formproduk", {
                endpoint: "/produk",
                useHeader: true,
                user: req.session.user,
                kedai: req.session.user.Kedai_Profile, title: "Create Produk"
            });
        } else {
            res.redirect("/");
        }
    },
    formeditproduk: function (req, res) {
        if (req.session.user.role.role_name === "Penjual") {
            produkM.findFirst({
                produkId: req.params.produkId,
                kedaiId: req.params.kedaiId
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
                        editMode: true, title: `Edit Produk | ${Produk.name}`
                    });
                } else {
                    res.render("error/404", {
                        useHeader: true,
                        user: req.session.user,
                        kedai: req.session.user.Kedai_Profile, title: "Not Found"
                    })
                }
            });
        } else {
            res.redirect("/");
        }
    },
}