const React = require("react");
const Layout = require("../layout");

module.exports = function ({profile, user, editMode}) {
    return <Layout title={profile.username}>
        {profile.username === user.username && !editMode && <a href={"/editprofile"}>Edit</a>}
        <h1>{profile.username}</h1>
        <h2>{profile.full_name}</h2>
        <h2>{profile.email}</h2>
        <form method={"POST"} action={`/p/${profile.username}`} className={"flex flex-col"}>
            <input type="date" className={"input-type"} name="birthdate" id="birthdate" disabled={!editMode} defaultValue={profile.profile.birth_date.toISOString().split("T")[0]}/>
            <textarea name="address" className={"input-type"} id="address" cols="30" rows="10" disabled={!editMode} defaultValue={profile.profile.address} placeholder={"Address"}></textarea>
            <input type="tel" className={"input-type"} name="phone" id="phone" disabled={!editMode} placeholder={"Phone number"} defaultValue={profile.profile.phone}/>
            {editMode && <button className={"btn btn-primary"}>Save</button>}
        </form>
    </Layout>
}