const {satuan} = require("./db");

satuan.createMany({
    data: [
        {nama: "Kg"},
        {nama: "Liter"},
        {nama: "Gram"},
        {nama: "CC"},
        {nama: "ml"}
    ]
}).then(Satuan=>{
    console.log(Satuan);
});