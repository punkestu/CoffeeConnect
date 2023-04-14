const Handlebars = require("handlebars");
module.exports = {
    ifEq: (a, b, option) => {
        if (a === b) {
            return option.fn(option.data.root);
        } else {
            return option.inverse(option.data.root);
        }
    },
    substr: (text, len) => {
        return new Handlebars.SafeString(text.substring(0,len));
    },
    eachProduk: (kedai, produks, option)=>{
        const result = produks.map(produk=>option.fn({kedai, ...produk})).join("\n");
        return new Handlebars.SafeString(result);
    }
};