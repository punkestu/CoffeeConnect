const userM = require("../../model/user");

module.exports = {
    userprofile: function (req, res) {
        userM.findFirst({
            userName: req.params.username
        }).then(User => {
            req.session.back = req.originalUrl;
            res.render("user/profile", {
                useHeader: true,
                useAction: true,
                profile: User,
                user: req.session.user,
                kedai: req.session.user && req.session.user.Kedai_Profile,
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
            useAction: true,
            user: req.session.user,
            kedai: req.session.user && req.session.user.Kedai_Profile,
            errors,
            payload,
            title: "Edit Profile User"
        });
    },
    premium: function(req,res){
        return res.render("premium/index", {
            useHeader: true,
            useAction: true,
            user: req.session.user,
            title: "Premium"
        })
    }
}