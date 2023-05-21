module.exports = {
    login: function (req, res) {
        const errors = req.session.error;
        const payload = req.session.payload;
        delete req.session.error;
        delete req.session.payload;
        res.render("user/login", {
            errors,
            payload,
            noHeader: true,
            noSidebar: true,
            title: "Login"
        });
    },
    register: function (req, res) {
        const errors = req.session.error;
        const payload = req.session.payload;
        delete req.session.error;
        delete req.session.payload;
        res.render("user/register", {
            errors,
            payload,
            noHeader: true,
            noSidebar: true,
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
            noHeader: true,
            noSidebar: true,
            endpoint: "/registerpenjual",
            role: "Penjual",
            title: "Register Penjual"
        });
    },
};