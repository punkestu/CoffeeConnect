const router = require("express").Router();
const transaksiC = require("../../controller/logic/transaksi");
const transaksiV = require("../../controller/view/transaksi");
const {isAuth, isPremium} = require("../../middleware/auth");
const multer = require("multer");

const upload = multer({ dest: 'tmp/csv/' });

router.get("/transaksi/tambah", isAuth, transaksiV.kasir);
router.post("/transaksi/tambah", isAuth, transaksiC.create);
router.get("/transaksi", isAuth, transaksiV.rekap);
router.post("/transaksi", isAuth, upload.single("sheet"), transaksiC.export);
router.get("/prediksi", isAuth, isPremium, transaksiV.prediksi);
router.get("/export", isAuth, transaksiV.export);
router.post("/export", isAuth, transaksiC.export);

module.exports = router;