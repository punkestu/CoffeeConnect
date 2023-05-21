const {bahan: _bahan} = require("../prisma/db");
module.exports = {
    findFirst: function ({bahanId}) {
        return _bahan.findFirst({
            where: {
                Id: parseInt(bahanId)
            },
            include: {
                produk: true,
                satuan: true
            }
        });
    },
    create: function ({produkId, kedaiId, nama, qty, satuanId, harga, per}) {
        return _bahan.create({
            data: {
                produk: {
                    connect: {
                        Id_kedaiId: {
                            Id: parseInt(produkId),
                            kedaiId: kedaiId
                        }
                    }
                },
                nama: nama,
                qty: parseFloat(qty),
                satuan: {
                    connect: {
                        Id: parseInt(satuanId)
                    }
                },
                harga: parseInt(harga),
                per: parseFloat(per)
            }
        });
    },
    update: function({bahanId, nama, harga, qty, per, satuanId}){
        return _bahan.update({
            where:{
                Id: parseInt(bahanId)
            },
            data: {
                nama: nama,
                harga: parseInt(harga),
                qty: parseFloat(qty),
                per: parseInt(per),
                satuan: {
                    connect:{
                        Id: parseInt(satuanId)
                    }
                },
            }
        })
    }
}