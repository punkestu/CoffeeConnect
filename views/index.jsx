const React = require("react");
const Layout = require("./layout");

module.exports = function (props) {
    return (
        <Layout title={"CoffeeConnect"}>
            <h1 className={["text-red-900", "font-bold"].join(" ")}>Welcome to CoffeeConnect</h1>
        </Layout>
    );
}