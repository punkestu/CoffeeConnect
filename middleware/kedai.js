const {body} = require("express-validator");
const {kedai_Profile} = require("../prisma/db");

module.exports = {
    userIs: {
        notHaveKedai: async function (req, res, next) {
            try {
                const Kedai = await kedai_Profile.findFirst({
                    where: {
                        user: {
                            Id: req.User.Id
                        }
                    }
                });
                if (Kedai) {
                    return res.status(409).send({errors: {msg: "Kedai sudah dibuat"}});
                }
                next();
            } catch (e) {
                return res.status(500).send({errors: e});
            }
        },
        haveKedai: async function (req, res, next) {
            try {
                req.Kedai = await kedai_Profile.findFirst({
                    where: {
                        user: {
                            Id: req.User.Id
                        }
                    }
                });
                if (!req.Kedai) {
                    return res.status(404).send({errors: {msg: "Kedai tidak ada"}});
                }
                next();
            } catch (e) {
                return res.status(500).send({errors: e});
            }
        }
    },
    struct: {
        phone: body("phone").isMobilePhone("id-ID").withMessage("Nomor telepon tidak valid")
    },
    notExist: {
        name: body("name").custom(async (name) => {
            const Name = await kedai_Profile.findFirst({
                where: {
                    name
                }
            });
            if (Name) {
                throw new Error("Nama kedai sudah terdaftar");
            }
        }),
    }
}