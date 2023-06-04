const {kedai_Profile, ulasan} = require("../../prisma/db");
module.exports = {
    create: function (req, res) {
        if (req.session.user) {
            kedai_Profile.findFirst({
                where: {
                    name: req.params.kedaiName,
                }
            }).then(Kedai => {
                ulasan.upsert({
                    where: {
                        userId_produkId_produkKedaiId: {
                            userId: req.session.user.Id,
                            produkId: parseInt(req.params.produkId),
                            produkKedaiId: Kedai.Id
                        }
                    },
                    update: {
                        rating: parseInt(req.body.rating),
                        comment: req.body.comment
                    },
                    create: {
                        user: {
                            connect: {
                                Id: req.session.user.Id
                            }
                        },
                        produk: {
                            connect: {
                                Id_kedaiId: {
                                    Id: parseInt(req.params.produkId),
                                    kedaiId: Kedai.Id
                                }
                            }
                        },
                        rating: parseFloat(req.body.rating),
                        comment: req.body.comment
                    }
                }).then(_ => {
                    return res.redirect(`/produk/${Kedai.name}/${req.params.produkId}`);
                });
            });
        } else {
            return res.redirect("/login");
        }
    }
}