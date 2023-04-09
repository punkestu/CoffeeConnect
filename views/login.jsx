const React = require("react");
const Layout = require("./layout");

module.exports = function ({errors}) {
    return (
        <Layout title={" | Login"}>
        <div>
            <form action={"/login"} method={"POST"}>
                <input
                    type="text"
                    name="username"
                    id="username"
                    className="border"
                    placeholder="Username"/>
                <p>{errors && errors.username && errors.username.msg}</p>
                <input
                    type="password"
                    name="password"
                    id="password"
                    className="border"
                    placeholder="Password"/>
                <p>{errors && errors.password && errors.password.msg}</p>
                <button type="submit">Masuk</button>
            </form>
        </div>
        </Layout>
    );
}