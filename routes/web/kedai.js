const router = require("express").Router();
const kedaiV = require("../../controller/view/kedai");
const kedaiC = require("../../controller/logic/kedai");
const pictureM = require("../../middleware/picture");
const {
    struct,isAuth
} = require("../../middleware/auth");

router.get("/k/:namakedai", kedaiV.kedaiprofile);
router.post("/k", isAuth, pictureM.save.picture,
    struct.address, struct.phone,
    kedaiC.upsert
);
router.get("/editkedai", isAuth,kedaiV.editkedaiprofile);

module.exports = router;