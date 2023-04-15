const {user, user_Profile} = require("../prisma/db");
const {hash} = require("bcrypt");
const {sign} = require("jsonwebtoken");

const createUser = async function (data, role_name) {
    const password = await hash(data.password, process.env.SALT);
    return user
        .create({
            data: {
                full_name: data.fullname,
                username: data.username,
                email: data.email,
                password,
                role: {
                    connectOrCreate: {
                        create: {
                            role_name,
                        },
                        where: {
                            role_name,
                        },
                    },
                },
            },
        })
        .then(
            (User) => {
                return sign(User, process.env.JWT_KEY);
            },
            (err) => {
                throw {code: 500, err};
            }
        );
};

module.exports = {
    web: {
        login: function (req, res) {
            if (req.session.error) {
                req.session.payload = req.body;
                return res.redirect("/login");
            }
            if (req.User) {
                delete req.session.error;
                if (req.User.profile && req.User.profile.birth_date) {
                    req.User.profile.birth_date = req.User.profile.birth_date.toISOString().split("T")[0];
                }
                req.session.user = req.User;
                return res.redirect("/");
            }
        },
        register: function (req, res) {
            if (req.session.error) {
                req.session.payload = req.body;
                return res.redirect("/register");
            }
            user.create({
                data: {
                    full_name: req.body.fullname,
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    role: {
                        connectOrCreate: {
                            create: {
                                role_name: "Pembeli"
                            },
                            where: {
                                role_name: "Pembeli"
                            }
                        }
                    }
                },
                include: {
                    role: true
                }
            }).then(User => {
                delete req.session.error;
                req.session.user = User;
                return res.redirect("/");
            }, _ => {
                return res.redirect("/register");
            })
        },
        registerpenjual: function (req, res) {
            if (req.session.error) {
                req.session.payload = req.body;
                return res.redirect("/registerpenjual");
            }
            user.create({
                data: {
                    full_name: req.body.fullname,
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    role: {
                        connectOrCreate: {
                            create: {
                                role_name: "Penjual"
                            },
                            where: {
                                role_name: "Penjual"
                            }
                        }
                    }
                },
                include: {
                    role: true
                }
            }).then(User => {
                delete req.session.error;
                req.session.user = User;
                return res.redirect("/");
            }, _ => {
                return res.redirect("/registerpenjual");
            })
        },
        postprofile: function (req, res) {
            if (req.session.error) {
                req.session.payload = req.body;
                return res.redirect(`/editProfile`);
            }
            user_Profile.upsert({
                where: {
                    Id: req.session.user.Id
                },
                update: {
                    address: req.body.address,
                    birth_date: new Date(req.body.birthdate),
                    phone: req.body.phone,
                    bio: req.body.bio
                },
                create: {
                    user: {
                        connect: {
                            Id: req.session.user.Id
                        }
                    },
                    address: req.body.address,
                    birth_date: new Date(req.body.birthdate),
                    phone: req.body.phone,
                    bio: req.body.bio
                }
            }).then(Profile => {
                if(Profile.birth_date){
                    Profile.birth_date = Profile.birth_date.toISOString().split("T")[0];
                }
                req.session.user.profile = Profile;
                res.redirect(`/p/${req.session.user.username}`);
            })
        }
    },
    api: {
        login: async function (req, res) {
            try {
                if (req.User) {
                    const token = sign(req.User, process.env.JWT_KEY);
                    res.status(200).send({data: {token}});
                } else {
                    res.status(400).send({errors: "butuh data user"});
                }
            } catch (e) {
                res.status(500).send({errors: e});
            }
        },
        register: {
            pembeli: async function (req, res) {
                try {
                    createUser(req.body, "Pembeli")
                        .then((token) => res.send({data: {token}}))
                        .catch((err) => res.status(err.code).send({errors: err.err}));
                } catch (e) {
                    res.status(500).send({errors: e});
                }
            },
            kedai: async function (req, res) {
                try {
                    createUser(req.body, "Penjual")
                        .then((token) => res.send({data: {token}}))
                        .catch((err) => res.status(err.code).send({errors: err.err}));
                } catch (e) {
                    res.status(500).send({errors: e});
                }
            },
        },
    }
};
