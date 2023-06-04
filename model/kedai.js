const {kedai_Profile} = require("../prisma/db");

module.exports = {
    findFirst: function({namaKedai}){
        return kedai_Profile.findFirst({
            where: {
                name: namaKedai
            },
            include: {
                user: true,
                produk: {
                    include: {
                        kedai: true,
                        _count: {
                            select: {
                                Ulasan: true
                            }
                        },
                    }
                }
            }
        });
    },
    upsert: function({picture, userId, name, address, description, phone}){
        return kedai_Profile.upsert({
                where: {
                    Id: userId
                },
                create: {
                    picture: picture,
                    name: name,
                    address: address,
                    description: description,
                    phone: phone,
                    user: {
                        connect: {
                            Id: userId
                        }
                    }
                },
                update: {
                    picture: picture,
                    name: name,
                    address: address,
                    description: description,
                    phone: phone,
                }
            })
    }
}