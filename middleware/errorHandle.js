const {validationResult} = require("express-validator");
const {sign} = require("jsonwebtoken");

module.exports = {
    api: function (req, res, next) {
        const Errors = validationResult(req);
        if (Errors.isEmpty()) {
            next();
        } else {
            const errors = Errors.mapped();
            return res.status(400).send({errors});
        }
    },
    web: function (req, _, next) {
        const Errors = validationResult(req);
        if (!Errors.isEmpty()) {
            req.session.error = Errors.mapped();
        }
        next();
    },
}