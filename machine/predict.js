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
        const x = Transaksi[0];
        const y = Transaksi[1];

        const regression = new dtr();
        regression.train(x, y);

        return regression.predict(Transaksi[0]);
    });
}

module.exports = {
    predictWithId,
    predictWithData
}