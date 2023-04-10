const React = require("react");
const Layout = require("../layout");

module.exports = function ({errors, payload}) {
    return (
        <Layout title={"Login"}>
        <div>
            <h1 className={"text-center my-3"}>Login</h1>
            <form action={"/login"} method={"POST"} className={"flex flex-col items-center gap-2 my-2"}>
                <input
                    type="text"
                    name="username"
                    id="username"
                    className="input-type"
                    placeholder="Username"
                    defaultValue={payload && payload.username}
                />
                <p className={"error-msg"}>{errors && errors.username && errors.username.msg}</p>
                <input
                    type="password"
                    name="password"
                    id="password"
                    className="input-type"
                    placeholder="Password"/>
                <p className={"error-msg"}>{errors && errors.password && errors.password.msg}</p>
                <button type="submit" className={"border btn btn-primary"}>Masuk</button>
            </form>
        </div>
        </Layout>
    );
}