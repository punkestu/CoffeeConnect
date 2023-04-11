const React = require("react");
const Layout = require("../layout");

module.exports = function ({user, kedai, actUser, editMode}) {
    return <Layout title={editMode ? "Edit Kedai" : kedai && kedai.name}>
        {(actUser && actUser.username) === user.username && !editMode && <a href={"/editkedai"}>Edit</a>}
        <h1>{user && user.username}</h1>
        <form action="/k" method="POST" className={"flex flex-col"}>
            <input type="text" name="name" className={"input-type"} id="name" disabled={!editMode}
                   placeholder={"Kedai name"} defaultValue={kedai && kedai.name}/>
            <textarea name="description" className={"input-type"} id="description" cols="30" rows="10"
                      disabled={!editMode}
                      defaultValue={kedai && kedai.description} placeholder={"Description"}></textarea>
            <textarea name="address" className={"input-type"} id="address" cols="30" rows="10" disabled={!editMode}
                      defaultValue={kedai && kedai.address} placeholder={"Address"}></textarea>
            <input type="tel" className={"input-type"} name="phone" id="phone" disabled={!editMode}
                   placeholder={"Phone number"} defaultValue={kedai && kedai.phone}/>
            {editMode && <button className={"btn btn-primary"}>Save</button>}
        </form>
    </Layout>
}