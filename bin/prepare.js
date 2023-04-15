const fs = require('fs');
const os = require("os");
const prompt = require('prompt-sync')({sigint: true});

const setEnvValue = function (key, value) {
    const ENV_VARS = fs.readFileSync("./.env", "utf8").split(os.EOL);

    const target = ENV_VARS.indexOf(
        ENV_VARS.find((line) => {
            return line.match(new RegExp(key));
        })
    );

    ENV_VARS.splice(target, 1, `${key}=${value}`);

    fs.writeFileSync("./.env", ENV_VARS.join(os.EOL));
};

fs.copyFile('./.env.example', './.env', async (err) => {
    if (err) throw err;

    const {genSalt} = require("bcrypt");
    genSalt(10).then(res=>{
        setEnvValue("SALT", '"'+res+'"');
    });
    require("crypto").randomBytes(48, function (err, buffer) {
        const token = buffer.toString("hex");
        setEnvValue("JWT_KEY", '"'+token+'"');
    });
});