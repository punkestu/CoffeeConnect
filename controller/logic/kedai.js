const kedaiM = require("../../model/kedai");
module.exports = {
    upsert: function (req, res) {
        kedaiM.upsert({
            userId: req.session.user.Id,
            picture: req.body.picture,
            name: req.body.name,
            address: req.body.address,
            description: req.body.description,
            phone: req.body.phone
        }).then(kProfile => {
            req.session.user.Kedai_Profile = kProfile;
            res.redirect(`/k/${kProfile.name}`);
        }, _ => {
            res.redirect("/editkedai");
        });
    }
}