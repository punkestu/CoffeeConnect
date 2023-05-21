const router = require("express").Router();

const bahanV = require("../../controller/view/bahan");
const bahanC = require("../../controller/logic/bahan");
const {isAuth} = require("../../middleware/auth");

router.use("/bahan", isAuth);
router.get("/bahan", bahanV.listbahan);
router.get("/bahan/tambah", bahanV.formbahan);
router.post("/bahan/tambah", bahanC.create);
router.get("/bahan/edit/:bahanId", bahanV.formeditbahan);
router.post("/bahan/edit/:bahanId", bahanC.edit);

module.exports = router;