const router = require("express").Router();
const kedaiController = require("../controller/kedai");
const {notExist, struct, userIs} = require("../middleware/kedai");
const {isAuth} = require("../middleware/auth");

router.post("/",
    isAuth,
    [userIs.notHaveKedai],
    [struct.phone],
    [notExist.name],
    kedaiController.create
);

module.exports = router;