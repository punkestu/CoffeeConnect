const {hash} = require("bcrypt");
const {user} = require("../prisma/db");

module.exports = {
    findFirst: function({userName}){
        return user.findFirst({
            where: {
                username: userName
            },
            include: {
                profile: true
            }
        });
    },
    create: async function ({fullname, username, email, password, role_name}) {
        return user
            .create({
                data: {
                    full_name: fullname,
                    username: username,
                    email: email,
                    password: password,
                    role: {
                        connectOrCreate: {
                            create: {
                                role_name,
                            },
                            where: {
                                role_name,
                            },
                        },
                    },
                },
                include: {
                    role: true
                }
            });
    }
}