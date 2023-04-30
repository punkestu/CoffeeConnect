/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./views/**/*.hbs", "./node_modules/flowbite/**/*.js"],
    theme: {
        extend: {
            animation: {
                fade: 'fadeOut 1s ease-in-out',
            },
            keyframes: {
                fadeOut: {
                    '0%': {opacity: "100%"},
                    '100%': {opacity: "0"}
                }
            }
        },
    },
    plugins: [
        require('flowbite/plugin')
    ],
}

