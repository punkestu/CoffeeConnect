const Handlebars = require("handlebars");
module.exports = {
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
        return new Handlebars.SafeString(text.substring(0,len));
    },
    eachProduk: (context, produks, option)=>{
        const result = produks.map(produk=>option.fn({...context, produk})).join("\n");
        return new Handlebars.SafeString(result);
    }
};