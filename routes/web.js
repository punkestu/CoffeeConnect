const router = require("express").Router();

const produkR = require("./web/produk");
const authR = require("./web/auth");
const userR = require("./web/user");
const kedaiR = require("./web/kedai");
const bahanR = require("./web/bahan");
const transaksiR = require("./web/transaksi");

router.use(produkR);
router.use(authR);
router.use(userR);
router.use(kedaiR);
router.use(bahanR);
router.use(transaksiR);

const errorV = require("../controller/view/error");
router.use(errorV.notfound);

module.exports = router;