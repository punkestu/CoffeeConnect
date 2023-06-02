const {kedai_Profile, ulasan} = require("../../prisma/db");
module.exports = {
    create: function (req, res) {
        if (req.session.user) {
            kedai_Profile.findFirst({
                where: {
                    name: req.params.kedaiName,
                }
            }).then(Kedai => {
                ulasan.findFirst({
                    where: {
                        user: {
                            Id: req.session.user.Id
                        },
                        produk: {
                            Id: parseInt(req.params.produkId),
                            kedai: {
                                Id: Kedai.Id
                            }
                        }
                    }
                });
                ulasan.upsert({
                    where: {
                        AND: [
                            {
                                user: {
                                    Id: req.session.user.Id
                                }
                            }, {
                                produk: {
                                    Id: parseInt(req.params.produkId),
                                    kedai: {
                                        Id: Kedai.Id
                                    }
                                }
                            }
                        ],
                    },
                    update: {
                        rating: parseFloat(req.body.star),
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
                        rating: parseFloat(req.body.star),
                        comment: req.body.comment
                    }
                }).then(Ulasan => {
                    return res.redirect(`/produk/${Kedai.name}/${req.params.produkId}`);
                });
            });
        } else {
            return res.redirect("/login");
        }
    }
}