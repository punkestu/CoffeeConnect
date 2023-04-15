const {kedai_Profile} = require("../prisma/db");

module.exports = {
    web: {
        postkedai: function (req, res) {
            if (req.session.user) {
                kedai_Profile.upsert({
                    where: {
                        Id: req.session.user.Id
                    },
                    create: {
                        name: req.body.name,
                        address: req.body.address,
                        description: req.body.description,
                        phone: req.body.phone,
                        user: {
                            connect: {
                                Id: req.session.user.Id
                            }
                        }
                    },
                    update: {
                        name: req.body.name,
                        address: req.body.address,
                        description: req.body.description,
                        phone: req.body.phone,
                    }
                }).then(kProfile => {
                    req.session.user.Kedai_Profile = kProfile;
                    res.redirect(`/k/${kProfile.name}`);
                }, _ => {
                    res.redirect("/editkedai");
                });
            } else {
                res.redirect("/login");
            }
        }
    },
    api: {

        getMy: async function (req, res) {
            res.status(200).send({data: {Kedai: req.Kedai}});
        },
        create: async function (req, res) {
            try {
                kedai_Profile.create({
                    data: {
                        user: {
                            connect: {
                                Id: req.User.Id
                            }
                        },
                        name: req.body.name,
                        description: req.body.description,
                        address: req.body.address,
                        phone: req.body.phone,
                    }
                }).then(
                    (Kedai) => {
                        delete Kedai.Id;
                        res.status(200).send({data: {Kedai}});
                    },
                    (err) => {
                        res.status(500).send({errors: err});
                    }
                )
            } catch (e) {
                res.status(500).send({errors: e});
            }
        }
    }
};