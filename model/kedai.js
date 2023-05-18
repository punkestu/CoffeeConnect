const {kedai_Profile} = require("../prisma/db");

module.exports = {
    findFirst: function({namaKedai}){
        return kedai_Profile.findFirst({
            where: {
                name: namaKedai
            },
            include: {
                user: true,
                Produk: {
                    include: {
                        kedai: true
                    }
                }
            }
        });
    },
    upsert: function({userId, name, address, description, phone}){
        return kedai_Profile.upsert({
                where: {
                    Id: userId
                },
                create: {
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
                    name: name,
                    address: address,
                    description: description,
                    phone: phone,
                }
            })
    }
}