module.exports = {
    ifEq: (a, b, option) => {
        if (a === b) {
            return option.fn(option.data.root);
        } else {
            return option.inverse(option.data.root);
        }
    }
};