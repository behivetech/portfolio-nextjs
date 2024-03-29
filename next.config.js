/** @type {import('next').NextConfig} */
const path = require('path');

module.exports = {
    swcMinify: true,
    reactStrictMode: true,
    sassOptions: {
        includePaths: [
            path.join(__dirname, 'src/styles'),
            path.join(__dirname, 'public/fonts')
        ],
    },
}
