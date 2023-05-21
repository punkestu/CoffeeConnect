const {user_Profile} = require("../prisma/db");

module.exports = {
    upsert: function({userId, address, birthDate, phone, bio, fullName}){
        return user_Profile.upsert({
            where: {
                Id: userId
            },
            update: {
                address: address,
                birth_date: new Date(birthDate),
                phone: phone,
                bio: bio,
                user: {
                    update: {
                        full_name: fullName
                    }
                }
            },
            create: {
                user: {
                    connect: {
                        Id: userId
                    }
                },
                address: address,
                birth_date: new Date(birthDate),
                phone: phone,
                bio: bio
            }
        });
    }
}