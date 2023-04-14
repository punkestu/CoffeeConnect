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
        kedai_Profile.findFirst({
            where: {
                name: req.params.kedaiName
            }
        }).then(Kedai => {
            produk.delete({
                where: {
                    Id_kedaiId: {
                        Id: parseInt(req.params.produkId),
                        kedaiId: Kedai.Id
                    }
                },
            }).then(_=>{
                res.redirect(`/k/${Kedai.name}`);
            })
        })
    }
};