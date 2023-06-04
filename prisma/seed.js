const {satuan} = require("./db");

function seeder() {
    satuan.createMany({
        data: [
            {nama: "Kg"},
            {nama: "Liter"},
            {nama: "Gram"},
            {nama: "CC"},
            {nama: "ml"}
        ]
    }).then(Satuan => {
        console.log(Satuan);
    });
}

module.exports = seeder;