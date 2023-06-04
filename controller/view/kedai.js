const kedaiM = require("../../model/kedai");
const {produk, ulasan} = require("../../prisma/db");
module.exports = {
    kedaiprofile: function (req, res) {
        kedaiM.findFirst({namaKedai: req.params.namakedai})
            .then(async Kedai => {
                Kedai.rating = await ulasan.aggregate({
                    _avg: {
                        rating: true
                    },
                    where: {
                        produkKedaiId: Kedai.Id
                    }
                });
                const Ratings = await ulasan.groupBy({
                    by: ["produkId"],
                    where: {
                        produkKedaiId: Kedai.Id
                    },
                    _avg: {
                        rating: true
                    }
                });
                Kedai.produk = Kedai.produk.map(p=>{
                    return {
                        ...p,
                        rating: Ratings.find((r)=>{
                            return r.produkId === p.Id;
                        })
                    }
                })
                req.session.back = req.originalUrl;
                return res.render("kedai/profile", {
                    user: req.session.user,
                    kedai: Kedai,
                    title: Kedai.name,
                    useAction: true
                });
            });
    },
    editkedaiprofile: function (req, res) {
        if (req.session.user.role.role_name === "Penjual") {
            req.session.back = req.originalUrl;
            res.render("kedai/editprofile", {
                useAction: true,
                user: req.session.user,
                kedai: req.session.user.Kedai_Profile,
                title: "Edit Profile Kedai"
            });
        } else {
            res.redirect("/");
        }
    }
}