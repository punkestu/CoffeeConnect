const userProfileM = require("../../model/userProfile");
const {user} = require("../../prisma/db");
module.exports = {
    upsert: function (req, res) {
        if (req.session.error) {
            req.session.payload = req.body;
            return res.redirect(`/editProfile`);
        }
        userProfileM.upsert({
            userId: req.session.user.Id,
            phone: req.body.phone,
            address: req.body.address,
            birthDate: req.body.birthdate,
            bio: req.body.bio,
            fullName: req.body.full_name
        }).then(Profile => {
            if (Profile.birth_date) {
                Profile.birth_date = Profile.birth_date.toISOString().split("T")[0];
            }
            req.session.user.profile = Profile;
            res.redirect(`/p/${req.session.user.username}`);
        })
    },
    premium: function(req,res){
        user.update({
            where: {
                Id: req.session.user.Id
            },
            data: {
                premium: true,
                premium_at: new Date()
            }
        }).then(User=>{
            req.session.user.premium = User.premium;
            return res.redirect("/");
        })
    }
}