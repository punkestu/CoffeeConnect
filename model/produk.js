const {produk} = require("../prisma/db");
module.exports = {
    findMy: function ({kedaiId}) {
        return produk.findMany({
            where: {
                kedaiId: kedaiId
            }
        });
    },
    findAll: function (
        include = {
            kedai: {
                include: {
                    user: true
                }
            }
        }
    ) {
        return produk.findMany({
            include,
            orderBy: [
                {
                    updatedAt: 'desc'
                }
            ]
        });
    },
    findMany: function ({kedaiId}) {
        return produk.findMany({
            where: {
                kedai: {
                    Id: kedaiId
                }
            },
            include: {
                bahan: {
                    include: {
                        satuan: true
                    }
                },
                kedai: true
            }
        });
    },
    findFirst: function ({produkId, kedaiId}) {
        return produk.findFirst({
            where: {
                AND: [
                    {Id: parseInt(produkId)},
                    {
                        kedai: {
                            name: kedaiId
                        }
                    },
                ]
            },
            include: {
                kedai: {
                    include: {
                        user: true
                    }
                }
            }
        })
    },
    create: function ({picture, name, price, description, kedaiId}) {
        return produk.create({
            data: {
                picture: picture,
                name: name,
                price: parseInt(price),
                description: description,
                kedai: {
                    connect: {
                        Id: kedaiId
                    }
                }
            }
        });
    },
    update: function ({userId, produkId, name, price, description, picture}) {
        return produk.update({
            where: {
                Id_kedaiId: {
                    Id: parseInt(produkId),
                    kedaiId: userId
                }
            },
            data: {
                name: name,
                price: parseInt(price),
                description: description,
                picture: picture
            }
        });
    },
    delete: function ({produkId, kedaiId}) {
        return produk.delete({
            where: {
                Id_kedaiId: {
                    Id: parseInt(produkId),
                    kedaiId: kedaiId
                }
            },
        })
    }
}