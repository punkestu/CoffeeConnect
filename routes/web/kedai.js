const router = require("express").Router();
const kedaiV = require("../../controller/view/kedai");
const kedaiC = require("../../controller/logic/kedai");
const {
    struct,isAuth
} = require("../../middleware/auth");
const produkMid = require("../../middleware/produk");

router.get("/k/:namakedai", kedaiV.kedaiprofile);
router.post("/k", isAuth, produkMid.save.picture,
    struct.address, struct.phone,
    kedaiC.upsert
);
router.get("/editkedai", isAuth,kedaiV.editkedaiprofile);

module.exports = router;