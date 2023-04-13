module.exports = {
    ifEq: (a, b, option) => {
        if (a === b) {
            return option.fn(this);
        } else {
            return option.inverse(this);
        }
    }
};