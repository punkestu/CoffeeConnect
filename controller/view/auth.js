module.exports = {
    login: function (req, res) {
        const errors = req.session.error;
        const payload = req.session.payload;
        delete req.session.error;
        delete req.session.payload;
        res.render("user/login", {errors, payload, title: "Login"});
    },
    register: function (req, res) {
        const errors = req.session.error;
        const payload = req.session.payload;
        delete req.session.error;
        delete req.session.payload;
        res.render("user/register", {
            errors,
            payload,
            endpoint: "/register",
            role: "Pembeli", title: "Register Pembeli"
        });
    },
    registerpenjual: function (req, res) {
        const errors = req.session.error;
        const payload = req.session.payload;
        delete req.session.error;
        delete req.session.payload;
        return res.render("user/register", {
            errors,
            payload,
            endpoint: "/registerpenjual",
            role: "Penjual",
            title: "Register Penjual"
        });
    },
};