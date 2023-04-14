const {produk} = require("../prisma/db");

module.exports = {
    create: function (req, res) {
        produk.create({
            data: {
                name: req.body.name,
                price: parseInt(req.body.price),
                description: req.body.description,
                kedai: {
                    connect: {
                        Id: req.session.user.Kedai_Profile.Id
                    }
                }
            }
        }).then(_=>{
            res.redirect(`/k/${req.session.user.Kedai_Profile.name}`);
        });
    }
};