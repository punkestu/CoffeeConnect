const {produk, kedai_Profile} = require("../prisma/db");
const {kedaiprofile} = require("./view");
const fs = require("fs");

module.exports = {
    create: function (req, res) {
        produk.create({
            data: {
                picture: req.body.picture,
                name: req.body.name,
                price: parseInt(req.body.price),
                description: req.body.description,
                kedai: {
                    connect: {
                        Id: req.session.user.Kedai_Profile.Id
                    }
                }
            }
        }).then(_ => {
            res.redirect(`/k/${req.session.user.Kedai_Profile.name}`);
        });
    },
    update: function (req, res) {
        produk.update({
            where: {
                Id_kedaiId: {
                    Id: parseInt(req.params.produkId),
                    kedaiId: req.session.user.Id
                }
            },
            data: {
                name: req.body.name,
                price: parseInt(req.body.price),
                description: req.body.description,
                picture: req.body.picture
            }
        }).then(_ => {
            fs.rm(__dirname + `/../storage/${req.Produk.picture}`, err => {
                if (err) {
                    return res.render("error/500", {
                        useHeader: true,
                        user: req.session.user,
                        kedai: req.session.user && req.session.user.Kedai_Profile
                    });
                }
            })
            res.redirect(`/k/${req.session.user.Kedai_Profile.name}`);
        });
    },
    delete: function (req, res) {
        if (req.session.user) {
            kedai_Profile.findFirst({
                where: {
                    name: req.params.kedaiName,
                    user: {
                        Id: req.session.user.Id
                    }
                }
            }).then(Kedai => {
                    produk.delete({
                        where: {
                            Id_kedaiId: {
                                Id: parseInt(req.params.produkId),
                                kedaiId: Kedai.Id
                            }
                        },
                    }).then(Produk => {
                        fs.rm(__dirname + `/../storage/${Produk.picture}`, () => {
                        });
                        res.redirect(`/k/${Kedai.name}`);
                    })
                },
                _ => {
                    res.redirect(`/k/${req.params.kedaiName}`);
                }
            );
        } else {
            res.redirect("/login");
        }
    }
};
