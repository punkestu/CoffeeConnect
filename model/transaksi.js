const {transaksi, $queryRaw} = require("../prisma/db");
const prisma = require("../prisma/db");

module.exports = {
    create: function ({at = undefined, kedaiId, dataTransaksi}) {
        return transaksi.create({
            data: {
                at,
                kedai: {
                    connect: {
                        Id: kedaiId
                    }
                },
                TransaksiDetail: {
                    create: dataTransaksi.map(d => {
                        return {
                            produkId: parseInt(d.produkId),
                            produkKedaiId: kedaiId,
                            qty: parseInt(d.qty),
                        }
                    })
                }
            }
        });
    },
    findMy: function ({kedaiId, from, to}) {
        if (from) {
            from = new Date(from);
            to = new Date(to);
            return prisma.$queryRaw`SELECT t.at, (SELECT name FROM "Produk" WHERE "Id"=p."Id"), CAST(SUM(td.qty) as INTEGER) as qty, CAST(SUM(td.qty*p.price) as INTEGER) as total FROM "TransaksiDetail" td JOIN "Transaksi" t ON t."Id"=td."transaksiId" JOIN "Produk" p ON p."Id"=td."produkId" WHERE t."kedai_ProfileId"=${kedaiId} AND (t.at BETWEEN ${from} AND ${to}) GROUP BY t.at, p."Id" ORDER BY t.at`;
        } else {
            return prisma.$queryRaw`SELECT t.at, (SELECT name FROM "Produk" WHERE "Id"=p."Id"), CAST(SUM(td.qty) as INTEGER) as qty, CAST(SUM(td.qty*p.price) as INTEGER) as total FROM "TransaksiDetail" td JOIN "Transaksi" t ON t."Id"=td."transaksiId" JOIN "Produk" p ON p."Id"=td."produkId" WHERE t."kedai_ProfileId"=${kedaiId} GROUP BY t.at, p."Id" ORDER BY t.at`;
        }
    },
    getSince: function ({kedaiId, since}) {
        if (since) {
            since = new Date(since);
        } else {
            since = new Date();
            since.setFullYear(since.getFullYear() - 1);
        }
        return prisma.$queryRaw`SELECT CAST(SUM(td.qty*p.price) as INTEGER) as total, TO_CHAR(t.at, 'mm/yyyy') as at, TO_CHAR(t.at, 'yyyy') FROM "TransaksiDetail" td JOIN "Transaksi" t ON t."Id"=td."transaksiId" JOIN "Produk" p ON p."Id"=td."produkId" WHERE t."kedai_ProfileId"=${kedaiId} AND t.at >= ${since} GROUP BY 2, 3 ORDER BY 3,2`;
    },
    getProduk: function({kedaiId, produkId}){
        const since = new Date();
        since.setFullYear(since.getFullYear() - 1);
        produkId = parseInt(produkId);
        return prisma.$queryRaw`SELECT CAST(SUM(td.qty) as INTEGER) as total, TO_CHAR(t.at, 'mm/yyyy') as at, TO_CHAR(t.at, 'yyyy') FROM "TransaksiDetail" td JOIN "Transaksi" t ON t."Id"=td."transaksiId" WHERE t."kedai_ProfileId"=${kedaiId} AND t.at >= ${since} AND td."produkId"=${produkId} GROUP BY 2, 3 ORDER BY 3,2`
    }
};