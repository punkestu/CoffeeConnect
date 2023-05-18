const {bahan} = require("../prisma/db");

module.exports = {
    create: function (req, res) {
        bahan.create({
            data: {
                produk:{
                    connect:{
                        Id_kedaiId:{
                            Id: parseInt(req.body.menu),
                            kedaiId: req.session.user.Id
                        }
                    }
                },
                nama: req.body.bahan,
                qty: parseFloat(req.body.qty),
                satuan: {
                    connect: {
                        Id: parseInt(req.body.satuan)
                    }
                },
                harga: parseInt(req.body.harga),
                per: parseFloat(req.body.per)
            }
        }).then(Bahan=>{
            return res.redirect("/");
        });
    },
    edit: function(req,res){
        bahan.update({
            where:{
                Id: parseInt(req.params.bahanId)
            },
            data: {
                nama: req.body.nama,
                harga: parseInt(req.body.harga),
                qty: parseFloat(req.body.qty),
                per: parseInt(req.body.per),
                satuan: {
                    connect:{
                        Id: parseInt(req.body.satuan)
                    }
                },
            }
        }).then(Bahan=>{
           return res.redirect("/bahan");
        });
    }
};