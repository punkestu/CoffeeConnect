const fs = require("fs");
const produkM = require("../../model/produk");

module.exports = {
    create: function (req, res) {
        produkM.create({
            picture: req.body.picture,
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            kedaiId: req.session.user.Kedai_Profile.Id
        }).then(_ => {
            res.redirect(`/k/${req.session.user.Kedai_Profile.name}`);
        });
    },
    update: function (req, res) {
        produkM.update({
            userId: req.session.user.Id,
            produkId: req.params.produkId,
            name: req.body.name,
            price: parseInt(req.body.price),
            description: req.body.description,
            picture: req.body.picture
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
        produkM.delete({
            produkId: req.params.produkId,
            kedaiId: req.session.user.Id
        }).then(Produk => {
            fs.rm(__dirname + `/../storage/${Produk.picture}`, () => {
            });
            res.redirect(`/k/${req.params.kedaiName}`);
        });
    }
};
