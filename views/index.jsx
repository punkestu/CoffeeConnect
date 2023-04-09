const React = require("react");
const Layout = require("./layout");

module.exports = function ({user, kedai}) {
    return (
        <Layout title={" | Home"}>
            <h1>Hello world</h1>
            <div className="flex gap-5">
                {!user ? (
                    <>
                        <a href="/login">Login</a>
                        <a href="/register">Register</a>
                        <a href="/registerpenjual">Register Penjual</a>
                    </>
                ) : (
                    <>
                        {!kedai && user.role.role_name === "Penjual" &&
                            <a href="/registerkedai">Profile kedai</a>
                        }
                        <a href={"/logout"}>Logout</a>
                    </>
                )}
            </div>
        </Layout>
    );
}