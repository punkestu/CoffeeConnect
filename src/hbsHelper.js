const Handlebars = require("handlebars");
module.exports = {
    currency: (num) => {
        return new Handlebars.SafeString(new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(num));
    },
    eachFrom: (items, from, option) => {
        return items.slice(from).map((item) => option.fn(item)).join("\n");
    },
    for: (context, count, option) => {
        const res = [];
        for (let i = 0; i < count; i++) {
            res.push(option.fn({...context, count: i}));
        }
        return res.join("\n");
    },
    cmp: (context, a, op, b, option) => {
        switch (op) {
            case "=":
                if (a === b) {
                    return option.fn(context);
                } else {
                    return option.inverse(context);
                }
            case ">":
                if (a > b) {
                    return option.fn(context);
                } else {
                    return option.inverse(context);
                }
            case "<":
                if (a < b) {
                    return option.fn(context);
                } else {
                    return option.inverse(context);
                }
            case "<=":
                if (a <= b) {
                    return option.fn(context);
                } else {
                    return option.inverse(context);
                }
            case ">=":
                if (a >= b) {
                    return option.fn(context);
                } else {
                    return option.inverse(context);
                }
            case "!=":
                if (a !== b) {
                    return option.fn(context);
                } else {
                    return option.inverse(context);
                }
        }
    },
    ifEq: (context, a, b, option) => {
        if (a === b) {
            return option.fn(context);
        } else {
            return option.inverse(context);
        }
    },
    dateformat: (timestamp) => {
        return new Handlebars.SafeString(new Date(timestamp).toLocaleString());
    },
    substr: (text, len) => {
        return new Handlebars.SafeString(text.substring(0, len));
    },
    eachProduk: (context, produks, option) => {
        const result = produks.map(produk => option.fn({...context, produk})).join("\n");
        return new Handlebars.SafeString(result);
    },
    currency: (nom) => {
        return new Handlebars.SafeString(new Intl.NumberFormat("id-ID", {currency: "IDR", style:"currency"}).format(nom));
    }
};