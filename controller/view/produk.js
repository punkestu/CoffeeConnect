const produkM = require("../../model/produk");
module.exports = {
    timeline: function (req, res) {
        produkM.findAll()
            .then(Feeds => {
                req.session.back = req.originalUrl;
                return res.render("index", {
                    feeds: Feeds,
                    useAction: true,
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
                res.render("produk/detailproduk", {
                    user: req.session.user,
                    useAction: true,
                    kedai: req.session.user && req.session.user.Kedai_Profile,
                    produk: Produk, title: `${Produk.kedai.name} | ${Produk.name}`
                });
            } else {
                res.render("error/404", {
                    user: req.session.user,
                    kedai: req.session.user && req.session.user.Kedai_Profile, title: "Not Found"
                });
            }
        });
    },
    tambahproduk: function (req, res) {
        if (req.session.user.role.role_name === "Penjual") {
            res.render("produk/formproduk", {
                endpoint: "/produk",
                useAction: true,
                user: req.session.user,
                kedai: req.session.user.Kedai_Profile, title: "Create Produk"
            });
        } else {
            res.redirect("/");
        }
    },
    editproduk: function (req, res) {
        if (req.session.user.role.role_name === "Penjual") {
            produkM.findFirst({
                produkId: req.params.produkId,
                kedaiId: req.params.kedaiId
            }).then(Produk => {
                if (Produk) {
                    Produk.picture = "/picture/" + Produk.picture;
                    req.session.back = req.originalUrl;
                    res.render("produk/formproduk", {
                        endpoint: `/produk/${req.params.produkId}`,
                        user: req.session.user,
                        kedai: req.session.user.Kedai_Profile,
                        produk: Produk,
                        editMode: true, title: `Edit Produk | ${Produk.name}`
                    });
                } else {
                    res.render("error/404", {
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