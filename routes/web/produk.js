const router = require("express").Router();
const produkMid = require("../../middleware/produk");
const produkC = require("../../controller/logic/produk");
const produkV = require("../../controller/view/produk");
const {isAuth} = require("../../middleware/auth");

router.get("/", produkV.timeline);
router.post("/produk", isAuth, produkMid.save.picture, produkC.create);
router.get("/produk/:kedaiId/:produkId", produkV.detailproduk);
router.post("/produk/:produkId", isAuth, produkMid.update.picture, produkC.update);
router.get("/editproduk/:produkId", isAuth, produkV.formeditproduk);
router.get("/delete/:kedaiName/:produkId", isAuth, produkC.delete);
router.get("/formproduk", isAuth, produkV.formproduk);

module.exports = router;