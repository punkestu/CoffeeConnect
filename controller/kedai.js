const {kedai_Profile} = require("../prisma/db");
const {sign} = require("jsonwebtoken");

module.exports = {
    create: async function (req, res) {
        try{
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
                    res.status(200).send({ data: { Kedai } });
                },
                (err) => {
                    console.log("error");
                    res.status(500).send({ errors: err });
                }
            )
        }catch (e) {
            res.status(500).send({ errors: e });
        }
    }
};