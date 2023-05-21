const bahanM = require("../../model/bahan");
module.exports = {
    create: function (req, res) {
        bahanM.create({
            produkId: req.body.menu,
            kedaiId: req.session.user.Id,
            nama: req.body.nama,
            qty: req.body.qty,
            satuanId: req.body.satuan,
            harga: req.body.harga,
            per: req.body.per
        }).then(Bahan=>{
            return res.redirect("/");
        });
    },
    edit: function(req,res){
        bahanM.update({
            bahanId: req.params.bahanId,
            nama: req.body.nama,
            harga: req.body.harga,
            qty: req.body.qty,
            per: req.body.per,
            satuanId: req.body.satuan
        }).then(Bahan=>{
            console.log(Bahan);
            return res.redirect("/bahan");
        });
    }
};