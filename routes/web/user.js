const router = require("express").Router();

const userV = require("../../controller/view/user");
const userC = require("../../controller/logic/user");
const {struct, required, isAuth} = require("../../middleware/auth");
const errorHandle = require("../../middleware/errorHandle");

router.get("/p/:username", userV.userprofile);
router.post("/p",
    isAuth,
    struct.birthdate, struct.address, struct.phone,
    errorHandle,
    userC.upsert
);
router.get("/editprofile", isAuth, required.fullname, errorHandle, userV.edituserprofile);

module.exports = router;