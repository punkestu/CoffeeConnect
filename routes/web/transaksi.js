const router = require("express").Router();
const transaksiC = require("../../controller/logic/transaksi");
const transaksiV = require("../../controller/view/transaksi");
const {isAuth} = require("../../middleware/auth");
const multer = require("multer");

const upload = multer({ dest: 'tmp/csv/' });

router.get("/transaksi/tambah", isAuth, transaksiV.kasir);
router.post("/transaksi/tambah", isAuth, transaksiC.create);
router.get("/transaksi", isAuth, transaksiV.rekap);
router.post("/transaksi", isAuth, upload.single("sheet"), transaksiC.export);
router.get("/prediksi", isAuth, transaksiV.prediksi);

module.exports = router;