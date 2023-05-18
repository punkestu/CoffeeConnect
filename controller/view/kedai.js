const kedaiM = require("../../model/kedai");
module.exports = {
    kedaiprofile: function (req, res) {
        kedaiM.findFirst({namaKedai: req.params.namakedai})
            .then(Kedai => {
                req.session.back = req.originalUrl;
                return res.render("kedai/profile", {
                    useHeader: true,
                    user: req.session.user,
                    kedai: Kedai,
                    title: Kedai.name
                });
            });
    },
    editkedaiprofile: function (req, res) {
        if (req.session.user.role.role_name === "Penjual") {
            req.session.back = req.originalUrl;
            res.render("kedai/profile", {
                useHeader: true,
                user: req.session.user,
                kedai: req.session.user.Kedai_Profile,
                editMode: true, title: "Edit Profile Kedai"
            });
        } else {
            res.redirect("/");
        }
    }
}