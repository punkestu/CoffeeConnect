const React = require("react");
const Layout = require("./layout");

module.exports = function ({errors}) {
    return (
        <Layout title={" | Register"}>
            <div>
                <form action={"/register"} method={"POST"}>
                    <input
                        type="text"
                        name="fullname"
                        id="fullname"
                        className="border"
                        placeholder="Fullname"
                    />
                    <p>{errors && errors.fullname && errors.fullname.msg}</p>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="border"
                        placeholder="Email"
                    />
                    <p>{errors && errors.email && errors.email.msg}</p>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        className="border"
                        placeholder="Username"
                    />
                    <p>{errors && errors.username && errors.username.msg}</p>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className="border"
                        placeholder="Password"
                    />
                    <p>{errors && errors.password && errors.password.msg}</p>
                    <button type="submit">Daftar</button>
                </form>
            </div>
        </Layout>
    );
}