const userM = require("../../model/user");

module.exports = {
    userprofile: function (req, res) {
        userM.findFirst({
            userName: req.params.username
        }).then(User => {
            req.session.back = req.originalUrl;
            res.render("user/profile", {
                useHeader: true,
                profile: User,
                user: req.session.user,
                title: User.username
            });
        })
    },
    edituserprofile: function (req, res) {
        const errors = req.session.error;
        const payload = req.session.payload;
        delete req.session.error;
        delete req.session.payload;
        req.session.back = req.originalUrl;
        res.render("user/editprofile", {
            useHeader: true,
            user: req.session.user,
            errors,
            payload,
            title: "Edit Profile User"
        });
    }
}