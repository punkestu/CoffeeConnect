const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "storage");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        req.body.picture = file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({storage});

const {produk} = require("../prisma/db");

module.exports = {
    save: {
        picture: upload.single("picture")
    },
    update: {
        picture: [upload.single("picture"), (req, res, next) => {
            if (req.session.user) {
                produk.findFirst({
                    where: {
                        Id: parseInt(req.params.produkId),
                        kedaiId: req.session.user.Id
                    }
                }).then(Produk => {
                    if (Produk) {
                        req.Produk = Produk;
                        next();
                    } else {
                        res.render("error/400", {
                            useHeader: true,
                            user: req.session.user,
                            kedai: req.session.user && req.session.user.Kedai_Profile
                        });
                    }
                });
            } else {
                return res.redirect("/login");
            }
        }]
    }
}