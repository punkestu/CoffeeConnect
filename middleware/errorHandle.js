const {validationResult} = require("express-validator");

module.exports = function (req, _, next) {
    const Errors = validationResult(req);
    if (!Errors.isEmpty()) {
        req.session.error = Errors.mapped();
    }
    next();
};