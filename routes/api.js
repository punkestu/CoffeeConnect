const authAPI = require("../api/auth");
const kedaiAPI = require("../api/kedai");
const router = require("express").Router();

router.use("/auth", authAPI);
router.use("/kedai", kedaiAPI);

module.exports = router;