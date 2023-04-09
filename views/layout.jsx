const React = require("react");

module.exports = function (props) {
    return (
        <html>
            <head>
                <title>{props.title}</title>
                <link rel="stylesheet" href={"css/style.css"}/>
            </head>
            <body>{props.children}</body>
        </html>
    );
}