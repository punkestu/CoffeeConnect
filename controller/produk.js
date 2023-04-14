const {produk, kedai_Profile} = require("../prisma/db");
const {kedaiprofile} = require("./view");

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
                    }).then(_ => {
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
