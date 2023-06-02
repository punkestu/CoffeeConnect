const {createReadStream} = require("fs");
const {parse} = require("csv");
transaksiM = require("../../model/transaksi");

module.exports = {
    create: function (req, res) {
        transaksiM.create({
            at: req.body.at,
            kedaiId: req.session.user.Id,
            dataTransaksi: req.body.dTransaksi
        }).then(_ => {
            return res.redirect("/");
        });
    },
    export: function (req, res) {
        createReadStream(req.file.destination + req.file.filename)
            .pipe(parse({delimiter: ",", from_line: 2}))
            .on("data", function (row) {
                transaksiM.create({
                    at: new Date(row[0].split("/").reverse()),
                    kedaiId: req.session.user.Id,
                    dataTransaksi: [
                        {
                            produkId: parseInt(row[1]),
                            qty: parseInt(row[2])
                        }
                    ]
                }).then(Transaksi=>{
                    console.log(Transaksi);
                });
            })
        res.sendStatus(200);
    }
};