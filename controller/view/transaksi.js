const transaksiM = require("../../model/transaksi");
const produkM = require("../../model/produk");
const {predictWithData} = require("../../machine/predict");

module.exports = {
    kasir: function (req, res) {
        produkM.findMy({kedaiId: req.session.user.Id}).then(Produks => {
            console.log({Produks, kedaiId: req.session.user.Id});
            return res.render("transaksi/kasir", {
                user: req.session.user,
                useAction: true,
                kedai: req.session.user && req.session.user.Kedai_Profile,
                produks: Produks
            });
        });
    },
    rekap: function (req, res) {
        transaksiM.findMy({
            kedaiId: req.session.user.Id,
            from: req.query.from,
            to: req.query.to
        }).then(async Transaksi => {
            Transaksi = Transaksi.reduce((res, r) => {
                const at = r.at.toISOString();
                res[at] = res[at] ?? [];
                res[at].push(r);
                return res;
            }, {});
            Transaksi = Object.keys(Transaksi).map((key) => {
                Total = Transaksi[key].reduce((res, r) => {
                    return res + r.total;
                }, 0);
                return {
                    at: new Date(key).toISOString().split("T")[0].split("-").reverse().join("/"),
                    data: Transaksi[key],
                    total: Total
                }
            });
            const oneYearFromNow = new Date();
            oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() - 1);
            const graph = await transaksiM.getSince({
                kedaiId: req.session.user.Id,
                since: oneYearFromNow.toISOString()
            });
            var prediction = [];
            if (graph.length > 0) {
                const nextMonth = new Date();
                nextMonth.setMonth(nextMonth.getMonth() + 1);
                prediction = predictWithData({data: graph, next: nextMonth.getTime() / 1000});
            }
            return res.render("transaksi/rekap",
                {
                    user: req.session.user,
                    useAction: true,
                    kedai: req.session.user && req.session.user.Kedai_Profile,
                    transaksis: Transaksi,
                    graph,
                    prediction_line: prediction.line,
                    prediction: new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR'
                    }).format(prediction.prediction),
                }
            );
        });
    },
    prediksi: async function (req, res) {
        const produks = await produkM.findMy({kedaiId: req.session.user.Id});
        if (req.query.produkId) {
            transaksiM.getProduk({kedaiId: req.session.user.Id, produkId: req.query.produkId}).then(Transaksis => {
                const nextMonth = new Date();
                nextMonth.setMonth(nextMonth.getMonth() + 1);
                const prediction = predictWithData({data: Transaksis, next: nextMonth.getTime() / 1000});
                return res.render("transaksi/prediksi", {
                    user: req.session.user,
                    useAction: true,
                    kedai: req.session.user && req.session.user.Kedai_Profile,
                    graph: Transaksis,
                    prediction_line: prediction.line,
                    prediction: prediction.prediction,
                    produks,
                    pos: parseInt(req.query.produkId)
                })
            });
        } else {
            return res.render("transaksi/prediksi", {
                user: req.session.user,
                useAction: true,
                kedai: req.session.user && req.session.user.Kedai_Profile,
                produks,
                pos: parseInt(req.query.produkId)
            });
        }
    },
    export: function (req, res) {
        res.render("transaksi/export", {
            user: req.session.user,
            useAction: true,
            kedai: req.session.user && req.session.user.Kedai_Profile,
        });
    }
};