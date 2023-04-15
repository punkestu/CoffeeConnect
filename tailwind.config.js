/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./views/**/*.hbs", "./node_modules/flowbite/**/*.js"],
    theme: {
        fontFamily: {
            "mynerve" : ["Mynerve", "cursive"],
            "patrick-hand" : ["Patrick Hand", "cursive"]
        },
        extend: {
        },
    },
    plugins: [
        require('flowbite/plugin')
    ],
}

