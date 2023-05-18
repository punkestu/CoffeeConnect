const {satuan} = require("../../prisma/db");
const produkM = require("../../model/produk");
const bahanM = require("../../model/bahan");
module.exports = {
    listbahan: function (req, res) {
        produkM.findMany({
            kedaiId: req.session.user.Id
        }).then(Produk => {
            return res.render("bahanproduk/index", {
                useHeader: true,
                user: req.session.user,
                kedai: req.session.user.Kedai_Profile,
                produk: Produk
            });
        });
    },
    formbahan: function (req, res) {
        produkM.findMany({
            kedaiId: req.session.user.Id
        }).then(async Produk => {
            const Satuan = await satuan.findMany({});
            return res.render("bahanproduk/formbahan", {
                useHeader: true,
                user: req.session.user,
                kedai: req.session.user.Kedai_Profile,
                produk: Produk,
                satuan: Satuan
            });
        });
    },
    formeditbahan: function (req, res) {
        bahanM.findFirst({
            bahanId: req.params.bahanId
        }).then(async Bahan => {
            const Satuan = await satuan.findMany({});
            return res.render("bahanproduk/formeditbahan", {
                useHeader: true,
                user: req.session.user,
                kedai: req.session.user.Kedai_Profile,
                bahan: Bahan,
                satuan: Satuan
            });
        });
    },
}