const slr = require("ml-regression-simple-linear");
const transaksiM = require("../model/transaksi");
const { DecisionTreeRegression: dtr } = require("ml-cart");

function predictWithData({data, next}){
    data = data.reduce((Ts, T) => {
        Ts = Ts ?? [];
        Ts[0] = Ts[0] ?? [];
        Ts[1] = Ts[1] ?? [];
        Ts[0].push(new Date(T.at.split("/").reverse()).getTime() / 1000);
        Ts[1].push(T.total);
        return Ts;
    }, {});
    const x = data[0];
    const y = data[1];

    const regression = new dtr();
    regression.train(x,y);

    return {line: regression.predict(x), prediction: regression.predict([next])};
}

function predictWithId({kedaiId}) {
    return transaksiM.getSince({kedaiId}).then(Transaksi => {
        Transaksi = Transaksi.reduce((Ts, T) => {
            Ts = Ts ?? [];
            Ts[0] = Ts[0] ?? [];
            Ts[1] = Ts[1] ?? [];
            Ts[0].push(new Date(T.at.split("/").reverse()).getTime() / 1000);
            Ts[1].push(T.total);
            return Ts;
        }, {});
        // Transaksi = [[],[]];
        // var val = 0.0;
        // for (let i = 0; i < 100; ++i) {
        //     Transaksi[0].push(val);
        //     Transaksi[1].push(Math.sin(Transaksi[0][i]));
        //     val += 0.01;
        // }

        console.log(Transaksi);

        const x = Transaksi[0];
        const y = Transaksi[1];

        const regression = new dtr();
        regression.train(x, y);

// regression.slope // 2
// regression.intercept // -1
// regression.coefficients // [-1, 2]

        // regression.predict(3); // 5
        // regression.computeX(3.5); // 2.25

        console.log(regression.toJSON());

        const res = regression.predict(Transaksi[0]);
        return res;
// { r: 1, r2: 1, chi2: 0, rmsd: 0 }

//         const json = regression.toJSON();
// // { name: 'simpleLinearRegression', slope: 2, intercept: -1 }
//         const loaded = SimpleLinearRegression.load(json);
//         loaded.predict(5) // 9
    });
}

module.exports = {
    predictWithId,
    predictWithData
}