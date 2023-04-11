const React = require("react");
const Layout = require("../layout");

module.exports = function ({errors, payload, endpoint, role}) {
    return (<Layout title={"Register"}>
        <div>
            <h1 className={"text-center my-3"}>Register {role || "Customer"}</h1>
            <form action={endpoint} method={"POST"} className={"flex flex-col items-center gap-2 my-2"}>
                <input
                    type="text"
                    name="fullname"
                    id="fullname"
                    className="input-type"
                    placeholder="Fullname"
                    defaultValue={payload && payload.fullname}
                />
                <p className={"error-msg"}>{errors && errors.fullname && errors.fullname.msg}</p>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className="input-type"
                    placeholder="Email"
                    defaultValue={payload && payload.email}
                />
                <p className={"error-msg"}>{errors && errors.email && errors.email.msg}</p>
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
                    placeholder="Password"
                />
                <p className={"error-msg"}>{errors && errors.password && errors.password.msg}</p>
                <button type="submit" className={"btn btn-primary"}>Daftar</button>
            </form>
        </div>
    </Layout>);
}