const router = require("express").Router();
const pictureM = require("../../middleware/picture");
const produkC = require("../../controller/logic/produk");
const ulasanC = require("../../controller/logic/ulasan");
const produkV = require("../../controller/view/produk");
const {isAuth} = require("../../middleware/auth");

router.get("/", produkV.timeline);
router.post("/produk", isAuth, pictureM.save.picture, produkC.create);
router.get("/produk/:kedaiId/:produkId", produkV.detailproduk);
router.post("/produk/:produkId", isAuth, pictureM.update.picture, produkC.update);
router.get("/editproduk/:produkId", isAuth, produkV.editproduk);
router.get("/delete/:kedaiName/:produkId", isAuth, produkC.delete);
router.get("/produk/tambah", isAuth, produkV.tambahproduk);

router.post("/ulasan/:kedaiName/:produkId", isAuth, ulasanC.create);

module.exports = router;