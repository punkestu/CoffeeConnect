const router = require("express").Router();
const kedaiController = require("../controller/kedai");
const {notExist, struct, userIs} = require("../middleware/kedai");
const {isAuth} = require("../middleware/auth");
const {api} = require("../middleware/errorHandle");

router.post("/",
    isAuth,
    [userIs.notHaveKedai],
    [struct.phone],
    [notExist.name],
    api,
    kedaiController.api.create
);

router.get("/",
    isAuth,
    [userIs.haveKedai],
    api,
    kedaiController.api.getMy
);

module.exports = router;