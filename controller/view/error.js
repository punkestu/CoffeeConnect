module.exports = {
    notfound: function (req, res) {
        res.render("error/404", {
            user: req.session.user,
            kedai: req.session.user && req.session.user.Kedai_Profile, title: "Not Found"
        });
    }
}